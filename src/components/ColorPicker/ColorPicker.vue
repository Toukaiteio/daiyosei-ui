<template>
  <div class="colorpicker">
    <div class="colorpicker-value font-tech">
      <span class="colorpicker-swatch-mini" :style="{ backgroundColor: modelValue }"></span>
      {{ modelValue }}
    </div>
    <div class="colorpicker-mode-switch font-tech" role="tablist" aria-label="Color selector mode">
      <button
        type="button"
        class="mode-btn"
        :class="{ 'mode-btn--active': mode === 'palette' }"
        @click="mode = 'palette'"
      >
        PALETTE
      </button>
      <button
        type="button"
        class="mode-btn"
        :class="{ 'mode-btn--active': mode === 'wheel' }"
        @click="mode = 'wheel'"
      >
        COLOR WHEEL
      </button>
    </div>
    <div class="colorpicker-swatches">
      <button
        v-if="mode === 'palette'"
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
    <div v-if="mode === 'wheel'" class="wheel-wrap">
      <label class="wheel-shell" :style="{ '--current-color': modelValue }">
        <input
          class="wheel-input"
          type="color"
          :value="modelValue"
          aria-label="Choose custom color"
          @input="onWheelColorInput"
        />
      </label>
      <p class="wheel-hint font-tech">Drag on the wheel to pick any custom tone.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const mode = ref<'palette' | 'wheel'>('palette')
const palette = props.colors ?? defaultColors

function selectColor(c: string) {
  emit('update:modelValue', c)
}

function onWheelColorInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
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
.colorpicker-mode-switch {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.mode-btn {
  border: 1.5px dashed var(--card-border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-gray);
  font-size: 9px;
  letter-spacing: 0.06em;
  padding: 6px 10px;
  border-radius: 10px 8px 12px 7px / 7px 12px 8px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mode-btn:hover {
  color: var(--text-primary);
  border-color: var(--text-primary);
}
.mode-btn--active {
  color: var(--bg-primary);
  background: var(--accent-orange);
  border-style: solid;
  border-color: var(--accent-orange);
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
.wheel-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0 2px;
}
.wheel-shell {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at center, rgba(0, 0, 0, 0.15) 14%, transparent 15%),
    conic-gradient(
      #ff3b3b 0deg,
      #ff9f1a 45deg,
      #ffe74a 90deg,
      #5be37a 140deg,
      #3cb6ff 210deg,
      #7e63ff 275deg,
      #ff56c5 330deg,
      #ff3b3b 360deg
    );
  border: 2px solid var(--card-border);
  box-shadow: inset 0 0 0 6px rgba(0, 0, 0, 0.08);
}
.wheel-input {
  width: 84px;
  height: 84px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.wheel-input::-webkit-color-swatch-wrapper {
  padding: 0;
}
.wheel-input::-webkit-color-swatch {
  border: 2px solid var(--card-border);
  border-radius: 50%;
}
.wheel-input::-moz-color-swatch {
  border: 2px solid var(--card-border);
  border-radius: 50%;
}
.wheel-hint {
  margin: 0;
  font-size: 9px;
  line-height: 1.5;
  color: var(--text-gray);
  max-width: 160px;
}
</style>
