<template>
  <div
    class="avatar-card"
    :class="{ active: isActive, 'image-filled': isImageFilled }"
    :data-index="index"
  >
    <div class="avatar-box">
      <div class="silhouette"></div>
      <ScribbleSvg v-if="scribbleFrames?.length || scribblePath" :path-data="scribblePath" :frame-paths="scribbleFrames" />
    </div>
    <div class="avatar-label font-tech">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import ScribbleSvg from './ScribbleSvg.vue'

defineProps<{
  index: number
  label: string
  isActive?: boolean
  isImageFilled?: boolean
  scribblePath?: string
  scribbleFrames?: string[]
}>()
</script>

<style scoped>
.avatar-card {
  width: 130px;
  margin: 0 -35px;
  border: 2px solid var(--card-border);
  padding: 10px;
  text-align: center;
  background-color: var(--card-bg);
  cursor: pointer;
  position: relative;
  border-radius: 12px 6px 15px 4px/4px 15px 6px 12px;
  transform: translate(var(--spread-offset, 0px), var(--card-y, 0px)) rotate(var(--card-rot, 0deg));
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: -3px 3px 6px rgba(0,0,0,0.08), 2px 4px 8px rgba(0,0,0,0.05);
}
.avatar-card[data-index="0"] { --card-rot: -3.5deg; }
.avatar-card[data-index="1"] { --card-rot: 2.8deg; }
.avatar-card[data-index="2"] { --card-rot: -1.5deg; }
.avatar-card[data-index="3"] { --card-rot: 4.2deg; }
.avatar-card[data-index="4"] { --card-rot: -2.5deg; }
.avatar-box {
  width: 100%;
  height: 120px;
  background-color: var(--border-alpha);
  border: 1.5px solid var(--card-border);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 4px;
}
.silhouette {
  width: 60px;
  height: 60px;
  background-color: var(--text-gray);
  opacity: 0.35;
  border-radius: 50% 50% 0 0;
  margin-top: 40px;
  position: relative;
  transition: all 0.2s;
}
.silhouette::before {
  content: '';
  position: absolute;
  top: -30px; left: 10px;
  width: 40px; height: 40px;
  background-color: var(--text-gray);
  border-radius: 50%;
  transition: all 0.2s;
}
.avatar-label {
  font-size: 8px;
  color: var(--text-gray);
  margin-top: 10px;
  transition: color 0.2s;
}
.avatar-card:hover:not(.active) {
  border-color: var(--accent-orange);
  transform: translate(var(--spread-offset, 0px), calc(var(--card-y, 0px) - 12px)) rotate(calc(var(--card-rot, 0deg) * 0.5)) scale(1.05);
  box-shadow: -4px 8px 16px rgba(0, 0, 0, 0.12), 2px 4px 8px rgba(0, 0, 0, 0.06);
  z-index: 8 !important;
}
.avatar-card.active {
  border-color: var(--text-primary);
  background-color: var(--card-bg);
  transform: translate(var(--spread-offset, 0px), var(--card-y, -24px)) rotate(var(--card-rot, 0.8deg)) scale(1.08);
  box-shadow: -6px 16px 32px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(255, 92, 0, 0.05);
  z-index: 10 !important;
}
.avatar-card.active::before {
  content: 'TARGET SILHOUETTE';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(-4deg);
  background: var(--accent-orange);
  color: var(--bg-primary);
  font-family: 'Architects Daughter', cursive;
  font-size: 8px;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 3px 8px 3px 5px/6px 3px 7px 4px;
  z-index: 10;
  white-space: nowrap;
  box-shadow: 1px 3px 6px rgba(0,0,0,0.15);
  border: 1px dashed rgba(255,255,255,0.25);
  pointer-events: none;
}
.avatar-card.active .avatar-box {
  border-color: var(--text-primary);
  background-color: var(--border-alpha);
}
.avatar-card.active .silhouette,
.avatar-card.active .silhouette::before {
  background-color: var(--text-primary);
  opacity: 0.95;
}
.avatar-card.active :deep(.scribble-path) {
  stroke: var(--accent-orange);
  stroke-width: 3.5px;
}
.avatar-card.active .avatar-label {
  color: var(--text-primary);
  font-weight: 700;
}
</style>
