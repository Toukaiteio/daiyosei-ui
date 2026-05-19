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
    <Transition
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="open" class="daiyo-menu">
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

function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = '0'
  e.style.opacity = '0'
  e.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    e.style.transition = 'height 0.4s cubic-bezier(0.25,0.8,0.25,1), opacity 0.4s ease'
    e.style.height = e.scrollHeight + 'px'
    e.style.opacity = '1'
  })
}
function onAfterEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = ''
  e.style.overflow = ''
  e.style.transition = ''
  e.style.opacity = ''
}
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = e.scrollHeight + 'px'
  e.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    e.style.transition = 'height 0.4s cubic-bezier(0.25,0.8,0.25,1), opacity 0.4s ease'
    e.style.height = '0'
    e.style.opacity = '0'
  })
}
function onAfterLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = ''
  e.style.overflow = ''
  e.style.transition = ''
  e.style.opacity = ''
}
</script>

<style scoped>
.daiyo-menu-shell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid var(--card-border);
  border-radius: 18px 8px 14px 10px / 10px 14px 8px 18px;
  background-color: var(--bg-secondary);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 30px;
  background-position: 0 15px;
  padding: 10px;
  box-shadow: 3px 3px 0 var(--card-border);
}
.daiyo-menu-toggle {
  border: 2px solid var(--text-primary);
  background: var(--card-bg);
  color: var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 8px 12px 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 0.1em;
  box-shadow: 2px 2px 0 color-mix(in srgb, var(--text-primary) 20%, transparent);
  transform: rotate(-0.5deg);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-menu-toggle:hover {
  transform: rotate(0deg) translateY(-1px);
  background: color-mix(in srgb, var(--accent-orange) 12%, var(--card-bg));
  box-shadow: 3px 3px 0 color-mix(in srgb, var(--text-primary) 20%, transparent);
}
.daiyo-menu-toggle-title { margin-right: auto; }
.daiyo-menu-toggle-meta {
  font-size: 8px;
  color: var(--text-gray);
  letter-spacing: 0.08em;
}
.daiyo-menu-toggle-icon {
  color: var(--accent-orange);
  font-size: 14px;
  line-height: 1;
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-menu-toggle-icon--open { transform: rotate(180deg); }
.daiyo-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 2px solid color-mix(in srgb, var(--text-primary) 55%, transparent);
  border-radius: 14px 8px 16px 10px / 10px 16px 8px 14px;
  background-color: color-mix(in srgb, var(--card-bg) 85%, transparent);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 30px;
  background-position: 0 15px;
  padding: 10px;
}
</style>
