<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="drawer-wrapper" @click.self="close">
        <div class="drawer-overlay" @click="close"></div>
        <div class="drawer-panel" ref="panelRef" role="dialog" tabindex="-1">
          <div class="drawer-header">
            <span class="drawer-title font-tech">{{ title }}</span>
            <button class="drawer-close font-tech" @click="close">✕ CLOSE</button>
          </div>
          <div class="drawer-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const panelRef = ref<HTMLElement | null>(null)

function close() {
  emit('update:modelValue', false)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})

watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.drawer-wrapper {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 10000;
  display: flex;
  justify-content: flex-end;
}
.drawer-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
}
.drawer-panel {
  position: relative;
  width: 480px;
  max-width: 90vw;
  height: 100%;
  background-color: var(--bg-secondary);
  border-left: 2.5px solid var(--card-border);
  border-radius: 255px 0 0 225px / 15px 0 0 255px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.12);
}
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px 16px;
  border-bottom: 1.5px dashed var(--border-alpha);
}
.drawer-title {
  font-size: 13px;
  color: var(--text-primary);
  letter-spacing: 0.08em;
}
.drawer-close {
  background: none;
  border: 1.5px dashed var(--card-border);
  color: var(--text-gray);
  padding: 6px 14px;
  font-size: 9px;
  cursor: pointer;
  border-radius: 6px 12px 4px 10px / 10px 4px 12px 6px;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.drawer-close:hover {
  border-color: var(--accent-orange);
  color: var(--accent-orange);
  transform: rotate(-2deg) scale(1.05);
}
.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.38s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>