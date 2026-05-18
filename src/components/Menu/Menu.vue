<template>
  <nav class="daiyo-menu-shell">
    <button
      v-if="collapsible"
      type="button"
      class="daiyo-menu-toggle font-tech"
      @click="open = !open"
    >
      <span class="daiyo-menu-toggle-title">{{ title }}</span>
      <span class="daiyo-menu-toggle-meta">{{ open ? 'OPEN' : 'CLOSED' }}</span>
      <span :class="['daiyo-menu-toggle-icon', { 'daiyo-menu-toggle-icon--open': open }]">⌄</span>
    </button>
    <Transition name="menu-paper">
      <div v-show="open" class="daiyo-menu">
        <div class="daiyo-menu-safe-line"></div>
        <slot />
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  collapsible?: boolean
  defaultOpen?: boolean
}>(), {
  title: 'MENU',
  collapsible: true,
  defaultOpen: true,
})

const open = ref(props.defaultOpen)
</script>

<style scoped>
.daiyo-menu-shell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px dashed var(--border-alpha);
  background-color: var(--bg-secondary);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 30px;
  background-position: 0 15px;
  padding: 10px;
  position: relative;
}
.daiyo-menu-shell::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 7px;
  border-left: 1px dashed color-mix(in srgb, var(--accent-orange) 68%, transparent);
  opacity: 0.55;
  pointer-events: none;
}
.daiyo-menu-toggle {
  border: 1.8px solid var(--text-primary);
  background: color-mix(in srgb, var(--bg-secondary) 90%, transparent);
  color: var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 8px 10px 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 0.1em;
  box-shadow: 2px 2px 0 color-mix(in srgb, var(--text-primary) 24%, transparent);
  transform: rotate(-0.55deg);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-menu-toggle:hover {
  transform: rotate(0deg) translateY(-1px);
  background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
}
.daiyo-menu-toggle-title {
  margin-right: auto;
}
.daiyo-menu-toggle-meta {
  font-size: 8px;
  color: var(--text-gray);
  letter-spacing: 0.08em;
}
.daiyo-menu-toggle-icon {
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-menu-toggle-icon--open {
  transform: rotate(180deg);
}
.daiyo-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid color-mix(in srgb, var(--text-primary) 65%, transparent);
  border-radius: 18px 14px 16px 12px / 12px 16px 14px 18px;
  background: color-mix(in srgb, var(--card-bg) 90%, transparent);
  padding: 10px 10px 10px 14px;
  position: relative;
  overflow: hidden;
}
.daiyo-menu-safe-line {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 6px;
  width: 0;
  border-left: 1px dashed color-mix(in srgb, var(--accent-orange) 56%, transparent);
  opacity: 0.55;
}
.menu-paper-enter-active,
.menu-paper-leave-active {
  transition: opacity 0.46s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.46s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}
.menu-paper-enter-from,
.menu-paper-leave-to {
  opacity: 0;
  transform: scaleY(0.88) translateY(-8px) rotate(-0.25deg);
}
</style>
