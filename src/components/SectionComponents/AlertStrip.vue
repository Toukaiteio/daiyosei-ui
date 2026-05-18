<template>
  <div class="alert-strip">
    <div class="barcode-decor"></div>
    <div class="alert-content">
      <div class="alert-title font-tech">
        <span class="warn-blink">✿ NOTE:</span> {{ title }}
      </div>
      <div class="alert-desc font-tech">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<style scoped>
.alert-strip {
  border: 2px solid var(--accent-orange);
  background-color: rgba(255, 92, 0, 0.02);
  border-radius: 15px 255px 8px 220px/255px 8px 220px 15px;
  display: flex;
  align-items: stretch;
}
.barcode-decor {
  width: 48px;
  background-color: var(--accent-orange);
  opacity: 0.15;
  position: relative;
  border-right: 2px dashed var(--accent-orange);
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 10%, 93% 15%, 100% 20%,
    90% 35%, 100% 50%, 93% 65%, 100% 80%,
    90% 90%, 100% 100%, 0% 100%
  );
}
.alert-content {
  flex: 1;
  padding: 14px 16px;
}
.alert-title {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent-orange);
  margin-bottom: 4px;
}
.warn-blink {
  animation: warning-pulse 0.6s infinite alternate;
}
@keyframes warning-pulse {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}
.alert-desc {
  font-size: 8px;
  color: var(--text-gray);
}
</style>