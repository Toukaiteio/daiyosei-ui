import { ref } from 'vue'

export type Locale = 'zh' | 'ja'

const currentLocale = ref<Locale>('zh')

export function useI18n() {
  function setLocale(locale: Locale) {
    currentLocale.value = locale
    
    // Update the standard HTML document lang attribute
    document.documentElement.setAttribute('lang', locale === 'zh' ? 'zh-CN' : 'ja')
    
    // Toggle body classes for responsive font cascades
    document.body.classList.toggle('lang-zh', locale === 'zh')
    document.body.classList.toggle('lang-ja', locale === 'ja')
  }

  return {
    currentLocale,
    setLocale
  }
}
