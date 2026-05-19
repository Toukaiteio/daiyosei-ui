<template>
  <aside class="sidebar font-tech">
    <div>
      <SidebarBrand />
      <ThemeSelector :model-value="theme" @update:model-value="$emit('update:theme', $event)" />
      <EffectToggles :model-value="effects" @update:model-value="$emit('update:effects', $event)" />
    </div>
    <div>
      <StatusHud />
      <SidebarFooter :content="footerContent" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Theme, EffectsState, SidebarFooterContent } from '../../types'
import SidebarBrand from './SidebarBrand.vue'
import ThemeSelector from './ThemeSelector.vue'
import EffectToggles from './EffectToggles.vue'
import StatusHud from './StatusHud.vue'
import SidebarFooter from './SidebarFooter.vue'

defineProps<{
  theme: Theme
  effects: EffectsState
  footerContent: SidebarFooterContent
}>()

defineEmits<{
  'update:theme': [value: Theme]
  'update:effects': [value: EffectsState]
}>()
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: var(--bg-secondary);
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  color: var(--text-primary);
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}
.sidebar::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: -12px;
  width: 12px;
  background-color: var(--bg-secondary);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='20' viewBox='0 0 12 20'%3E%3Cpath d='M0,0 Q6,3 12,10 Q6,17 0,20 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-y;
  -webkit-mask-position: right top;
  -webkit-mask-size: 12px 20px;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='20' viewBox='0 0 12 20'%3E%3Cpath d='M0,0 Q6,3 12,10 Q6,17 0,20 Z' fill='white'/%3E%3C/svg%3E");
  mask-repeat: repeat-y;
  mask-position: right top;
  mask-size: 12px 20px;
  pointer-events: none;
  z-index: 11;
}
</style>
