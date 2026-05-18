<template>
  <div class="colorpicker">
    <div class="colorpicker-value font-tech">
      <span class="colorpicker-swatch-mini" :style="{ backgroundColor: modelValue }"></span>
      {{ modelValue }}
    </div>
    <div class="colorpicker-swatches">
      <button
        v-for="c in palette"
        :key="c"
        class="colorpicker-swatch"
        :class="{ 'colorpicker-swatch--active': modelValue === c }"
        :style="{ backgroundColor: c }"
        @click="selectColor(c)"
      >
        <span v-if="modelValue === c" class="colorpicker-check">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  colors?: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const defaultColors = [
  '#c85a5a', '#e8a838', '#4a90c4', '#62b5ba',
  '#7cb87a', '#b87aa8', '#e07a7a', '#d4b06a',
  '#6a8aa8', '#8ab8a8', '#c8a0b0', '#2a3b4c',
]

const palette = props.colors ?? defaultColors

function selectColor(c: string) {
  emit('update:modelValue', c)
}
</script>

<style scoped>
.colorpicker {
  border: 2px dashed var(--card-border);
  border-radius: 10px 215px 12px 225px / 225px 12px 215px 10px;
  padding: 20px;
  background-color: var(--card-bg);
}
.colorpicker-value {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: 0.05em;
}
.colorpicker-swatch-mini {
  width: 20px;
  height: 20px;
  border: 1.5px solid var(--card-border);
  border-radius: 4px 8px 4px 6px / 6px 4px 8px 4px;
  flex-shrink: 0;
}
.colorpicker-swatches {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.colorpicker-swatch {
  aspect-ratio: 1;
  border: 2px solid var(--card-border);
  border-radius: 8px 12px 6px 10px / 10px 6px 12px 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
}
.colorpicker-swatch:hover {
  transform: scale(1.12);
  z-index: 2;
}
.colorpicker-swatch--active {
  border-color: var(--text-primary);
  transform: scale(1.12);
  box-shadow: 0 0 0 2px var(--bg-secondary), 0 0 0 4px var(--accent-orange);
}
.colorpicker-check {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  pointer-events: none;
}
</style>