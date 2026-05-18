<template>
  <div class="control-group font-handwritten">
    <div class="group-label"><span class="indicator-dot"></span> {{ copy.sidebar.effectsSelectorTitle }}</div>
    <label class="toggle-control" v-for="item in computedToggles" :key="item.key">
      <input
        type="checkbox"
        :checked="modelValue[item.key]"
        @change="$emit('update:modelValue', { ...modelValue, [item.key]: ($event.target as HTMLInputElement).checked })"
      />
      <span class="custom-toggle"></span>
      {{ item.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EffectKey, EffectsState } from '../../types'
import { useThemeCopy } from '../../composables'

defineProps<{
  modelValue: EffectsState
}>()

defineEmits<{
  'update:modelValue': [value: EffectsState]
}>()

const { copy } = useThemeCopy()

const computedToggles = computed<{ key: EffectKey; label: string }[]>(() => [
  { key: 'grain', label: copy.value.sidebar.effectsLabels.grain },
  { key: 'scanlines', label: copy.value.sidebar.effectsLabels.scanlines },
  { key: 'glitch', label: copy.value.sidebar.effectsLabels.glitch },
])
</script>

<style scoped>
.control-group {
  margin-bottom: 30px;
}
.group-label {
  font-size: 10px;
  color: var(--text-gray);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.indicator-dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent-orange);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-orange);
}
.toggle-control {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  color: var(--text-gray);
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.2s;
}
.toggle-control:hover {
  color: var(--text-primary);
}
.toggle-control input {
  display: none;
}
.custom-toggle {
  width: 16px;
  height: 16px;
  border: 1.8px solid var(--text-primary);
  position: relative;
  display: inline-block;
  background-color: var(--card-bg);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 4px 6px 3px 5px / 5px 3px 6px 4px;
  box-shadow: 1px 1px 0px var(--border-alpha);
}
.toggle-control:hover .custom-toggle {
  border-color: var(--accent-orange);
  transform: scale(1.08) rotate(-3deg);
  box-shadow: 2px 2px 0px var(--border-alpha);
}
.toggle-control input:checked + .custom-toggle {
  background-color: var(--accent-orange);
  border-color: var(--text-primary);
  transform: scale(1.08) rotate(3deg);
}
.toggle-control input:checked + .custom-toggle::after {
  content: '✔';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  font-family: 'Architects Daughter', 'Caveat', cursive;
  font-size: 13px;
  font-weight: 900;
  color: var(--bg-primary);
  line-height: 1;
}
</style>