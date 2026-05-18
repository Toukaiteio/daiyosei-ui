<template>
  <header class="top-nav">
    <div class="nav-left font-tech">
      <slot name="left">{{ copy.topNav.left }}</slot>
    </div>
    <div class="nav-right font-tech">
      <span class="clock-display">page. 01 — {{ time }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'
import { useClock } from '../../composables/useClock'

const { copy } = useThemeCopy()
const { time } = useClock()
</script>

<style scoped>
.top-nav {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-alpha);
  font-size: 10px;
  opacity: 0.8;
  margin-bottom: 40px;
}
</style>