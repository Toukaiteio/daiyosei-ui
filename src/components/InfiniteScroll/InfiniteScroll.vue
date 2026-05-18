<template>
  <div class="daiyo-infinite-scroll">
    <slot :items="items" />
    <div ref="sentinelRef" class="daiyo-sentinel"></div>
    <div v-if="loading" class="daiyo-loading font-tech">loading...</div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  items: T[]
  hasMore: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  loadMore: []
}>()

const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sentinelRef.value) return
  observer = new IntersectionObserver((entries) => {
    if (!props.hasMore || props.loading) return
    if (entries.some((entry) => entry.isIntersecting)) {
      emit('loadMore')
    }
  }, { rootMargin: '160px' })
  observer.observe(sentinelRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.daiyo-infinite-scroll {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1.5px dashed var(--border-alpha);
  padding: 10px 10px 8px;
  background: color-mix(in srgb, var(--card-bg) 88%, transparent);
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
}
.daiyo-sentinel {
  height: 4px;
  border-radius: 999px;
  background: repeating-linear-gradient(
    90deg,
    transparent 0 8px,
    color-mix(in srgb, var(--accent-yellow) 65%, transparent) 8px 12px
  );
  opacity: 0.55;
}
.daiyo-loading {
  font-size: 9px;
  color: var(--text-primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-left: 2px;
}
</style>
