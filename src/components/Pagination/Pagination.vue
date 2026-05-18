<template>
  <div class="daiyo-pagination font-tech">
    <button class="page-btn" :disabled="modelValue <= 1" @click="setPage(modelValue - 1)">prev</button>
    <span class="page-text">page {{ modelValue }} / {{ totalPages }}</span>
    <button class="page-btn" :disabled="modelValue >= totalPages" @click="setPage(modelValue + 1)">next</button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: number
  totalPages: number
}>(), {
  totalPages: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function setPage(page: number) {
  emit('update:modelValue', page)
}
</script>

<style scoped>
.daiyo-pagination {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px;
  border: 1px dashed var(--border-alpha);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 28px;
  background-position: 0 14px;
  position: relative;
}
.daiyo-pagination::before {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 5px;
  border-left: 1px dashed color-mix(in srgb, var(--accent-orange) 70%, transparent);
  opacity: 0.5;
}
.page-btn {
  border: 1.8px solid var(--text-primary);
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 4px 10px;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 1.5px 2px 0 color-mix(in srgb, var(--text-primary) 26%, transparent);
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.page-btn:not(:disabled):hover {
  background: color-mix(in srgb, var(--accent-orange) 16%, transparent);
  transform: translate(-1px, -1px) rotate(-1deg);
}
.page-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}
.page-text {
  font-size: 10px;
  color: var(--text-primary);
  letter-spacing: 0.12em;
  padding: 0 6px;
}
</style>
