import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeCopy } from './useThemeCopy'

const signalNum = ref(99.9)
const frogsNum = ref(9)
const moodIndex = ref(0)

export function useHud() {
  const { copy } = useThemeCopy()
  let intervalId: ReturnType<typeof setInterval> | null = null

  function update() {
    signalNum.value = Number((99 + Math.random() * 0.9).toFixed(1))
    frogsNum.value = Math.floor(5 + Math.random() * 14)
    
    const moodsList = copy.value.sidebar.hud.moodsList
    moodIndex.value = Math.floor(Math.random() * moodsList.length)
  }

  function start() {
    if (!intervalId) {
      intervalId = setInterval(update, 1200)
    }
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onMounted(() => {
    // Sync initial index with copy
    moodIndex.value = Math.floor(Math.random() * copy.value.sidebar.hud.moodsList.length)
    start()
  })
  
  onUnmounted(stop)

  const signal = computed(() => `${signalNum.value}% (${copy.value.sidebar.hud.signalSuffix})`)
  const frogs = computed(() => `${frogsNum.value}${copy.value.sidebar.hud.frogsUnit}`)
  const mood = computed(() => {
    const list = copy.value.sidebar.hud.moodsList
    return list[moodIndex.value] || list[0]
  })

  return { signal, frogs, mood }
}
