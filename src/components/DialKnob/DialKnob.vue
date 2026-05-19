<template>
  <div class="dial-item" :id="dialId">
    <div class="dial-header font-tech">{{ label }}</div>
    <div class="dial-container" ref="containerRef">
      <svg class="dial-svg" viewBox="0 0 100 100">
        <path
          class="dial-bg-path"
          d="M 91 48 C 94 70, 71 88, 49 91 C 27 94, 9 71, 12 49 C 15 27, 30 15, 50 12 C 70 9, 88 26, 91 48 Z"
        />
        <path
          ref="fillCircleRef"
          class="dial-fill-circle"
          d="M 91 48 C 94 70, 71 88, 49 91 C 27 94, 9 71, 12 49 C 15 27, 30 15, 50 12 C 70 9, 88 26, 91 48"
          pathLength="251.2"
        />
        <g class="dial-pointer-line" ref="pointerLineRef" style="transform-origin: 50px 50px;">
          <path d="M 50 50 Q 48 33, 50 16" style="fill:none; stroke:var(--text-primary); stroke-width:4.5px; stroke-linecap:round;" />
        </g>
      </svg>
    </div>
    <div class="dial-readout font-tech" ref="readoutRef">{{ displayValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps<{
  dialId: string
  label: string
  min: number
  max: number
  initial: number
  unit: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const fillCircleRef = ref<SVGPathElement | null>(null)
const pointerLineRef = ref<SVGGElement | null>(null)
const readoutRef = ref<HTMLElement | null>(null)

const currentValue = ref(props.initial)
const displayValue = computed(() => `${currentValue.value.toFixed(currentValue.value >= 100 ? 1 : 2)} ${props.unit}`)

const circumference = 2 * Math.PI * 40
const minAngle = -135
const maxAngle = 135
const angleRange = maxAngle - minAngle
let isDragging = false
let cumulativeAngle = minAngle + ((props.initial - props.min) / (props.max - props.min)) * angleRange
let lastRawAngle = cumulativeAngle

function renderDial(val: number) {
  val = Math.max(props.min, Math.min(props.max, val))
  currentValue.value = val

  const percent = (val - props.min) / (props.max - props.min)
  const angle = minAngle + percent * angleRange

  if (pointerLineRef.value) {
    pointerLineRef.value.style.transform = `rotate(${angle}deg)`
  }
  if (fillCircleRef.value) {
    const fillPercent = percent * 0.75
    const strokeOffset = circumference * (1 - fillPercent)
    fillCircleRef.value.style.strokeDashoffset = String(strokeOffset)
    fillCircleRef.value.style.transform = `rotate(${-minAngle}deg)`
  }
  if (readoutRef.value) {
    readoutRef.value.textContent = `${val.toFixed(val >= 100 ? 1 : 2)} ${props.unit}`
  }
}

function handleDrag(clientX: number, clientY: number) {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = clientX - cx
  const dy = clientY - cy
  let rawAngle = Math.atan2(dx, -dy) * (180 / Math.PI)

  let delta = rawAngle - lastRawAngle
  if (delta > 180) delta -= 360
  else if (delta < -180) delta += 360
  cumulativeAngle += delta
  lastRawAngle = rawAngle

  cumulativeAngle = Math.max(minAngle, Math.min(maxAngle, cumulativeAngle))

  const percent = (cumulativeAngle - minAngle) / angleRange
  renderDial(props.min + percent * (props.max - props.min))
}

function onMouseDown(e: MouseEvent) {
  isDragging = true
  document.body.style.cursor = 'grabbing'
  handleDrag(e.clientX, e.clientY)
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging) return
  handleDrag(e.clientX, e.clientY)
}

function onMouseUp() {
  if (isDragging) {
    isDragging = false
    document.body.style.cursor = 'default'
  }
}

function onTouchStart(e: TouchEvent) {
  isDragging = true
  const touch = e.touches[0]
  handleDrag(touch.clientX, touch.clientY)
  e.preventDefault()
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging) return
  const touch = e.touches[0]
  handleDrag(touch.clientX, touch.clientY)
}

function onTouchEnd() {
  isDragging = false
}

onMounted(() => {
  nextTick(() => {
    if (fillCircleRef.value) {
      fillCircleRef.value.style.strokeDasharray = String(circumference)
    }
    renderDial(props.initial)

    containerRef.value?.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    containerRef.value?.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  })
})

onUnmounted(() => {
  containerRef.value?.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  containerRef.value?.removeEventListener('touchstart', onTouchStart)
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
})
</script>

<style scoped>
.dial-item {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.dial-header {
  font-size: 9px;
  color: var(--text-gray);
}
.dial-container {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50% 48% 52% 47% / 47% 52% 48% 50%;
  background: transparent;
  box-sizing: border-box;
  padding: 3px;
}
.dial-svg {
  width: 100%;
  height: 100%;
  cursor: grab;
  overflow: visible;
}
.dial-bg-path {
  fill: none;
  stroke: var(--card-border);
  stroke-width: 3px;
  stroke-dasharray: 6 5;
}
.dial-fill-circle {
  fill: none;
  stroke: var(--accent-orange);
  stroke-width: 5px;
  stroke-linecap: round;
  stroke-dasharray: 251.2;
  stroke-dashoffset: 251.2;
  transform: rotate(-90deg);
  transform-origin: 50px 50px;
  transition: stroke-dashoffset 0.1s ease;
}
.dial-pointer-line {
  transform-origin: 50px 50px;
  transform: rotate(0deg);
  transition: transform 0.1s ease;
}
.dial-readout {
  font-size: 8px;
  color: var(--text-primary);
}
</style>
