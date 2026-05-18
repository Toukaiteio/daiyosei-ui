<template>
  <label class="daiyo-textarea-note" :style="noteStyle">
    <div class="note-tape"></div>
    <div class="daiyo-textarea-header font-handwritten">
      <span>{{ label || 'sticky note' }}</span>
      <span class="daiyo-textarea-status">{{ statusText }}</span>
    </div>
    <div class="daiyo-textarea-wrapper">
      <textarea
        class="daiyo-textarea font-handwritten"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        @input="onInput"
      ></textarea>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  statusText?: string
  noteTone?: 'yellow' | 'pink' | 'green'
  noteColor?: string
  textColor?: string
  placeholderColor?: string
}>(), {
  rows: 4,
  disabled: false,
  statusText: 'READY',
  noteTone: 'yellow',
  noteColor: '',
  textColor: '',
  placeholderColor: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

const toneMap: Record<'yellow' | 'pink' | 'green', string> = {
  yellow: '#fff3a6',
  pink: '#ffd3e1',
  green: '#d9f6c8',
}

const noteStyle = computed(() => ({
  '--note-bg': props.noteColor || toneMap[props.noteTone],
  '--note-text-color': props.textColor || 'var(--text-primary)',
  '--note-placeholder-color': props.placeholderColor || 'rgba(42, 59, 76, 0.55)',
}))
</script>

<style scoped>
.daiyo-textarea-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.daiyo-textarea-note {
  position: relative;
  border: 2px solid var(--text-primary);
  border-radius: 1px 3px 0 2px;
  padding: 18px 14px 14px;
  background: var(--note-bg);
  box-shadow: 3px 4px 0px rgba(0, 0, 0, 0.08);
}
.note-tape {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(-4deg);
  width: 96px;
  height: 22px;
  background: rgba(79, 121, 163, 0.25);
  border: 1px dashed rgba(79, 121, 163, 0.45);
  clip-path: polygon(0% 14%, 4% 0%, 97% 4%, 100% 16%, 97% 86%, 100% 100%, 4% 96%, 0% 84%);
}
:global(.theme-dark) .note-tape {
  background: rgba(184, 163, 125, 0.28);
  border-color: rgba(184, 163, 125, 0.5);
}
.daiyo-textarea-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-gray);
  margin-bottom: 8px;
}
.daiyo-textarea-status {
  color: var(--accent-orange);
  font-size: 11px;
}
.daiyo-textarea-wrapper {
  --note-line-step: 28px;
  border: 1.8px dashed var(--card-border);
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent calc(var(--note-line-step) - 1px),
      var(--border-alpha) calc(var(--note-line-step) - 1px),
      var(--border-alpha) var(--note-line-step)
    ),
    rgba(255, 255, 255, 0.04);
  border-radius: 0 2px 1px 0;
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-textarea-wrapper:focus-within {
  border-color: var(--accent-orange);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.04);
}
.daiyo-textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: vertical;
  color: var(--note-text-color);
  padding: 0 12px 0;
  font-size: 16px;
  line-height: var(--note-line-step);
  min-height: calc(var(--note-line-step) * 3);
}
.daiyo-textarea:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.daiyo-textarea::placeholder {
  color: var(--note-placeholder-color);
  opacity: 1;
}
</style>
