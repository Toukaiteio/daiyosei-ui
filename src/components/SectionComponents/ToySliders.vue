<template>
  <div class="toy-sliders-group" style="margin-top: 25px; border-top: 1.5px dashed var(--border-alpha); padding-top: 20px;">
    <div class="group-title font-tech" style="font-size: 11px; margin-bottom: 15px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
      <span>🎚️ TOY SLIDERS (VOLUME & SPEED)</span>
    </div>
    <div
      v-for="s in sliders"
      :key="s.id"
      class="linear-slider-item"
      :id="s.id"
      :style="{ '--rot': s.rot + 'deg' }"
    >
      <div class="slider-info font-tech" style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-gray); margin-bottom: 6px;">
        <span>{{ s.label }}</span>
        <span class="slider-value" :id="'val-' + s.id">
          {{ s.unit === 'x' ? `x${values[s.id].toFixed(1)}` : `${values[s.id].toFixed(1)}${s.unit ? ' ' + s.unit : ''}` }}
        </span>
      </div>
      <div class="custom-slider-wrapper">
        <input
          type="range"
          class="sketchbook-slider"
          :min="s.min"
          :max="s.max"
          :step="s.step"
          :value="values[s.id]"
          :style="{ '--value-percent': `${((values[s.id] - s.min) / (s.max - s.min)) * 100}%` }"
          @input="onSliderInput($event, s.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SliderDef {
  id: string
  label: string
  min: number
  max: number
  step: number
  initial: number
  unit?: string
  rot: number
}

const sliders: SliderDef[] = [
  { id: 'slider-volume', label: '🔈 VOLUME LEVEL', min: 0, max: 10, step: 0.1, initial: 8.0, rot: -0.8 },
  { id: 'slider-speed', label: '⚡ FREEZING SPEED', min: 1, max: 99, step: 0.5, initial: 9.0, unit: 'x', rot: 1.2 },
]

const values = ref<Record<string, number>>({
  'slider-volume': 8.0,
  'slider-speed': 9.0
})

function onSliderInput(e: Event, id: string) {
  const input = e.target as HTMLInputElement
  values.value[id] = parseFloat(input.value)
}
</script>

<style scoped>
.toy-sliders-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.linear-slider-item {
  width: 100%;
  transform: rotate(var(--rot, -1deg)) skewX(0.8deg);
  margin-bottom: 8px;
}
.sketchbook-slider {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
  margin: 6px 0;
}
.sketchbook-slider:focus {
  outline: none;
}
.sketchbook-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 14px;
  border: 2px solid var(--card-border);
  border-radius: 120px 8px 90px 6px / 6px 90px 8px 120px;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  background: linear-gradient(to right,
    transparent 0%,
    transparent var(--value-percent, 50%),
    var(--card-bg) var(--value-percent, 50%),
    var(--card-bg) 100%),
    repeating-linear-gradient(45deg,
      var(--accent-orange) 0px,
      var(--accent-orange) 3.5px,
      transparent 3.5px,
      transparent 8px);
}
.sketchbook-slider:hover::-webkit-slider-runnable-track {
  border-color: var(--text-primary);
}
.sketchbook-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 22px;
  width: 22px;
  background-color: var(--accent-orange);
  border: 2px solid var(--text-primary);
  border-radius: 6px 12px 6px 10px/10px 6px 12px 6px;
  cursor: pointer;
  margin-top: -7px;
  box-shadow: 2px 2.5px 0px var(--text-primary);
  transform: rotate(-4deg);
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s;
}
.sketchbook-slider:active::-webkit-slider-thumb {
  background-color: var(--accent-yellow);
  transform: scale(1.15) rotate(6deg);
  box-shadow: 1px 1.5px 0px var(--text-primary);
}
.sketchbook-slider::-moz-range-track {
  width: 100%;
  height: 14px;
  border: 2px solid var(--card-border);
  border-radius: 120px 8px 90px 6px / 6px 90px 8px 120px;
  background: linear-gradient(to right,
    transparent 0%,
    transparent var(--value-percent, 50%),
    var(--card-bg) var(--value-percent, 50%),
    var(--card-bg) 100%),
    repeating-linear-gradient(45deg,
      var(--accent-orange) 0px,
      var(--accent-orange) 3.5px,
      transparent 3.5px,
      transparent 8px);
}
.sketchbook-slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  background-color: var(--accent-orange);
  border: 2px solid var(--text-primary);
  border-radius: 6px 12px 6px 10px/10px 6px 12px 6px;
  cursor: pointer;
  box-shadow: 2px 2.5px 0px var(--text-primary);
  transform: rotate(-4deg);
  transition: all 0.2s ease;
}
.sketchbook-slider:active::-moz-range-thumb {
  background-color: var(--accent-yellow);
  transform: scale(1.15) rotate(6deg);
  box-shadow: 1px 1.5px 0px var(--text-primary);
}
</style>