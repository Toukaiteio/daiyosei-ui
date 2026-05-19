<template>
  <div class="daiyo-submenu">
    <button type="button" class="daiyo-submenu-title font-tech" @click="open = !open">
      <span class="daiyo-submenu-title-text">{{ title }}</span>
      <span :class="['daiyo-submenu-icon', { 'daiyo-submenu-icon--open': open }]">⌄</span>
    </button>
    <Transition name="submenu-paper">
      <div v-if="open" class="daiyo-submenu-body">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  defaultOpen?: boolean
}>(), {
  defaultOpen: false,
})

const open = ref(props.defaultOpen)
</script>

<style scoped>
.daiyo-submenu {
  border: 2px solid color-mix(in srgb, var(--text-primary) 45%, transparent);
  border-radius: 14px 6px 12px 8px / 8px 12px 6px 14px;
  background-color: color-mix(in srgb, var(--bg-secondary) 80%, transparent);
  transform: rotate(-0.25deg);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
              box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 2px 2px 0 color-mix(in srgb, var(--text-primary) 12%, transparent);
}
.daiyo-submenu:hover {
  transform: rotate(0deg);
  border-color: color-mix(in srgb, var(--text-primary) 65%, transparent);
  box-shadow: 3px 3px 0 color-mix(in srgb, var(--text-primary) 15%, transparent);
}
.daiyo-submenu-title {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  padding: 9px 12px 8px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 0.08em;
}
.daiyo-submenu-title-text {
  position: relative;
  padding-left: 12px;
}
/* Washi-tape style accent mark */
.daiyo-submenu-title-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 2px;
  background: var(--accent-orange);
  transform: translateY(-50%) rotate(-8deg);
  border-radius: 1px;
}
.daiyo-submenu-icon {
  color: var(--text-gray);
  font-size: 14px;
  line-height: 1;
  transition: transform 0.34s cubic-bezier(0.25, 0.8, 0.25, 1),
              color 0.2s ease;
}
.daiyo-submenu-icon--open {
  transform: rotate(180deg);
  color: var(--accent-orange);
}
.daiyo-submenu-body {
  padding: 4px 12px 12px 12px;
  color: var(--text-primary);
  font-size: 12px;
  border-top: 1.5px dashed color-mix(in srgb, var(--border-alpha) 80%, transparent);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 28px;
  background-position: 0 14px;
}
:deep(.daiyo-submenu) {
  margin-top: 8px;
}
.submenu-paper-enter-active,
.submenu-paper-leave-active {
  transition: opacity 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
              transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}
.submenu-paper-enter-from,
.submenu-paper-leave-to {
  opacity: 0;
  transform: scaleY(0.88) translateY(-6px) rotate(-0.3deg);
}
</style>
