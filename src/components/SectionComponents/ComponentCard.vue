<template>
  <div class="component-card">
    <div class="card-title font-tech">{{ title }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.component-card {
  background-color: var(--card-bg);
  border: 2.5px solid var(--card-border);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px 255px 15px 225px/225px 15px 255px 12px;
  position: relative;
  box-shadow: none !important;
}
.component-card::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: -8px;
  bottom: -8px;
  background: repeating-linear-gradient(-45deg,
    var(--border-alpha) 0px,
    var(--border-alpha) 1.5px,
    transparent 1.5px,
    transparent 5px);
  border: 1.8px solid var(--card-border);
  border-radius: inherit;
  z-index: -1;
  pointer-events: none;
}
.card-title {
  font-size: 11px;
  color: var(--text-gray);
  border-left: 3px solid var(--accent-orange);
  padding-left: 10px;
  line-height: 1;
}
</style>