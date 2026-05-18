<template>
  <aside class="side-nav font-tech">
    <div class="side-nav-head">
      <slot name="title">{{ title }}</slot>
    </div>
    <nav class="side-nav-body" aria-label="Side navigation">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        :class="['side-link', { 'is-active': modelValue === item.value }]"
        @click="select(item.value)"
      >
        <span class="side-link-label">{{ item.label }}</span>
        <span class="side-link-mark">›</span>
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
type SideNavItem = {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  modelValue?: string
  title?: string
  items?: SideNavItem[]
}>(), {
  modelValue: '',
  title: 'Navigation',
  items: () => [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Library', value: 'library' },
    { label: 'Collections', value: 'collections' },
    { label: 'Preferences', value: 'preferences' },
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
.side-nav {
  width: 240px;
  border: 1px solid var(--border-alpha);
  background: var(--bg-secondary);
  position: relative;
  padding: 10px 10px 12px;
}
.side-nav::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: -9px;
  width: 9px;
  background-color: var(--bg-secondary);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='18' viewBox='0 0 9 18'%3E%3Cpath d='M0,0 Q5,2.5 9,9 Q5,15.5 0,18 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-y;
  -webkit-mask-size: 9px 18px;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='18' viewBox='0 0 9 18'%3E%3Cpath d='M0,0 Q5,2.5 9,9 Q5,15.5 0,18 Z' fill='white'/%3E%3C/svg%3E");
  mask-repeat: repeat-y;
  mask-size: 9px 18px;
  pointer-events: none;
}
.side-nav-head {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-gray);
  padding: 6px 8px 10px;
  border-bottom: 1px dashed var(--border-alpha);
}
.side-nav-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 10px;
}
.side-link {
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font: inherit;
  font-size: 11px;
  padding: 8px 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}
.side-link:hover {
  border-color: var(--border-alpha);
  background: color-mix(in srgb, var(--text-primary) 7%, transparent);
}
.side-link.is-active {
  border-color: var(--accent-orange);
  background: color-mix(in srgb, var(--accent-orange) 14%, transparent);
  color: var(--accent-orange);
}
.side-link-mark {
  opacity: 0.75;
}
</style>
