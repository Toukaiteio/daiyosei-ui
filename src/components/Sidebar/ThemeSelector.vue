<template>
  <div class="control-group">
    <div class="group-label"><span class="indicator-dot"></span> {{ copy.sidebar.themeSelectorTitle }}</div>
    <div class="theme-options">
      <button
        v-for="opt in options"
        :key="opt.value"
        class="theme-btn"
        :class="{ active: modelValue === opt.value }"
        @click="$emit('update:modelValue', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
    
    <!-- Unified Language Selector -->
    <div class="lang-selector-group" style="margin-top: 18px;">
      <div class="group-label" style="margin-bottom: 8px;">
        <span class="indicator-dot"></span> {{ currentLocale === 'zh' ? '语言选择 / LANG' : '言語選択 / LANG' }}
      </div>
      <div class="theme-options">
        <button
          class="theme-btn"
          :class="{ active: currentLocale === 'zh' }"
          @click="setLocale('zh')"
        >
          ZH / 中文
        </button>
        <button
          class="theme-btn"
          :class="{ active: currentLocale === 'ja' }"
          @click="setLocale('ja')"
        >
          JA / 日本語
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '../../types'
import { useThemeCopy, useI18n } from '../../composables'

defineProps<{
  modelValue: Theme
}>()

defineEmits<{
  'update:modelValue': [value: Theme]
}>()

const { copy } = useThemeCopy()
const { currentLocale, setLocale } = useI18n()

const options = [
  { value: 'blue' as Theme, label: 'CIRNO LIGHT' },
  { value: 'dark' as Theme, label: 'DAIYOSEI DARK' },
]
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
.theme-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.theme-btn {
  background: var(--card-bg);
  border: 1.5px dashed var(--card-border);
  color: var(--text-primary);
  padding: 12px 16px;
  text-align: left;
  font-family: 'Architects Daughter', cursive;
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px 10px 4px 6px/8px 4px 12px 4px;
  transform: rotate(-1.2deg);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.theme-btn:hover {
  background-color: var(--border-alpha);
  border-color: var(--text-primary);
  transform: scale(1.03) rotate(0.5deg);
}
.theme-btn.active {
  background-color: var(--accent-orange);
  border-color: var(--accent-orange);
  color: var(--bg-primary);
  font-weight: 700;
  box-shadow: none;
  transform: scale(1.05) rotate(1.8deg);
}
</style>