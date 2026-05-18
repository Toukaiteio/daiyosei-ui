<template>
  <div class="daiyo-image-card" ref="rootRef">
    <div v-if="title" class="daiyo-image-card-title font-tech">{{ title }}</div>
    <div class="daiyo-image" :style="imageStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  title?: string
  lazy?: boolean
}>(), {
  title: '',
  lazy: true,
})

const rootRef = ref<HTMLElement | null>(null)
const visible = ref(!props.lazy)
let observer: IntersectionObserver | null = null

const imageStyle = computed(() => ({
  backgroundImage: visible.value ? `url('${props.src}')` : 'none',
}))

onMounted(() => {
  if (!props.lazy || !rootRef.value) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      visible.value = true
      observer?.disconnect()
      observer = null
    }
  }, { rootMargin: '120px' })
  observer.observe(rootRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.daiyo-image-card {
  border: 2px solid var(--text-primary);
  background-color: var(--bg-secondary);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 28px;
  background-position: 0 14px;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 10px 10px 8px;
  transform: rotate(-0.35deg);
  box-shadow: 2px 3px 0 color-mix(in srgb, var(--text-primary) 25%, transparent);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.daiyo-image-card-title {
  font-size: 9px;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: inline-block;
  padding: 2px 8px;
  background: color-mix(in srgb, var(--accent-orange) 18%, transparent);
  border: 1px dashed color-mix(in srgb, var(--accent-orange) 70%, transparent);
  transform: rotate(-1.2deg);
}
.daiyo-image {
  width: 100%;
  height: 150px;
  background-position: center;
  background-size: cover;
  border: 1.5px solid color-mix(in srgb, var(--text-primary) 70%, transparent);
  border-radius: 14px 8px 12px 10px / 10px 14px 8px 12px;
  background-color: color-mix(in srgb, var(--bg-primary) 75%, #fff);
}
.daiyo-image-card:hover {
  transform: rotate(0deg) translateY(-2px);
  box-shadow: 4px 5px 0 color-mix(in srgb, var(--text-primary) 30%, transparent);
}
</style>
