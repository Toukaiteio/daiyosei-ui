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
  border: 1.4px dashed color-mix(in srgb, var(--text-primary) 38%, transparent);
  border-radius: 14px 10px 12px 16px / 16px 12px 10px 14px;
  background: color-mix(in srgb, var(--bg-secondary) 78%, transparent);
  padding: 2px;
  transform: rotate(-0.2deg);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-submenu:hover {
  transform: rotate(0deg);
  border-color: color-mix(in srgb, var(--text-primary) 55%, transparent);
}
.daiyo-submenu-title {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--text-primary);
  padding: 8px 10px 7px;
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
  padding-left: 10px;
}
.daiyo-submenu-title-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 5px;
  height: 1px;
  background: var(--accent-orange);
  transform: translateY(-50%);
}
.daiyo-submenu-icon {
  transition: transform 0.34s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--text-gray);
}
.daiyo-submenu-icon--open {
  transform: rotate(180deg);
  color: var(--accent-orange);
}
.daiyo-submenu-body {
  padding: 0 10px 10px 12px;
  color: var(--text-primary);
  font-size: 12px;
  border-top: 1px dashed color-mix(in srgb, var(--border-alpha) 70%, transparent);
  margin-top: 2px;
}
:deep(.daiyo-submenu) {
  margin-top: 8px;
}
.submenu-paper-enter-active,
.submenu-paper-leave-active {
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}
.submenu-paper-enter-from,
.submenu-paper-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-6px);
}
</style>
