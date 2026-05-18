<template>
  <div class="sketchbook-progress-layout">
    <!-- Header Row: Lined Label & Tape Sticker Note -->
    <div class="progress-header-row">
      <div class="progress-bar-title font-serif">
        <span class="pencil-lead-icon">✏️</span>
        {{ copy.hero.progressLabel }}
      </div>
      <div class="washi-tape-note font-handwritten">
        {{ copy.hero.progressScale }}
      </div>
    </div>
    
    <!-- Tactile Technical Drafting Ruler Container -->
    <div class="ruler-container">
      <!-- Drafting Tick Marks along the top edge of the ruler -->
      <div class="ruler-ticks">
        <div 
          v-for="tick in ticks" 
          :key="tick.value" 
          class="ruler-tick" 
          :class="{ 'tick-major': tick.isMajor }"
        >
          <!-- Major ticks show handwritten numbers (0%, 25%, 50%, 75%, 100%) -->
          <span v-if="tick.isMajor" class="tick-number font-handwritten">{{ tick.value }}%</span>
        </div>
      </div>
      
      <!-- Ruler Color Fill Track -->
      <div class="ruler-track">
        <!-- Messy Hand-drawn Crayon Colored Highlighter Fill -->
        <div class="crayon-fill" :style="{ width: `${progress}%` }"></div>
        
        <!-- Sliding Flag Pointer pointing to current dynamic value -->
        <div class="ruler-pointer" :style="{ left: `${progress}%` }">
          <div class="pointer-card">
            <span class="pointer-arrow">▲</span>
            <span class="pointer-val font-handwritten">{{ Math.round(progress) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeCopy } from '../../composables'

const { copy } = useThemeCopy()

const progress = ref(72)
let direction = 1
let intervalId: number | null = null

// Generate 21 ticks from 0 to 100 in steps of 5
const ticks = Array.from({ length: 21 }, (_, i) => {
  const value = i * 5
  return {
    value,
    isMajor: value % 25 === 0 // Long ticks with labels at 0%, 25%, 50%, 75%, 100%
  }
})

onMounted(() => {
  intervalId = window.setInterval(() => {
    const delta = Math.random() * 1 + 0.3
    const next = progress.value + delta * direction
    if (next > 92) direction = -1
    else if (next < 25) direction = 1
    progress.value += delta * direction
  }, 800)
})

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId)
})
</script>

<style scoped>
.sketchbook-progress-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
  position: relative;
}

/* Header Area styling */
.progress-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.progress-bar-title {
  font-size: 13px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  text-transform: uppercase;
}
.pencil-lead-icon {
  font-size: 13px;
  filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.15));
}

/* Washi Tape Style Theme Label */
.washi-tape-note {
  background-color: var(--bg-secondary);
  border: 1.5px dashed var(--card-border);
  color: var(--text-primary);
  padding: 4px 14px;
  font-size: 12px;
  font-weight: 700;
  transform: rotate(2deg);
  box-shadow: 2px 2px 0px var(--border-alpha);
  border-radius: 4px 8px 3px 6px / 6px 3px 8px 4px;
  position: relative;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* School Notebook Ruler Container */
.ruler-container {
  background-color: var(--bg-secondary);
  border: 2px solid var(--text-primary);
  border-radius: 6px 8px 5px 7px / 7px 5px 8px 6px; /* Sketchy hand-sketched boundary */
  box-shadow: 3px 3px 0px var(--text-primary);
  padding: 24px 16px 14px 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Ruler Ticks (Drafting Scale) */
.ruler-ticks {
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}
.ruler-tick {
  width: 1px;
  height: 6px;
  background-color: var(--text-gray);
  opacity: 0.4;
  position: relative;
}
.ruler-tick.tick-major {
  width: 1.5px;
  height: 11px;
  background-color: var(--text-primary);
  opacity: 0.85;
}
.tick-number {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: 700;
  color: var(--text-gray);
  white-space: nowrap;
}

/* Ruler highlighter fill rail track */
.ruler-track {
  height: 24px;
  width: 100%;
  background-color: var(--bg-primary);
  border: 2px solid var(--text-primary);
  border-radius: 4px 6px 3px 5px / 5px 3px 6px 4px;
  position: relative;
  overflow: visible; /* Pointer should spill outside track */
  box-shadow: inset 1px 1px 3px rgba(4, 8, 12, 0.08);
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Messy Crayon/Pencil colored scribble highlighter fill */
.crayon-fill {
  height: 100%;
  background-color: var(--accent-orange);
  /* Pencil/crayon diagonal cross-hatching */
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.18) 3px,
    rgba(255, 255, 255, 0.18) 6px
  );
  border-radius: 2px 6px 3px 5px / 5px 3px 6px 2px;
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);
  animation: crayon-shiver 0.3s steps(2) infinite;
}

@keyframes crayon-shiver {
  0% { transform: skewX(0deg) scaleY(1); }
  50% { transform: skewX(-0.8deg) scaleY(0.98); }
  100% { transform: skewX(0.8deg) scaleY(1.02); }
}

/* Floating pointer pin label sliding along track */
.ruler-pointer {
  position: absolute;
  bottom: -22px; /* Float below the ruler boundary */
  transform: translateX(-50%);
  transition: left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  pointer-events: none;
  z-index: 5;
}
.pointer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pointer-arrow {
  font-size: 10px;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: -3px;
  filter: drop-shadow(0px -1px 0px var(--text-primary));
}
.pointer-val {
  background-color: var(--accent-orange);
  color: var(--bg-secondary);
  border: 1.5px solid var(--text-primary);
  padding: 1px 6px;
  font-size: 11px;
  font-weight: bold;
  border-radius: 4px 8px 5px 7px / 7px 5px 8px 4px;
  box-shadow: 1.5px 1.5px 0px var(--text-primary);
  white-space: nowrap;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
