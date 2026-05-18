<template>
  <div class="daiyo-tabs">
    <div class="daiyo-tabs-list font-tech" role="tablist">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        class="daiyo-tab-btn"
        :class="{ 'daiyo-tab-btn--active': modelValue === item.value }"
        @click="$emit('update:modelValue', item.value)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="daiyo-tabs-panel">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  label: string
  value: string
}

defineProps<{
  modelValue: string
  items: TabItem[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.daiyo-tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.daiyo-tabs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.daiyo-tab-btn {
  border: 1.8px dashed var(--card-border);
  background: var(--card-bg);
  color: var(--text-gray);
  font-size: 10px;
  padding: 7px 12px;
  border-radius: 10px 12px 8px 14px / 14px 8px 12px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.daiyo-tab-btn:hover {
  color: var(--text-primary);
  border-color: var(--text-primary);
}
.daiyo-tab-btn--active {
  border-style: solid;
  border-color: var(--accent-orange);
  background: var(--accent-orange);
  color: var(--bg-primary);
}
.daiyo-tabs-panel {
  border: 2px solid var(--border-alpha);
  border-radius: 16px 14px 22px 12px / 10px 20px 12px 18px;
  padding: 12px;
  background: var(--card-bg);
}
</style>
