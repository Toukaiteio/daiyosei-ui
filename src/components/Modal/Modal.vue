<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="daiyo-modal-wrap" @click.self="close">
        <div class="daiyo-modal-overlay"></div>
        <div class="daiyo-modal-panel" role="dialog" aria-modal="true">
          <header class="daiyo-modal-header">
            <h3 class="daiyo-modal-title font-tech">{{ title }}</h3>
            <button class="daiyo-modal-close font-tech" type="button" @click="close">close</button>
          </header>
          <section class="daiyo-modal-body">
            <slot />
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.daiyo-modal-wrap {
  position: fixed;
  inset: 0;
  z-index: 11000;
  display: grid;
  place-items: center;
  padding: 20px;
}
.daiyo-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 12, 16, 0.45);
}
.daiyo-modal-panel {
  position: relative;
  z-index: 1;
  width: min(640px, 92vw);
  max-height: 86vh;
  background: var(--bg-secondary);
  border: 2px solid var(--card-border);
  border-radius: 18px 30px 20px 26px / 24px 16px 28px 18px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.daiyo-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1.5px dashed var(--border-alpha);
}
.daiyo-modal-title {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
}
.daiyo-modal-close {
  border: 1.5px solid var(--text-primary);
  background: transparent;
  color: var(--text-primary);
  border-radius: 8px 14px 7px 10px / 10px 7px 14px 8px;
  font-size: 9px;
  padding: 5px 10px;
  cursor: pointer;
  text-transform: uppercase;
}
.daiyo-modal-close:hover {
  background: var(--accent-orange);
  color: var(--bg-primary);
  border-color: var(--accent-orange);
}
.daiyo-modal-body {
  padding: 18px;
  color: var(--text-primary);
  overflow: auto;
  max-height: calc(86vh - 58px);
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .daiyo-modal-panel,
.modal-fade-leave-active .daiyo-modal-panel {
  transition: transform 0.28s ease;
}
.modal-fade-enter-from .daiyo-modal-panel,
.modal-fade-leave-to .daiyo-modal-panel {
  transform: translateY(10px) scale(0.98);
}
</style>
