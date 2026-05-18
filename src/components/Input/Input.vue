<template>
  <div class="daiyo-input-group">
    <div class="daiyo-input-header font-tech">
      <span>{{ label || 'INPUT' }}</span>
      <span class="daiyo-input-status">{{ statusText }}</span>
    </div>
    <div class="daiyo-input-wrapper" :class="{ 'daiyo-input-wrapper--disabled': disabled }">
      <div v-if="prefix" class="daiyo-input-prefix font-tech">{{ prefix }}</div>
      <input
        class="daiyo-input font-tech"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  disabled?: boolean
  prefix?: string
  statusText?: string
}>(), {
  type: 'text',
  disabled: false,
  prefix: '',
  statusText: 'READY',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.daiyo-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.daiyo-input-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-gray);
}
.daiyo-input-status {
  color: var(--accent-orange);
}
.daiyo-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid var(--border-alpha);
  background-color: rgba(0, 0, 0, 0.015);
  border-radius: 8px 120px 6px 150px / 120px 6px 150px 8px;
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-input-prefix {
  background-color: rgba(0, 0, 0, 0.04);
  color: var(--text-primary);
  padding: 10px 12px;
  font-size: 10px;
  border-right: 2px solid var(--border-alpha);
}
.daiyo-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 12px;
}
.daiyo-input-wrapper:focus-within {
  border-color: var(--accent-orange);
  background-color: var(--border-alpha);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.04);
}
.daiyo-input-wrapper--disabled {
  opacity: 0.55;
}
.daiyo-input:disabled {
  cursor: not-allowed;
}
</style>
