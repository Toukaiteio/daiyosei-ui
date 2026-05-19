<template>
  <div :class="['alert', `alert-${variant}`]">
    <div class="alert-decor"></div>
    <div class="alert-content">
      <div class="alert-title font-tech">
        <span class="alert-icon">{{ iconMap[variant] }}</span> {{ title }}
      </div>
      <div class="alert-desc font-tech">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  variant?: 'info' | 'warning' | 'success' | 'error'
}>()

const iconMap: Record<'info' | 'warning' | 'success' | 'error', string> = {
  info: 'ℹ',
  warning: '✿',
  success: '✓',
  error: '✕'
}

const variant = props.variant || 'warning'
</script>

<style scoped>
.alert {
  border: 2px solid;
  border-radius: 15px 255px 8px 220px/255px 8px 220px 15px;
  display: flex;
  align-items: stretch;
}

.alert-info {
  border-color: var(--accent-blue, #4a90e2);
  background-color: rgba(74, 144, 226, 0.02);
}

.alert-warning {
  border-color: var(--accent-orange);
  background-color: rgba(255, 92, 0, 0.02);
}

.alert-success {
  border-color: var(--accent-green, #52c41a);
  background-color: rgba(82, 196, 26, 0.02);
}

.alert-error {
  border-color: var(--accent-red, #f5222d);
  background-color: rgba(245, 34, 45, 0.02);
}

.alert-decor {
  width: 48px;
  opacity: 0.15;
  position: relative;
  border-right: 2px dashed;
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 10%, 93% 15%, 100% 20%,
    90% 35%, 100% 50%, 93% 65%, 100% 80%,
    90% 90%, 100% 100%, 0% 100%
  );
}

.alert-info .alert-decor {
  background-color: var(--accent-blue, #4a90e2);
  border-right-color: var(--accent-blue, #4a90e2);
}

.alert-warning .alert-decor {
  background-color: var(--accent-orange);
  border-right-color: var(--accent-orange);
}

.alert-success .alert-decor {
  background-color: var(--accent-green, #52c41a);
  border-right-color: var(--accent-green, #52c41a);
}

.alert-error .alert-decor {
  background-color: var(--accent-red, #f5222d);
  border-right-color: var(--accent-red, #f5222d);
}

.alert-content {
  flex: 1;
  padding: 14px 16px;
}

.alert-title {
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.alert-info .alert-title {
  color: var(--accent-blue, #4a90e2);
}

.alert-warning .alert-title {
  color: var(--accent-orange);
}

.alert-success .alert-title {
  color: var(--accent-green, #52c41a);
}

.alert-error .alert-title {
  color: var(--accent-red, #f5222d);
}

.alert-icon {
  animation: alert-pulse 0.6s infinite alternate;
}

@keyframes alert-pulse {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

.alert-desc {
  font-size: 8px;
  color: var(--text-gray);
}
</style>
