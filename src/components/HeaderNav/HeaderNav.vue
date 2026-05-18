<template>
  <header class="header-nav font-tech">
    <div class="header-left">
      <slot name="brand">{{ brand }}</slot>
    </div>
    <nav class="header-center" aria-label="Header navigation">
      <button
        v-for="item in items"
        :key="item.value"
        :class="['header-link', { 'is-active': modelValue === item.value }]"
        type="button"
        @click="select(item.value)"
      >
        {{ item.label }}
      </button>
    </nav>
    <div class="header-right">
      <slot name="meta">{{ meta }}</slot>
    </div>
  </header>
</template>

<script setup lang="ts">
type HeaderNavItem = {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  modelValue?: string
  brand?: string
  meta?: string
  items?: HeaderNavItem[]
}>(), {
  modelValue: '',
  brand: 'DAIYOSEI UI',
  meta: 'READY',
  items: () => [
    { label: 'Overview', value: 'overview' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Assets', value: 'assets' },
    { label: 'Settings', value: 'settings' },
  ],
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(value: string) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.header-nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  min-height: 56px;
  border: 1px solid var(--border-alpha);
  background: color-mix(in srgb, var(--bg-secondary) 88%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--text-primary) 8%, transparent) inset;
  padding: 0 14px;
}
.header-left,
.header-right {
  font-size: 10px;
  color: var(--text-gray);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.header-center {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.header-link {
  border: 1px dashed color-mix(in srgb, var(--text-primary) 34%, transparent);
  background: transparent;
  color: var(--text-primary);
  font: inherit;
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.header-link:hover {
  border-style: solid;
  background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
}
.header-link.is-active {
  border-style: solid;
  border-color: var(--accent-orange);
  color: var(--accent-orange);
}
</style>
