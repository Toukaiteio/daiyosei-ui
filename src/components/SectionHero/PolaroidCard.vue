<template>
  <div class="sketchbook-photo-card">
    <div class="washi-tape-sticker"></div>
    <div class="photo-paper">
      <div class="photo-image-bg"></div>
      <div class="graffiti-overlay font-handwritten">{{ signature }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  signature?: string
}>()
</script>

<style scoped>
.sketchbook-photo-card {
  width: 280px;
  margin: 0 auto;
  position: relative;
  transform: rotate(3deg);
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  z-index: 5;
}
.sketchbook-photo-card:hover {
  transform: rotate(-1.5deg) scale(1.03);
}
.washi-tape-sticker {
  position: absolute;
  top: -18px;
  left: 80px;
  width: 120px;
  height: 28px;
  background-color: rgba(79, 121, 163, 0.25);
  border: 1px dashed rgba(79, 121, 163, 0.4);
  backdrop-filter: blur(1.5px);
  transform: rotate(-6deg);
  z-index: 10;
  pointer-events: none;
  clip-path: polygon(
    0% 12%, 4% 0%, 96% 0%, 100% 8%,
    98% 50%, 100% 90%, 96% 100%, 4% 98%,
    0% 88%, 2% 48%
  );
}
:global(.theme-dark) .washi-tape-sticker {
  background-color: rgba(184, 163, 125, 0.3);
  border-color: rgba(184, 163, 125, 0.5);
}
.photo-paper {
  background-color: var(--card-bg);
  border: 2px solid var(--card-border);
  padding: 12px 12px 48px 12px;
  border-radius: 6px 16px 8px 18px / 18px 8px 16px 6px;
  position: relative;
}
.photo-paper::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: -8px;
  bottom: -8px;
  background: repeating-linear-gradient(45deg,
    var(--border-alpha) 0px,
    var(--border-alpha) 1.5px,
    transparent 1.5px,
    transparent 5.5px);
  border: 1.5px solid var(--card-border);
  border-radius: inherit;
  z-index: -1;
  pointer-events: none;
}
.photo-image-bg {
  width: 100%;
  height: 260px;
  background-image: var(--collage-img);
  background-size: cover;
  background-position: center;
  border: 1.5px solid var(--card-border);
  border-radius: 4px;
  opacity: 0.95;
  transition: filter 0.4s ease;
}
.sketchbook-photo-card:hover .photo-image-bg {
  filter: contrast(1.08) brightness(1.02);
}
.graffiti-overlay {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  color: var(--accent-orange);
  font-weight: 700;
  pointer-events: none;
  z-index: 10;
  width: 90%;
  text-align: center;
  white-space: nowrap;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: 0.95;
}
:global(.sketchbook-photo-card:hover) .graffiti-overlay {
  transform: translateX(-50%) scale(1.05);
  color: var(--text-primary);
  opacity: 1;
}
</style>
