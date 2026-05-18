import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')

export function useClock() {
  let intervalId: ReturnType<typeof setInterval> | null = null

  function update() {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    time.value = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  }

  function start() {
    update()
    intervalId = setInterval(update, 1000)
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onMounted(start)
  onUnmounted(stop)

  return { time }
}
