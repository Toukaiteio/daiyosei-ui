<template>
  <div class="collage-caption font-tech">
    <span>{{ copy.hero.captionLeft }}</span>
    <span>{{ copy.hero.captionRight }}</span>
  </div>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'

const { copy } = useThemeCopy()
</script>

<style scoped>
.collage-caption {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-gray);
  margin-top: 10px;
}
</style>
