<template>
  <div class="daiyo-image-card" ref="rootRef">
    <!-- Washi tape decoration -->
    <div class="daiyo-image-card-tape" :style="tapeStyle"></div>

    <div class="daiyo-image" :style="imageStyle">
      <div v-if="!visible" class="daiyo-image-placeholder"></div>
    </div>

    <div v-if="title || caption" class="daiyo-image-card-footer">
      <span v-if="title" class="daiyo-image-card-title font-tech">{{ title }}</span>
      <span v-if="caption" class="daiyo-image-card-caption font-handwritten">{{ caption }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  title?: string
  caption?: string
  lazy?: boolean
  tapeColor?: string
  rotate?: number
}>(), {
  lazy: true,
  rotate: -0.35,
})

const rootRef = ref<HTMLElement | null>(null)
const visible = ref(!props.lazy)
let observer: IntersectionObserver | null = null

const imageStyle = computed(() => ({
  backgroundImage: visible.value ? `url('${props.src}')` : 'none',
}))

const tapeStyle = computed(() => ({
  '--tape-bg': props.tapeColor || undefined,
}))

onMounted(() => {
  if (!props.lazy || !rootRef.value) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      visible.value = true
      observer?.disconnect()
      observer = null
    }
  }, { rootMargin: '120px' })
  observer.observe(rootRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.daiyo-image-card {
  position: relative;
  border: 2px solid var(--text-primary);
  background-color: var(--bg-secondary);
  background-image: linear-gradient(var(--grid-color) 1px, transparent 1px);
  background-size: 100% 28px;
  background-position: 0 14px;
  border-radius: 4px 2px 3px 2px;
  padding: 14px 10px 10px;
  transform: rotate(v-bind('`${rotate}deg`'));
  box-shadow: 3px 4px 0 color-mix(in srgb, var(--text-primary) 20%, transparent);
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
              box-shadow 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 14px;
}
.daiyo-image-card:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: 5px 6px 0 color-mix(in srgb, var(--text-primary) 25%, transparent);
}

/* Washi tape */
.daiyo-image-card-tape {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 80px;
  height: 24px;
  background: var(--tape-bg, rgba(79, 121, 163, 0.28));
  border: 1px dashed rgba(79, 121, 163, 0.5);
  clip-path: polygon(0% 14%, 4% 0%, 97% 4%, 100% 16%, 97% 86%, 100% 100%, 4% 96%, 0% 84%);
  pointer-events: none;
  z-index: 2;
}
:global(.theme-dark) .daiyo-image-card-tape {
  background: var(--tape-bg, rgba(184, 163, 125, 0.3));
  border-color: rgba(184, 163, 125, 0.55);
}

.daiyo-image {
  width: 100%;
  height: 160px;
  background-position: center;
  background-size: cover;
  border: 1.5px solid color-mix(in srgb, var(--text-primary) 60%, transparent);
  border-radius: 2px 1px 3px 1px;
  background-color: color-mix(in srgb, var(--bg-primary) 80%, transparent);
  position: relative;
  overflow: hidden;
}
/* Sketch corner marks */
.daiyo-image::before,
.daiyo-image::after {
  content: '';
  position: absolute;
  width: 10px; height: 10px;
  border-color: var(--accent-orange);
  border-style: solid;
  opacity: 0.7;
  z-index: 1;
}
.daiyo-image::before {
  top: 4px; left: 4px;
  border-width: 2px 0 0 2px;
}
.daiyo-image::after {
  bottom: 4px; right: 4px;
  border-width: 0 2px 2px 0;
}

.daiyo-image-placeholder {
  width: 100%; height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--border-alpha) 0px, var(--border-alpha) 1px,
    transparent 1px, transparent 8px
  );
}

.daiyo-image-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 8px;
  gap: 8px;
}
.daiyo-image-card-title {
  font-size: 9px;
  color: var(--text-primary);
  letter-spacing: 0.1em;
}
.daiyo-image-card-caption {
  font-size: 13px;
  color: var(--text-gray);
  font-style: italic;
  transform: rotate(-1deg);
  display: inline-block;
}
</style>
