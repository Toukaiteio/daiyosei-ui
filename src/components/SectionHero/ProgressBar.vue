<template>
  <div class="sketchbook-progress-layout">
    <div class="progress-bar-title font-tech">{{ copy.hero.progressLabel }}</div>
    <div class="progress-ruler-container">
      <div class="crayon-progress-bar">
        <div class="crayon-fill"></div>
      </div>
      <div class="handwritten-scale font-tech">
        <span>0%</span>
        <span>50%</span>
        <span>{{ copy.hero.progressScale }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'

const { copy } = useThemeCopy()
</script>

<style scoped>
.sketchbook-progress-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  width: 100%;
}
.progress-bar-title {
  font-size: 11px;
  color: var(--text-primary);
  opacity: 0.9;
}
.progress-ruler-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.crayon-progress-bar {
  height: 20px;
  border: 2px solid var(--card-border);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  background-color: transparent;
  padding: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.04);
}
.crayon-fill {
  width: 72%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--accent-orange) 0px,
    var(--accent-orange) 4px,
    transparent 4px,
    transparent 8px
  );
  border-radius: 120px 8px 90px 8px / 8px 90px 8px 120px;
  opacity: 0.85;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.06);
  animation: crayon-shiver 0.35s steps(2) infinite;
}
@keyframes crayon-shiver {
  0% { transform: skewX(0deg) scaleY(1); }
  50% { transform: skewX(-1.5deg) scaleY(0.98); }
  100% { transform: skewX(1.5deg) scaleY(1.02); }
}
.handwritten-scale {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-gray);
  padding: 0 4px;
}
</style>
