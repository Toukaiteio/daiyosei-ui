<template>
  <div>
    <GlobalOverlays />
    <div class="app-container">
      <Sidebar
        :theme="theme"
        :effects="effects"
        @update:theme="onThemeChange"
        @update:effects="onEffectsChange"
      />
      <main class="main-content">
        <div class="hollow-bg-text font-tech">DAIYOSEI</div>
        <TopNav />
        <SectionHero />
        <SectionCards />
        <SectionComponents />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import type { Theme, EffectsState } from './types'
import { useTheme } from './composables/useTheme'
import { useEffects } from './composables/useEffects'
import { useI18n } from './composables/useI18n'
import GlobalOverlays from './components/GlobalOverlays/GlobalOverlays.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import TopNav from './components/TopNav/TopNav.vue'
import SectionHero from './components/SectionHero/SectionHero.vue'
import SectionCards from './components/SectionCards/SectionCards.vue'
import SectionComponents from './components/SectionComponents/SectionComponents.vue'

const { currentTheme, setTheme } = useTheme()
const { effects, toggleEffect } = useEffects()
const { currentLocale, setLocale } = useI18n()

onMounted(() => {
  setLocale(currentLocale.value)
})

const theme = currentTheme

function onThemeChange(value: Theme) {
  setTheme(value)
}

function onEffectsChange(value: EffectsState) {
  for (const key of ['grain', 'scanlines', 'glitch'] as const) {
    toggleEffect(key, value[key])
  }
}
</script>
