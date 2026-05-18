<template>
  <span class="daiyo-badge font-tech" :class="`daiyo-badge--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'neutral' | 'success' | 'warning' | 'danger'
}>(), {
  variant: 'neutral',
})
</script>

<style scoped>
.daiyo-badge {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid var(--card-border);
  border-radius: 8px 12px 6px 10px / 10px 6px 12px 8px;
  padding: 3px 8px;
  font-size: 9px;
  letter-spacing: 0.06em;
  font-weight: 700;
  text-transform: uppercase;
}
.daiyo-badge--neutral {
  background: var(--card-bg);
  color: var(--text-primary);
}
.daiyo-badge--success {
  background: rgba(92, 158, 130, 0.2);
  color: var(--text-primary);
}
.daiyo-badge--warning {
  background: rgba(232, 168, 56, 0.22);
  color: var(--text-primary);
}
.daiyo-badge--danger {
  background: rgba(200, 90, 90, 0.24);
  color: var(--text-primary);
}
</style>
