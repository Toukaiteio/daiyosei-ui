<template>
  <nav class="daiyo-breadcrumb font-tech" aria-label="breadcrumb">
    <template v-for="(item, i) in items" :key="i">
      <span v-if="i > 0" class="daiyo-breadcrumb-sep" aria-hidden="true">{{ separator }}</span>
      <a
        v-if="item.href && i < items.length - 1"
        :href="item.href"
        class="daiyo-breadcrumb-item daiyo-breadcrumb-link"
        @click.prevent="$emit('navigate', item)"
      >{{ item.label }}</a>
      <span
        v-else
        class="daiyo-breadcrumb-item"
        :class="{ 'daiyo-breadcrumb-active': i === items.length - 1 }"
        :aria-current="i === items.length - 1 ? 'page' : undefined"
      >{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  href?: string
}

withDefaults(defineProps<{
  items: BreadcrumbItem[]
  separator?: string
}>(), {
  separator: '/',
})

defineEmits<{
  navigate: [item: BreadcrumbItem]
}>()
</script>

<style scoped>
.daiyo-breadcrumb {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 14px;
  border: 2px solid var(--card-border);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  background: var(--card-bg);
  box-shadow: 2px 2px 0 var(--card-border);
  transform: rotate(-0.3deg);
}
.daiyo-breadcrumb-item {
  font-size: 10px;
  color: var(--text-gray);
  white-space: nowrap;
}
.daiyo-breadcrumb-link {
  color: var(--text-gray);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
}
.daiyo-breadcrumb-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  bottom: -1px;
  height: 1px;
  background: var(--accent-orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-breadcrumb-link:hover {
  color: var(--text-primary);
}
.daiyo-breadcrumb-link:hover::after {
  transform: scaleX(1);
}
.daiyo-breadcrumb-active {
  color: var(--text-primary);
  font-weight: 700;
}
.daiyo-breadcrumb-sep {
  font-size: 10px;
  color: var(--accent-orange);
  opacity: 0.7;
  user-select: none;
  transform: rotate(8deg);
  display: inline-block;
}
</style>
