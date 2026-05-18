import { ref } from 'vue'

export function useDialDrag(
  containerRef: HTMLElement | null,
  fillCircle: SVGPathElement | null,
  pointerLine: SVGGElement | null,
  readoutEl: HTMLElement | null,
  min: number,
  max: number,
  initialVal: number,
  unit: string
) {
  const value = ref(initialVal)
  const r = 40
  const circumference = 2 * Math.PI * r
  const minAngle = -135
  const maxAngle = 135
  const angleRange = maxAngle - minAngle

  let isDragging = false

  function renderDial(val: number) {
    val = Math.max(min, Math.min(max, val))
    value.value = val

    const percent = (val - min) / (max - min)
    const angle = minAngle + percent * angleRange

    if (pointerLine) {
      pointerLine.style.transform = `rotate(${angle}deg)`
    }

    if (fillCircle) {
      const fillPercent = percent * 0.75
      const strokeOffset = circumference * (1 - fillPercent)
      fillCircle.style.strokeDashoffset = String(strokeOffset)
      fillCircle.style.transform = `rotate(${90 + minAngle}deg)`
    }

    if (readoutEl) {
      readoutEl.textContent = `${val.toFixed(val >= 100 ? 1 : 2)} ${unit}`
    }
  }

  function handleDrag(clientX: number, clientY: number) {
    if (!containerRef) return
    const rect = containerRef.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    let angle = Math.atan2(dx, -dy) * (180 / Math.PI)

    if (angle > 135) angle = 135
    else if (angle < -135) angle = -135

    const percent = (angle - minAngle) / angleRange
    const val = min + percent * (max - min)
    renderDial(val)
  }

  function onMouseDown(e: MouseEvent) {
    isDragging = true
    document.body.style.cursor = 'grabbing'
    handleDrag(e.clientX, e.clientY)
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return
    handleDrag(e.clientX, e.clientY)
  }

  function onMouseUp() {
    if (isDragging) {
      isDragging = false
      document.body.style.cursor = 'default'
    }
  }

  function onTouchStart(e: TouchEvent) {
    isDragging = true
    const touch = e.touches[0]
    handleDrag(touch.clientX, touch.clientY)
    e.preventDefault()
  }

  function onTouchMove(e: TouchEvent) {
    if (!isDragging) return
    const touch = e.touches[0]
    handleDrag(touch.clientX, touch.clientY)
  }

  function onTouchEnd() {
    isDragging = false
  }

  function init() {
    if (fillCircle) {
      fillCircle.style.strokeDasharray = String(circumference)
    }
    renderDial(initialVal)

    containerRef?.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    containerRef?.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }

  function destroy() {
    containerRef?.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    containerRef?.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
  }

  return { value, renderDial, init, destroy }
}
