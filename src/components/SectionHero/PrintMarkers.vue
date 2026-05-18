<template>
  <div class="print-layout-markers font-tech">
    <span>{{ copy.hero.markers[0] }}</span>
    <span>{{ copy.hero.markers[1] }}</span>
    <span>{{ copy.hero.markers[2] }}</span>
  </div>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'

const { copy } = useThemeCopy()
</script>

<style scoped>
.print-layout-markers {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 24px;
  padding-right: 20px;
  font-size: 8px;
  color: var(--text-gray);
  letter-spacing: 0.08em;
  opacity: 0.75;
}
</style>
