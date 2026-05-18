<template>
  <svg class="scribble-svg" viewBox="0 0 100 100">
    <path
      v-for="(framePath, frameIndex) in framePaths"
      :key="frameIndex"
      class="scribble-path"
      :class="`scribble-frame-${frameIndex}`"
      :d="framePath"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pathData?: string
  framePaths?: string[]
}>()

const framePaths = computed(() => {
  if (props.framePaths?.length) {
    return props.framePaths
  }
  if (!props.pathData) return []
  return [props.pathData]
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
  will-change: opacity;
}
.scribble-frame-0 {
  animation: scribble-frame-0-show 0.9s linear infinite;
}
.scribble-frame-1 {
  animation: scribble-frame-1-show 0.9s linear infinite;
}
.scribble-frame-2 {
  animation: scribble-frame-2-show 0.9s linear infinite;
}
@keyframes scribble-frame-0-show {
  0% { opacity: 1; }
  33.333% { opacity: 1; }
  33.334% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes scribble-frame-1-show {
  0% { opacity: 0; }
  33.333% { opacity: 0; }
  33.334% { opacity: 1; }
  66.666% { opacity: 1; }
  66.667% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes scribble-frame-2-show {
  0% { opacity: 0; }
  66.666% { opacity: 0; }
  66.667% { opacity: 1; }
  100% { opacity: 0; }
}
</style>