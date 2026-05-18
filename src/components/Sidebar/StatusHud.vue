<template>
  <div class="control-group active-status-hud font-handwritten">
    <div class="hud-item">
      <span class="hud-label">{{ copy.sidebar.hud.signal }}</span>
      <span class="hud-value">{{ signal }}</span>
    </div>
    <div class="hud-item">
      <span class="hud-label">{{ copy.sidebar.hud.frogs }}</span>
      <span class="hud-value">{{ frogs }}</span>
    </div>
    <div class="hud-item">
      <span class="hud-label">{{ copy.sidebar.hud.mood }}</span>
      <span class="hud-value">{{ mood }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'
import { useHud } from '../../composables/useHud'

const { copy } = useThemeCopy()
const { signal, frogs, mood } = useHud()
</script>

<style scoped>
.control-group {
  margin-bottom: 30px;
}
.active-status-hud {
  background-color: rgba(245, 245, 247, 0.03);
  border: 1px solid rgba(245, 245, 247, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hud-item {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
}
.hud-label {
  color: var(--text-gray);
}
.hud-value {
  color: var(--text-primary);
}
</style>