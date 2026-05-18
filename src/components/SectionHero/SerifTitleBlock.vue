<template>
  <div class="serif-title-container">
    <div class="technical-code font-tech">{{ code }}</div>
    <h1 class="serif-title" :class="titleClass">{{ title }}</h1>
    <div class="serif-subtitle" :class="subtitleClass">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  code?: string
  title: string
  subtitle?: string
  titleClass?: string
  subtitleClass?: string
}>()
</script>

<style scoped>
.serif-title-container {
  display: flex;
  flex-direction: column;
}
.technical-code {
  font-size: 11px;
  color: var(--accent-orange);
  margin-bottom: 8px;
}
.serif-title {
  font-family: 'Noto Serif SC', 'Playfair Display', serif;
  font-size: 56px;
  font-weight: 900;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: -0.03em;
  background-color: transparent;
  display: inline-block;
  position: relative;
  text-shadow: none;
}
.serif-title.font-handwritten-jp,
.serif-title.font-handwritten-zh,
.serif-title.font-handwritten {
  font-family: var(--font-handwritten) !important;
  font-size: 60px;
  line-height: 1.05;
  letter-spacing: 0.01em;
  font-weight: 400;
}
.serif-subtitle {
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  color: var(--text-primary);
  opacity: 0.8;
  letter-spacing: 0.05em;
  font-weight: 300;
}
</style>
