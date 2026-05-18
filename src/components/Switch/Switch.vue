<template>
  <label class="daiyo-switch font-handwritten">
    <input type="checkbox" :checked="modelValue" :disabled="disabled" @change="onChange" />
    <span class="daiyo-switch-box"></span>
    <span class="daiyo-switch-label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean
  label?: string
  disabled?: boolean
}>(), {
  label: 'Toggle',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<style scoped>
.daiyo-switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  color: var(--text-gray);
  cursor: pointer;
  transition: color 0.2s;
}
.daiyo-switch:hover {
  color: var(--text-primary);
}
.daiyo-switch input {
  display: none;
}
.daiyo-switch-box {
  width: 16px;
  height: 16px;
  border: 1.8px solid var(--text-primary);
  background-color: var(--card-bg);
  border-radius: 4px 6px 3px 5px / 5px 3px 6px 4px;
  position: relative;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 1px 1px 0px var(--border-alpha);
}
.daiyo-switch:hover .daiyo-switch-box {
  border-color: var(--accent-orange);
  transform: scale(1.08) rotate(-3deg);
  box-shadow: 2px 2px 0px var(--border-alpha);
}
.daiyo-switch input:checked + .daiyo-switch-box {
  background-color: var(--accent-orange);
  border-color: var(--text-primary);
  transform: scale(1.08) rotate(3deg);
}
.daiyo-switch input:checked + .daiyo-switch-box::after {
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
.daiyo-switch input:disabled + .daiyo-switch-box {
  opacity: 0.5;
}
.daiyo-switch input:disabled ~ .daiyo-switch-label {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
