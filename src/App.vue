<template>
  <div>
    <GlobalOverlays />
    <div class="app-container">
      <PlaygroundSidebar
        :theme="theme"
        :effects="effects"
        :footer-content="playgroundSidebarFooter"
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
import type { Theme, EffectsState, SidebarFooterContent } from './types'
import { useTheme } from './composables/useTheme'
import { useEffects } from './composables/useEffects'
import { useI18n } from './composables/useI18n'
import GlobalOverlays from './components/GlobalOverlays/GlobalOverlays.vue'
import PlaygroundSidebar from './components/Sidebar/PlaygroundSidebar.vue'
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
const playgroundSidebarFooter: SidebarFooterContent = {
  copyright: '© 2026 DAIYOSEI.',
  tagline: 'Build with Gemini,GPT,Deepseek.',
}

function onThemeChange(value: Theme) {
  setTheme(value)
}

function onEffectsChange(value: EffectsState) {
  for (const key of ['grain', 'scanlines', 'glitch'] as const) {
    toggleEffect(key, value[key])
  }
}
</script>
