<template>
  <div class="section-header">
    <div class="header-line"></div>
    <h2 class="section-title font-tech">
      <span class="highlight-bracket">{{ bracket }}</span>
      {{ title }}
    </h2>
    <span class="handwritten-note header-note font-handwritten">{{ note }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  bracket?: string
  note?: string
}>()
</script>

<style scoped>
.section-header {
  margin-bottom: 30px;
}
.header-line {
  height: 2px;
  background-color: var(--text-primary);
  margin-bottom: 12px;
  opacity: 0.8;
}
.section-title {
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
}
.highlight-bracket {
  color: var(--accent-orange);
}
.header-note {
  font-size: 15px;
  margin-left: 12px;
  font-weight: 400;
  transform: rotate(-1deg);
  display: inline-block;
  opacity: 0.7;
}
</style>