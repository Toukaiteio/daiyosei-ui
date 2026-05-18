<template>
  <div class="daiyo-select-group" ref="rootRef">
    <div class="daiyo-select-header font-tech">
      <span>{{ label || 'SELECT' }}</span>
      <span class="daiyo-select-status">READY</span>
    </div>
    <div class="daiyo-select-wrapper" :class="{ 'daiyo-select-wrapper--open': open }">
      <button
        type="button"
        class="daiyo-select-trigger font-tech"
        :disabled="disabled"
        @click="toggleOpen"
      >
        <span>{{ selectedLabel }}</span>
        <span class="daiyo-select-arrow" :class="{ 'daiyo-select-arrow--open': open }">⌄</span>
      </button>
      <Transition name="select-fade">
        <div v-if="open" class="daiyo-select-dropdown">
          <button
            v-for="item in options"
            :key="item.value"
            type="button"
            class="daiyo-select-option font-tech"
            :class="{ 'daiyo-select-option--active': item.value === modelValue }"
            @click="selectOption(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

export interface SelectOption {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  modelValue: string
  options: SelectOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
}>(), {
  label: '',
  placeholder: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const matched = props.options.find((item) => item.value === props.modelValue)
  if (matched) return matched.label
  return props.placeholder || 'Please Select'
})

function toggleOpen() {
  if (props.disabled) return
  open.value = !open.value
}

function selectOption(value: string) {
  emit('update:modelValue', value)
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!rootRef.value) return
  if (!rootRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style scoped>
.daiyo-select-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.daiyo-select-header {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-gray);
}
.daiyo-select-status {
  color: var(--accent-orange);
}
.daiyo-select-wrapper {
  position: relative;
  border: 2px dashed var(--card-border);
  border-radius: 12px 225px 8px 215px / 215px 8px 225px 12px;
  background: var(--card-bg);
  padding: 2px;
}
.daiyo-select-wrapper--open {
  border-color: var(--accent-orange);
}
.daiyo-select-trigger {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  font-size: 10px;
  outline: none;
  cursor: pointer;
}
.daiyo-select-arrow {
  transition: transform 0.2s ease;
}
.daiyo-select-arrow--open {
  transform: rotate(180deg);
}
.daiyo-select-trigger:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.daiyo-select-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  z-index: 30;
  border: 2px solid var(--card-border);
  border-radius: 14px 16px 10px 18px / 18px 10px 16px 14px;
  background: var(--bg-secondary);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}
.daiyo-select-option {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  text-align: left;
  padding: 10px 12px;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.daiyo-select-option + .daiyo-select-option {
  border-top: 1px dashed var(--border-alpha);
}
.daiyo-select-option:hover {
  background: var(--border-alpha);
}
.daiyo-select-option--active {
  background: var(--accent-orange);
  color: var(--bg-primary);
}
.select-fade-enter-active,
.select-fade-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.select-fade-enter-from,
.select-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
