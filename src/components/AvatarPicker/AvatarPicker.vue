<template>
  <div class="avatar-picker">
    <div v-if="showArrow" class="active-arrow-bar">
      <div class="active-arrow-pointer">▼</div>
      <div class="horizontal-line"></div>
    </div>
    <div class="avatar-row-wrapper">
      <div class="avatar-row" ref="rowRef" :style="{ transform: `translateX(${translateX}px)` }">
        <AvatarCard
          v-for="card in cards"
          :key="card.index"
          :index="card.index"
          :label="card.label"
          :is-active="activeIndex === card.index"
          :is-image-filled="card.isImageFilled"
          :scribble-path="card.scribblePath"
          :scribble-frames="card.scribbleFrames"
          :style="cardStyles[card.index]"
          @click="selectCard(card.index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import AvatarCard from './AvatarCard.vue'

export interface AvatarItem {
  index: number
  label: string
  scribblePath?: string
  scribbleFrames?: string[]
  isImageFilled?: boolean
}

const props = withDefaults(defineProps<{
  cards: AvatarItem[]
  modelValue?: number
  showArrow?: boolean
}>(), {
  modelValue: 0,
  showArrow: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const activeIndex = ref(props.modelValue)
const rowRef = ref<HTMLElement | null>(null)
const translateX = ref(0)
const cardStyles = ref<Record<number, any>>({})
let timeoutId: number | null = null

function updateLayout(idx: number) {
  if (timeoutId) clearTimeout(timeoutId)

  const remaining = props.cards.map(c => c.index).filter(i => i !== idx)
  const targetRels: Record<number, number> = { [idx]: 0 }
  if (remaining.length >= 4) {
    targetRels[remaining[0]] = -2
    targetRels[remaining[1]] = -1
    targetRels[remaining[2]] = 1
    targetRels[remaining[3]] = 2
  }

  const baseRots = [-3.5, 2.8, -1.5, 4.2, -2.5]
  props.cards.forEach(card => {
    const i = card.index
    const rel = targetRels[i] ?? 0
    const dist = Math.abs(rel)
    const spreadOffset = i === idx ? 0 : (rel - (i - idx)) * 60 + (rel < 0 ? -30 : 30)
    cardStyles.value[i] = {
      '--spread-offset': `${spreadOffset}px`,
      '--card-y': i === idx ? '-24px' : '0px',
      '--card-rot': `${baseRots[i] ?? 0}deg`,
      zIndex: i === idx ? 10 : 10 - dist * 2,
      filter: 'none', opacity: '1',
    }
  })

  translateX.value = (2 - idx) * 60

  timeoutId = window.setTimeout(() => {
    props.cards.forEach(card => {
      const i = card.index
      const rel = targetRels[i] ?? 0
      const dist = Math.abs(rel)
      if (i !== idx) {
        cardStyles.value[i] = {
          '--spread-offset': `${(rel - (i - idx)) * 60}px`,
          '--card-y': '0px',
          '--card-rot': `${(Math.random() * 8 - 4).toFixed(1)}deg`,
          zIndex: 10 - dist * 2,
          filter: `brightness(${1 - dist * 0.08}) contrast(${1 - dist * 0.04})`,
          opacity: `${1 - dist * 0.05}`,
        }
      } else {
        cardStyles.value[i] = {
          '--spread-offset': '0px', '--card-y': '-24px', '--card-rot': '0.8deg',
          zIndex: 10, filter: 'none', opacity: '1',
        }
      }
    })
  }, 220)
}

function selectCard(index: number) {
  activeIndex.value = index
  emit('update:modelValue', index)
}

watch(() => props.modelValue, val => { activeIndex.value = val; updateLayout(val) })
watch(activeIndex, updateLayout)
onMounted(() => updateLayout(activeIndex.value))
onBeforeUnmount(() => { if (timeoutId) clearTimeout(timeoutId) })
</script>

<style scoped>
.avatar-picker {
  width: 100%;
}
.active-arrow-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.active-arrow-pointer {
  color: var(--accent-orange);
  font-size: 14px;
  margin-bottom: 6px;
  animation: pointer-bounce 2s infinite ease-in-out alternate;
}
@keyframes pointer-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}
.horizontal-line {
  width: 80%;
  height: 1px;
  background-color: var(--border-alpha);
}
.avatar-row-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding-top: 40px;
  padding-bottom: 20px;
  margin-top: -10px;
  margin-bottom: -10px;
}
.avatar-row {
  display: flex;
  justify-content: center;
  gap: 0;
  transition: transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}
</style>
