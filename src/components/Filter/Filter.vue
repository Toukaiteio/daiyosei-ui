<template>
  <div class="daiyo-filter font-tech">
    <button
      v-for="item in options"
      :key="item.value"
      class="filter-btn"
      :class="{ 'filter-btn--active': modelValue === item.value }"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
export interface FilterOption {
  label: string
  value: string
}

defineProps<{
  modelValue: string
  options: FilterOption[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.daiyo-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px;
  border: 1px dashed var(--border-alpha);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 28px;
  background-position: 0 12px;
}
.filter-btn {
  border: 1.8px solid color-mix(in srgb, var(--text-primary) 70%, transparent);
  background: color-mix(in srgb, var(--bg-secondary) 92%, transparent);
  color: var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 5px 12px;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transform: rotate(-0.6deg);
  box-shadow: 1.5px 2px 0 color-mix(in srgb, var(--text-primary) 25%, transparent);
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.filter-btn:hover {
  transform: rotate(0deg) translateY(-1px);
  background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
}
.filter-btn--active {
  border-style: solid;
  border-color: var(--accent-orange);
  background: color-mix(in srgb, var(--accent-orange) 22%, transparent);
  color: var(--accent-orange);
  box-shadow: 2px 2px 0 color-mix(in srgb, var(--accent-orange) 28%, transparent);
  transform: rotate(0deg);
}
</style>
