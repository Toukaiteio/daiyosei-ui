import { ref } from 'vue'
import type { Theme } from '../types'

const currentTheme = ref<Theme>('blue')

export function useTheme() {
  function setTheme(theme: Theme) {
    currentTheme.value = theme
    document.body.classList.toggle('theme-dark', theme === 'dark')
    document.body.classList.toggle('theme-blue', theme === 'blue')
  }

  return { currentTheme, setTheme }
}
