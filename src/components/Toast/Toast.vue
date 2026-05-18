<template>
  <Transition name="toast-pop">
    <div v-if="modelValue" class="daiyo-toast font-handwritten" :class="`daiyo-toast--${variant}`" role="status">
      <span class="daiyo-toast-dot"></span>
      <span class="daiyo-toast-message">{{ message }}</span>
      <button class="daiyo-toast-close font-tech" type="button" @click="$emit('update:modelValue', false)">x</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean
  message: string
  variant?: 'info' | 'success' | 'warning' | 'error'
}>(), {
  variant: 'info',
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<style scoped>
.daiyo-toast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid var(--text-primary);
  border-radius: 12px 22px 10px 20px / 20px 10px 22px 12px;
  background: var(--bg-secondary);
  padding: 8px 10px;
  color: var(--text-primary);
  box-shadow: 2px 3px 0px var(--border-alpha);
}
.daiyo-toast-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-orange);
}
.daiyo-toast-message {
  font-size: 13px;
}
.daiyo-toast-close {
  border: 1.5px dashed var(--card-border);
  background: transparent;
  color: var(--text-gray);
  cursor: pointer;
  border-radius: 8px;
  font-size: 9px;
  line-height: 1;
  padding: 3px 6px;
}
.daiyo-toast--success .daiyo-toast-dot { background: #7cb87a; }
.daiyo-toast--warning .daiyo-toast-dot { background: #e8a838; }
.daiyo-toast--error .daiyo-toast-dot { background: #c85a5a; }
.toast-pop-enter-active,
.toast-pop-leave-active { transition: all 0.2s ease; }
.toast-pop-enter-from,
.toast-pop-leave-to { opacity: 0; transform: translateY(-8px) scale(0.96); }
</style>
