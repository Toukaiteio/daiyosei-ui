<template>
  <div class="slider-wrapper" :style="{ '--skew-angle': `${skew}deg` }">
    <input
      type="range"
      class="sketchbook-slider"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :style="{ '--value-percent': `${((modelValue - min) / (max - min)) * 100}%` }"
      @input="$emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value))"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
  min: number
  max: number
  step?: number
  skew?: number
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<style scoped>
.slider-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sketchbook-slider {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
  margin: 6px 0;
  transform: rotate(var(--skew-angle, 0deg));
  transform-origin: center;
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
