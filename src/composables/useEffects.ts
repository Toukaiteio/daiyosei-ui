import { reactive } from 'vue'
import type { EffectKey, EffectsState } from '../types'

const effects = reactive<EffectsState>({
  grain: true,
  scanlines: true,
  glitch: true,
})

let glitchTimer: ReturnType<typeof setInterval> | null = null

export function useEffects() {
  function toggleEffect(key: EffectKey, value: boolean) {
    effects[key] = value
    document.body.classList.toggle('grain-active', effects.grain)
    document.body.classList.toggle('scanlines-active', effects.scanlines)

    if (key === 'glitch') {
      if (value) {
        startGlitch()
      } else {
        stopGlitch()
      }
    }
  }

  function startGlitch() {
    if (glitchTimer) return
    const title = document.querySelector('.serif-title') as HTMLElement | null
    if (!title) return

    glitchTimer = setInterval(() => {
      if (!effects.glitch) return

      title.style.textShadow = `
        ${(Math.random() - 0.5) * 8}px ${(Math.random() - 0.5) * 4}px 0px var(--accent-orange),
        ${(Math.random() - 0.5) * -8}px ${(Math.random() - 0.5) * 4}px 0px var(--accent-yellow)
      `
      title.style.transform = `translateX(${(Math.random() - 0.5) * 4}px)`

      setTimeout(() => {
        title.style.textShadow = '2px 2px 0px rgba(0, 0, 0, 0.8)'
        title.style.transform = 'none'
      }, 150)
    }, 3000)
  }

  function stopGlitch() {
    if (glitchTimer) {
      clearInterval(glitchTimer)
      glitchTimer = null
    }
    document.querySelectorAll('.serif-title, .brand-title, .panel-lyrics').forEach(el => {
      (el as HTMLElement).style.animation = 'none'
    })
  }

  return { effects, toggleEffect }
}
