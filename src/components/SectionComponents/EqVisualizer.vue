<template>
  <div class="visualizer-bar-hud">
    <span class="font-tech" style="font-size: 10px; opacity: 0.8;">✏️ VOICE WAVE scribble:</span>
    <div class="eq-bars">
      <div v-for="h in bars" :key="h" class="eq-bar" :style="{ '--h': h + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const bars = [40, 70, 20, 90, 50, 80, 30, 60]
</script>

<style scoped>
.visualizer-bar-hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.eq-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 24px;
}
.eq-bar {
  width: 3px;
  height: var(--h);
  background-color: transparent;
  border-left: 2.5px dashed var(--accent-orange);
  transform: rotate(4deg);
  opacity: 0.85;
}
</style>