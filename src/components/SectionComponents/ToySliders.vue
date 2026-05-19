<template>
  <div class="toy-sliders-group" style="margin-top: 25px; border-top: 1.5px dashed var(--border-alpha); padding-top: 20px;">
    <div class="group-title font-tech" style="font-size: 11px; margin-bottom: 15px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
      <span>🎚️ TOY SLIDERS (VOLUME & SKEW CONTROL)</span>
    </div>
    <div class="linear-slider-item" id="slider-volume">
      <div class="slider-info font-tech" style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-gray); margin-bottom: 6px;">
        <span>🔈 VOLUME LEVEL</span>
        <span class="slider-value">{{ values['slider-volume'].toFixed(1) }}</span>
      </div>
      <Slider
        :model-value="values['slider-volume']"
        :min="0"
        :max="10"
        :step="0.1"
        :skew="volumeSkew"
        @update:model-value="values['slider-volume'] = $event"
      />
    </div>
    <div class="linear-slider-item" id="slider-skew">
      <div class="slider-info font-tech" style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-gray); margin-bottom: 6px;">
        <span>⚡ SKEW CONTROL</span>
        <span class="slider-value">{{ volumeSkew.toFixed(1) }}°</span>
      </div>
      <Slider
        :model-value="volumeSkew"
        :min="-3"
        :max="3"
        :step="0.1"
        :skew="0"
        @update:model-value="volumeSkew = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../../components/Slider/Slider.vue'

const values = ref<Record<string, number>>({
  'slider-volume': 8.0
})

const volumeSkew = ref(-0.8)
</script>

<style scoped>
.toy-sliders-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.linear-slider-item {
  width: 100%;
  margin-bottom: 8px;
}
</style>