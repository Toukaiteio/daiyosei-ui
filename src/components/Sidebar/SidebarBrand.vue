<template>
  <div class="sidebar-brand">
    <div class="brand-title font-handwritten">{{ copy.sidebar.brandTitle }}</div>
    <div class="brand-ver font-tech">{{ copy.sidebar.brandSub }}</div>
  </div>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'

const { copy } = useThemeCopy()
</script>

<style scoped>
.sidebar-brand {
  margin-bottom: 40px;
}
.brand-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 0.1em;
}
.brand-title:global(.font-handwritten) {
  font-weight: normal;
}
.brand-ver {
  font-size: 10px;
  color: var(--accent-orange);
  margin-top: 4px;
}
</style>