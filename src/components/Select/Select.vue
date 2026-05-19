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
  gap: 6px;
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
  border: 2px solid var(--card-border);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  background: var(--card-bg);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 2px 2px 0 var(--card-border);
}
.daiyo-select-wrapper--open {
  border-color: var(--text-primary);
  box-shadow: 3px 3px 0 color-mix(in srgb, var(--text-primary) 30%, transparent);
}
.daiyo-select-trigger {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  font-size: 10px;
  outline: none;
  cursor: pointer;
  transform: rotate(-0.3deg);
}
.daiyo-select-arrow {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--accent-orange);
  font-size: 14px;
  line-height: 1;
}
.daiyo-select-arrow--open {
  transform: rotate(180deg);
}
.daiyo-select-trigger:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Dropdown: lined notebook paper */
.daiyo-select-dropdown {
  position: absolute;
  left: -2px;
  right: -2px;
  top: calc(100% + 8px);
  z-index: 30;
  border: 2px solid var(--text-primary);
  border-radius: 14px 8px 18px 10px / 10px 18px 8px 14px;
  background-color: var(--bg-secondary);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 32px;
  background-position: 0 16px;
  box-shadow: 4px 5px 0 color-mix(in srgb, var(--text-primary) 18%, transparent);
  overflow: hidden;
}
.daiyo-select-option {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  text-align: left;
  padding: 10px 14px 10px 10px;
  font-size: 10px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease, color 0.2s ease;
  line-height: 32px;
  height: 32px;
  display: flex;
  align-items: center;
}
.daiyo-select-option + .daiyo-select-option {
  border-top: 1px solid var(--grid-color);
}
.daiyo-select-option:hover {
  background: color-mix(in srgb, var(--accent-orange) 10%, transparent);
  color: var(--text-primary);
}
.daiyo-select-option--active {
  color: var(--accent-orange);
  font-weight: 700;
}
.daiyo-select-option--active::after {
  content: '✓';
  position: absolute;
  right: 12px;
  color: var(--accent-orange);
  font-size: 10px;
}

.select-fade-enter-active,
.select-fade-leave-active {
  transition: opacity 0.22s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.22s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}
.select-fade-enter-from,
.select-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-6px) rotate(-0.3deg);
}
</style>
