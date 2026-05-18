<template>
  <span class="daiyo-tag font-tech" :class="`daiyo-tag--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'alert'
}>(), {
  variant: 'default',
})
</script>

<style scoped>
.daiyo-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1.8px solid var(--text-primary);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 3px 10px;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-secondary) 90%, transparent);
  box-shadow: 1.5px 2px 0 color-mix(in srgb, var(--text-primary) 28%, transparent);
  transform: rotate(-0.6deg);
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.25s cubic-bezier(0.25, 0.8, 0.25, 1),
    border-color 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-tag::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.75;
}
.daiyo-tag:hover {
  transform: rotate(0deg) translateY(-1px);
}
.daiyo-tag--default {
  border-color: var(--text-primary);
}
.daiyo-tag--success {
  border-color: color-mix(in srgb, var(--bg-cobalt-blue) 70%, #9ddcb7);
  color: color-mix(in srgb, var(--bg-cobalt-blue) 60%, #9ddcb7);
}
.daiyo-tag--warning {
  border-color: var(--accent-orange);
  color: var(--accent-orange);
}
.daiyo-tag--alert {
  border-color: #db5757;
  color: #db5757;
}
</style>
