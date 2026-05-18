<template>
  <svg class="scribble-svg" viewBox="0 0 100 100">
    <path
      v-for="(framePath, frameIndex) in resolvedFrames"
      :key="frameIndex"
      class="scribble-path"
      :class="{ 'scribble-active': activeFrame === frameIndex }"
      :d="framePath"
    />
  </svg>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  pathData?: string
  framePaths?: string[]
}>()

const resolvedFrames = computed(() => {
  if (props.framePaths?.length) return props.framePaths
  if (!props.pathData) return []
  return [props.pathData]
})

const activeFrame = ref(0)
let intervalId: number | null = null

onMounted(() => {
  if (resolvedFrames.value.length > 1) {
    intervalId = window.setInterval(() => {
      activeFrame.value = (activeFrame.value + 1) % resolvedFrames.value.length
    }, 300)
  } else {
    activeFrame.value = 0
  }
})

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId)
})
</script>

<style scoped>
.scribble-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 3;
  overflow: visible;
}
.scribble-path {
  fill: none;
  stroke: var(--text-primary);
  opacity: 0;
  stroke-width: 2.6px;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.scribble-path.scribble-active {
  opacity: 1;
}
</style>
