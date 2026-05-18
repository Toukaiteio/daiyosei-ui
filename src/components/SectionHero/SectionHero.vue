<template>
  <section class="section-hero">
    <div class="hero-layout">
      <div class="hero-left">
        <VerticalTag />
        <div :class="['handwritten-note', 'hero-note', copy.hero.handwrittenClass]">{{ copy.hero.note }}</div>
        <SerifTitleBlock
          :code="copy.hero.code"
          :title="copy.hero.title"
          :subtitle="copy.hero.subtitle"
          :title-class="copy.hero.handwrittenClass"
        />
        <ProgressBar />
      </div>
      <div class="hero-right">
        <PrintMarkers />
        <PolaroidCard :signature="copy.hero.signature" />
        <CollageCaption />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useThemeCopy } from '../../composables'
import VerticalTag from './VerticalTag.vue'
import SerifTitleBlock from './SerifTitleBlock.vue'
import ProgressBar from './ProgressBar.vue'
import PrintMarkers from './PrintMarkers.vue'
import PolaroidCard from './PolaroidCard.vue'
import CollageCaption from './CollageCaption.vue'

const { copy } = useThemeCopy()
</script>

<style scoped>
.section-hero {
  margin-bottom: 60px;
}
.hero-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
}
.hero-left {
  position: relative;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
