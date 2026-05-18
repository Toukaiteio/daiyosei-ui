<template>
  <button
    class="daiyo-button font-tech"
    :class="[`daiyo-button--${variant}`, { 'daiyo-button--block': block }]"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <span v-if="$slots.icon" class="daiyo-button-icon daiyo-button-icon--slot">
      <slot name="icon" />
    </span>
    <i v-else-if="iconClass" class="daiyo-button-icon" :class="iconClass" aria-hidden="true"></i>
    <span v-else-if="iconText" class="daiyo-button-icon material-symbols-outlined" aria-hidden="true">{{ iconText }}</span>
    <span v-else-if="icon" class="daiyo-button-icon">{{ icon }}</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'warning' | 'alert' | 'success'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  block?: boolean
  icon?: string
  iconClass?: string
  iconText?: string
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  block: false,
  icon: '',
  iconClass: '',
  iconText: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function onClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.daiyo-button {
  border: 2px solid var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 14px 20px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 2px 3px 0px var(--border-alpha);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.daiyo-button--primary {
  background: transparent;
  color: var(--text-primary);
  transform: rotate(1deg);
}
.daiyo-button--secondary {
  background: var(--card-bg);
  color: var(--text-primary);
  border-style: dashed;
  transform: rotate(-0.6deg);
}
.daiyo-button--ghost {
  background: transparent;
  color: var(--text-primary);
  border-style: dashed;
}
.daiyo-button--warning {
  background: rgba(232, 168, 56, 0.18);
  border-color: #e8a838;
  color: var(--text-primary);
}
.daiyo-button--alert {
  background: rgba(200, 90, 90, 0.2);
  border-color: #c85a5a;
  color: var(--text-primary);
}
.daiyo-button--success {
  background: rgba(124, 184, 122, 0.22);
  border-color: #7cb87a;
  color: var(--text-primary);
}
.daiyo-button--block {
  width: 100%;
}
.daiyo-button-icon {
  margin-right: 8px;
  font-size: 12px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}
.daiyo-button-icon--slot {
  min-width: 12px;
}
.daiyo-button--primary:hover:not(:disabled) {
  background: repeating-linear-gradient(
    45deg,
    var(--accent-orange) 0px,
    var(--accent-orange) 3px,
    transparent 3px,
    transparent 6px
  );
  border-color: var(--accent-orange);
  transform: scale(1.04) rotate(-2deg);
}
.daiyo-button--secondary:hover:not(:disabled),
.daiyo-button--ghost:hover:not(:disabled),
.daiyo-button--warning:hover:not(:disabled),
.daiyo-button--alert:hover:not(:disabled),
.daiyo-button--success:hover:not(:disabled) {
  background-color: var(--border-alpha);
  transform: scale(1.03) rotate(-1deg);
}
.daiyo-button:active:not(:disabled) {
  background-color: var(--accent-orange);
  color: var(--bg-primary);
  transform: scale(0.97) rotate(0deg);
}
.daiyo-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
