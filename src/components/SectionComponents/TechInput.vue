<template>
  <div class="tech-input-group">
    <div class="input-header font-tech">
      <span>✏️ WRITE DOWN A SPELL:</span>
      <span class="input-status">READY</span>
    </div>
    <div class="input-wrapper">
      <div class="coord-tag font-tech">{{ coordTag }}</div>
      <input
        type="text"
        class="tech-input font-tech"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <div class="focus-marker"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  coordTag?: string
  placeholder?: string
  modelValue?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.tech-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-gray);
}
.input-status {
  color: var(--accent-orange);
}
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid var(--border-alpha);
  background-color: rgba(0, 0, 0, 0.015);
  border-radius: 8px 120px 6px 150px/120px 6px 150px 8px;
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.coord-tag {
  background-color: rgba(0, 0, 0, 0.04);
  color: var(--text-primary);
  padding: 10px 12px;
  font-size: 10px;
  border-right: 2px solid var(--border-alpha);
}
.tech-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 12px;
}
.focus-marker {
  display: none;
}
.input-wrapper:focus-within {
  border-color: var(--accent-orange);
  background-color: var(--border-alpha);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.04);
}
</style>