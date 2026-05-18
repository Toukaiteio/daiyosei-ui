<template>
  <section class="section-cards">
    <SectionHeader
      :title="copy.cards.title"
      :bracket="copy.cards.bracket"
      :note="copy.cards.note"
    />
    <div class="cards-layout">
      <div class="sketch-panel-container">
        <div :class="['handwritten-note', 'panel-note', copy.hero.handwrittenClass]">{{ copy.cards.panelNote }}</div>
        <div class="panel-lyrics font-handwritten">{{ copy.cards.lyrics }}</div>
        <ActiveArrowBar />
        <AvatarRow
          :cards="cards"
          :active-index="activeIndex"
          @update:active-index="activeIndex = $event"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeCopy } from '../../composables'
import SectionHeader from './SectionHeader.vue'
import ActiveArrowBar from './ActiveArrowBar.vue'
import AvatarRow from './AvatarRow.vue'
import type { AvatarCardData } from '../../types'

const { copy } = useThemeCopy()

const activeIndex = ref(2)

const cards: AvatarCardData[] = [
  {
    index: 0,
    label: 'ID_01',
    scribbleFrames: [
      'M 50 25 C 35 20 30 50 50 60 C 65 65 30 30 45 40 C 55 50 65 35 40 30 C 25 25 35 65 55 55 C 65 45 55 35 50 45 C 45 55 35 45 48 38 C 55 32 60 48 42 50 C 35 50 42 35 50 35 C 58 35 60 52 48 55 C 40 58 32 40 45 32 C 55 25 65 55 50 65 C 35 70 25 45 42 38',
      'M 46 22 C 28 18 26 54 49 63 C 66 69 24 34 43 43 C 58 52 69 31 38 28 C 21 26 30 68 57 59 C 70 48 58 31 49 42 C 41 57 31 44 46 35 C 58 28 63 52 39 53 C 31 54 41 31 51 31 C 62 31 63 55 47 59 C 35 61 26 39 42 29 C 59 21 68 60 48 69 C 31 73 22 47 39 35',
      'M 54 28 C 42 16 22 47 46 58 C 68 70 35 24 50 36 C 63 47 69 40 44 34 C 27 31 42 63 59 51 C 70 42 53 39 47 48 C 39 59 39 41 52 34 C 61 29 58 49 45 47 C 37 46 46 38 53 39 C 61 40 58 56 45 56 C 33 55 34 36 47 30 C 58 24 67 49 54 63 C 41 71 28 50 46 40',
    ],
  },
  {
    index: 1,
    label: 'ID_02',
    scribbleFrames: [
      'M 30 35 C 20 50 50 70 65 50 C 80 30 30 20 40 55 C 45 70 70 65 60 40 C 50 20 20 40 35 60 C 45 75 75 50 50 30 C 35 15 25 50 48 58 C 65 65 75 35 55 35 C 35 35 30 60 42 62 C 55 64 68 45 50 40 C 35 35 40 55 52 50 C 60 45 55 30 45 30',
      'M 26 38 C 16 54 47 73 63 54 C 77 33 26 19 38 58 C 44 74 73 68 58 38 C 48 17 18 43 34 63 C 47 78 78 53 52 27 C 34 13 22 52 47 61 C 66 69 77 32 54 31 C 34 31 28 63 40 66 C 55 68 70 47 49 37 C 33 30 39 58 53 54 C 62 48 58 28 43 27',
      'M 34 31 C 23 45 54 67 67 46 C 78 28 34 24 43 52 C 48 66 67 61 61 43 C 54 25 24 36 38 56 C 48 69 72 48 48 33 C 32 19 28 47 50 55 C 63 60 71 38 57 38 C 39 39 33 58 44 58 C 56 58 66 44 52 43 C 40 42 44 52 54 48 C 61 44 52 33 45 33',
    ],
  },
  {
    index: 2,
    label: 'ID_TARGET',
    scribbleFrames: [
      'M 45 25 C 25 15 20 60 45 70 C 65 75 80 40 60 30 C 40 20 15 50 35 65 C 50 75 75 55 70 35 C 65 15 30 25 40 55 C 45 70 70 70 75 45 C 80 20 45 10 30 40 C 20 60 50 80 62 60 C 70 45 60 25 50 30 C 40 35 35 65 52 68 C 65 70 70 45 58 40 C 45 35 40 55 48 60 C 55 65 62 50 58 45 C 54 40 46 42 45 50 C 44 58 56 60 58 52 C 60 45 50 40 45 45 C 40 50 48 58 52 52 C 55 46 50 42 47 43 L 53 57 C 42 55 38 45 46 38',
      'M 38 20 C 16 18 12 66 40 76 C 69 82 86 35 59 24 C 33 15 10 52 30 71 C 52 82 79 60 76 29 C 73 11 23 20 36 60 C 42 77 74 76 80 40 C 86 15 42 7 24 37 C 12 64 57 86 68 58 C 76 39 55 20 45 24 C 31 30 28 70 53 73 C 71 74 76 38 56 34 C 40 30 34 59 46 66 C 61 73 69 52 61 42 C 56 36 42 38 40 50 C 38 63 58 67 64 54 C 69 43 52 34 42 40 C 34 47 45 63 55 56 C 63 49 55 39 49 37 L 57 63 C 39 62 31 47 41 33',
      'M 52 31 C 34 10 16 48 41 60 C 71 78 88 50 69 26 C 49 8 17 38 27 58 C 39 79 82 69 73 42 C 67 18 41 28 49 52 C 56 74 81 67 68 37 C 58 15 27 18 34 46 C 40 69 60 82 70 58 C 79 37 68 18 56 22 C 43 27 42 58 59 63 C 75 68 78 50 64 39 C 50 29 34 43 41 58 C 49 72 66 66 65 49 C 64 34 53 32 49 42 C 45 53 55 63 63 58 C 71 52 66 38 55 36 L 49 68 C 37 61 32 46 45 29',
    ],
  },
  {
    index: 3,
    label: 'ID_03',
    scribbleFrames: [
      'M 35 40 C 30 50 45 65 55 60 C 65 55 60 35 48 35 C 35 35 30 50 40 58 C 50 65 70 55 60 45 C 50 35 35 45 42 55 C 48 62 58 58 55 48 C 52 38 42 42 45 50 C 48 58 55 52 50 46 C 45 40 42 50 46 52 C 50 54 52 48 48 48',
      'M 31 43 C 25 53 43 68 58 62 C 70 57 64 32 46 32 C 31 33 26 53 38 61 C 52 69 73 57 58 42 C 45 30 30 47 41 58 C 50 67 61 60 58 46 C 55 35 39 39 42 52 C 45 62 58 57 52 43 C 47 34 40 47 44 56 C 48 60 55 50 50 45',
      'M 39 36 C 35 48 49 61 57 57 C 65 53 57 31 49 31 C 39 31 35 47 44 55 C 53 62 66 53 63 44 C 59 34 39 42 46 52 C 52 59 60 55 58 47 C 56 39 46 39 47 47 C 48 55 55 54 52 47 C 50 41 44 46 47 50 C 50 54 54 50 50 46',
    ],
  },
  {
    index: 4,
    label: 'TARGET_PIC',
    scribbleFrames: [
      'M 28 26 C 18 44 30 72 52 72 C 72 72 83 49 72 31 C 64 18 45 15 35 24 C 27 31 25 46 35 56 C 44 65 58 65 66 55 C 73 46 70 32 58 28 C 48 24 39 29 38 39 C 37 47 42 55 50 57 C 58 59 64 54 64 47 C 64 40 58 35 51 35 C 45 35 41 40 42 46',
      'M 23 24 C 13 48 28 78 55 76 C 78 75 87 47 74 27 C 63 11 37 11 26 24 C 17 35 19 52 31 64 C 43 75 63 75 73 63 C 82 52 79 33 65 24 C 52 17 38 22 35 35 C 33 48 40 60 52 63 C 65 65 73 57 73 46 C 73 35 64 27 52 28 C 41 29 34 37 35 48',
      'M 31 19 C 16 34 19 68 46 78 C 71 87 91 62 82 34 C 76 15 54 8 38 15 C 24 22 19 39 25 55 C 31 69 45 78 60 75 C 74 72 82 58 80 45 C 78 33 69 24 57 22 C 45 20 35 26 32 37 C 29 48 34 61 45 66 C 57 71 70 66 74 55 C 78 43 71 31 59 29',
    ],
    isImageFilled: true,
  },
]
</script>

<style scoped>
.section-cards {
  margin-bottom: 60px;
  position: relative;
}
.section-cards::before {
  content: '02';
  position: absolute;
  top: -15px;
  right: 30px;
  font-size: 110px;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--border-alpha);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}
.sketch-panel-container {
  background-color: var(--card-bg);
  border: 2.5px solid var(--card-border);
  padding: 40px 30px;
  position: relative;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
.sketch-panel-container::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: -8px;
  bottom: -8px;
  background: repeating-linear-gradient(-45deg,
    var(--border-alpha) 0px,
    var(--border-alpha) 1.5px,
    transparent 1.5px,
    transparent 5px);
  border: 1.8px solid var(--card-border);
  border-radius: inherit;
  z-index: -1;
  pointer-events: none;
}
.panel-note {
  position: absolute;
  top: 14px;
  right: 25px;
  font-size: 16px;
  transform: rotate(3deg);
  z-index: 10;
}
.panel-lyrics {
  font-size: 28px;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 0.15em;
  opacity: 0.95;
}
</style>