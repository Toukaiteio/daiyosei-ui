<template>
  <div class="avatar-row-wrapper">
    <div class="avatar-row" ref="rowRef" :style="{ transform: `translateX(${translateX}px)` }">
      <AvatarCard
        v-for="card in cards"
        :key="card.index"
        :index="card.index"
        :label="card.label"
        :is-active="activeIndex === card.index"
        :is-image-filled="card.isImageFilled"
        :scribble-path="card.scribblePath"
        :scribble-frames="card.scribbleFrames"
        :style="cardStyles[card.index]"
        @click="selectCard(card.index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import AvatarCard from './AvatarCard.vue'
import type { AvatarCardData } from '../../types'

const props = defineProps<{
  cards: AvatarCardData[]
  activeIndex: number
}>()

const emit = defineEmits<{
  'update:activeIndex': [value: number]
}>()

const rowRef = ref<HTMLElement | null>(null)
const translateX = ref(0)
const cardStyles = ref<Record<number, any>>({})
let timeoutId: number | null = null

function updateLayout(activeIndex: number) {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  // 1. Get remaining indices in order
  const remainingIndices: number[] = []
  props.cards.forEach((card) => {
    if (card.index !== activeIndex) {
      remainingIndices.push(card.index)
    }
  })

  // 2. Determine target relative rankings: 2 cards on the left, 2 cards on the right
  const targetRels: Record<number, number> = {}
  targetRels[activeIndex] = 0
  if (remainingIndices.length >= 4) {
    targetRels[remainingIndices[0]] = -2
    targetRels[remainingIndices[1]] = -1
    targetRels[remainingIndices[2]] = 1
    targetRels[remainingIndices[3]] = 2
  }

  // Phase 1: Push-aside (拨开)
  props.cards.forEach((card) => {
    const idx = card.index
    const targetRel = targetRels[idx] ?? 0
    const relIdx = idx - activeIndex
    const dist = Math.abs(targetRel)

    let spreadOffset = 0
    let zIndex = 10
    if (targetRel < 0) {
      spreadOffset = (targetRel - relIdx) * 60 - 30
      zIndex = 10 - dist * 2
    } else if (targetRel > 0) {
      spreadOffset = (targetRel - relIdx) * 60 + 30
      zIndex = 10 - dist * 2
    } else {
      spreadOffset = 0
      zIndex = 10
    }

    const baseRots = [-3.5, 2.8, -1.5, 4.2, -2.5]
    const baseRot = baseRots[idx] ?? 0

    cardStyles.value[idx] = {
      '--spread-offset': `${spreadOffset}px`,
      '--card-y': idx === activeIndex ? '-24px' : '0px',
      '--card-rot': `${baseRot}deg`,
      zIndex: zIndex,
      filter: 'none',
      opacity: '1'
    }
  })

  // Calculate center translation offset: maps active card precisely to center
  translateX.value = (2 - activeIndex) * 60

  // Phase 2: Convergence (收回 with random rotation and optical depths)
  timeoutId = window.setTimeout(() => {
    props.cards.forEach((card) => {
      const idx = card.index
      const targetRel = targetRels[idx] ?? 0
      const relIdx = idx - activeIndex
      const dist = Math.abs(targetRel)

      if (idx !== activeIndex) {
        const spreadOffset = (targetRel - relIdx) * 60
        const randomRot = (Math.random() * 8 - 4).toFixed(1)
        cardStyles.value[idx] = {
          '--spread-offset': `${spreadOffset}px`,
          '--card-y': '0px',
          '--card-rot': `${randomRot}deg`,
          zIndex: 10 - dist * 2,
          filter: `brightness(${1 - dist * 0.08}) contrast(${1 - dist * 0.04})`,
          opacity: `${1 - dist * 0.05}`
        }
      } else {
        cardStyles.value[idx] = {
          '--spread-offset': '0px',
          '--card-y': '-24px',
          '--card-rot': '0.8deg',
          zIndex: 10,
          filter: 'none',
          opacity: '1'
        }
      }
    })
  }, 220)
}

function selectCard(index: number) {
  emit('update:activeIndex', index)
}

watch(() => props.activeIndex, (newVal) => {
  updateLayout(newVal)
})

onMounted(() => {
  updateLayout(props.activeIndex)
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.avatar-row-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding-top: 40px;
  padding-bottom: 20px;
  margin-top: -10px;
  margin-bottom: -10px;
}
.avatar-row {
  display: flex;
  justify-content: center;
  gap: 0;
  transition: transform 0.55s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}
</style>