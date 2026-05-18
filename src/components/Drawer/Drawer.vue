<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="drawer-wrapper" @click.self="close">
        <div class="drawer-overlay" @click="close"></div>
        <div class="drawer-panel" ref="panelRef" role="dialog" tabindex="-1">
          <!-- Binder holes simulating a ripped-out loose-leaf sketchbook page -->
          <div class="binder-holes">
            <div v-for="i in 12" :key="i" class="binder-hole"></div>
          </div>
          
          <div class="drawer-header">
            <span class="drawer-title font-tech">
              <span class="title-pin"></span>
              {{ title }}
            </span>
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
  background: rgba(12, 21, 28, 0.45); /* Soft, warm dark overlay without sluggish GPU blur filters */
  transition: opacity 0.3s ease;
}
.drawer-panel {
  position: relative;
  width: 530px;
  max-width: 90vw;
  height: 100%;
  
  /* Lined Notebook Paper Background: Solid paper background + ruled lines */
  background-color: var(--bg-secondary);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 32px;
  background-position: 0 16px;
  
  display: flex;
  flex-direction: column;
  z-index: 1;
  box-shadow: -15px 0 35px rgba(4, 8, 12, 0.2);
  will-change: transform;
  overflow: visible; /* Allow left torn edge mask and shadow to overlay cleanly */
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              background-image 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding-left: 20px;
}

/* Torn Edge Mask on the Left Edge of the Page */
.drawer-panel::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -11px;
  width: 12px;
  background-color: var(--bg-secondary);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='20' viewBox='0 0 12 20'%3E%3Cpath d='M12,0 Q6,3 0,10 Q6,17 12,20 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-repeat: repeat-y;
  -webkit-mask-position: left top;
  -webkit-mask-size: 12px 20px;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='20' viewBox='0 0 12 20'%3E%3Cpath d='M12,0 Q6,3 0,10 Q6,17 12,20 Z' fill='white'/%3E%3C/svg%3E");
  mask-repeat: repeat-y;
  mask-position: left top;
  mask-size: 12px 20px;
  pointer-events: none;
  z-index: 11;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Red Margin Safety line on the left of loose-leaf pages */
.drawer-panel::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 54px;
  width: 2px;
  border-left: 2px dashed var(--accent-orange);
  opacity: 0.45;
  pointer-events: none;
  z-index: 2;
}

/* Column of punched binder holes along the left ripped edge */
.binder-holes {
  position: absolute;
  left: 14px;
  top: 0;
  bottom: 0;
  width: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  pointer-events: none;
  z-index: 3;
  padding: 40px 0;
}
.binder-hole {
  width: 11px;
  height: 11px;
  background-color: var(--bg-primary); /* Ripped hole showing bottom layer */
  border-radius: 50%;
  box-shadow: inset 1.5px 1.5px 3px rgba(0, 0, 0, 0.35), 0.5px 0.5px 0px rgba(255, 255, 255, 0.12);
  border: 1.5px solid var(--border-alpha);
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-header {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 36px 18px 56px;
  border-bottom: 2px dashed var(--border-alpha);
}
.drawer-title {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* 3D Stylized Thumbtack holding page header */
.title-pin {
  width: 13px;
  height: 13px;
  background: var(--accent-orange);
  border-radius: 50%;
  position: relative;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  border: 1.5px solid var(--text-primary);
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.title-pin::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 7px;
  background: var(--text-gray);
  bottom: -6px;
  left: 3.5px;
  border-radius: 1px;
}

/* Interactive Sketched Sticky-Sticker Close Button */
.drawer-close {
  background: var(--bg-secondary);
  border: 2px solid var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  color: var(--text-primary);
  padding: 6px 14px;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--text-primary);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.drawer-close:hover {
  background: var(--accent-orange);
  color: var(--bg-secondary);
  transform: translate(-1px, -1px) rotate(-1.5deg);
  box-shadow: 3px 3px 0px var(--text-primary);
}
.drawer-close:active {
  transform: translate(1px, 1px) rotate(0deg);
  box-shadow: 1px 1px 0px var(--text-primary);
}

.drawer-body {
  position: relative;
  z-index: 2;
  flex: 1;
  overflow-y: auto;
  padding: 24px 36px 40px 56px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

/* Physical Damped Slide Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.35s ease;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.48s cubic-bezier(0.25, 0.8, 0.25, 1); /* Physical paper damping */
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%) rotate(0.6deg); /* Subtle paper angle while entering */
}
</style>
