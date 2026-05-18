<template>
  <div class="colorpicker-container">
    <!-- Washi Tape sticker holding the memo note (matches hero PolaroidCard style) -->
    <div class="washi-tape-sticker"></div>

    <!-- Header: Elegant Title & Page Sticker Tabs -->
    <div class="colorpicker-header">
      <div class="colorpicker-title font-handwritten">
        <span class="palette-icon">🎨</span>
        ARTIST PAINTBOX
      </div>
      <div class="colorpicker-tabs font-handwritten">
        <button
          type="button"
          class="tab-btn"
          :class="{ 'tab-btn--active': mode === 'palette' }"
          @click="mode = 'palette'"
        >
          PANS
        </button>
        <button
          type="button"
          class="tab-btn"
          :class="{ 'tab-btn--active': mode === 'wheel' }"
          @click="mode = 'wheel'"
        >
          MIXER
        </button>
      </div>
    </div>

    <!-- Active Color Splat Display: Organic wiggling watercolor drop -->
    <div class="colorpicker-preview-row">
      <div class="water-drop-wrapper">
        <div 
          class="water-drop" 
          :key="modelValue" 
          :style="{ backgroundColor: modelValue, boxShadow: `0 4px 10px ${modelValue}40` }"
        >
          <div class="water-drop-reflection"></div>
        </div>
      </div>
      <div class="colorpicker-hex font-handwritten">
        {{ modelValue.toUpperCase() }}
      </div>
    </div>

    <!-- Mode A: Watercolor Pans (Classic palette cups) -->
    <div v-if="mode === 'palette'" class="pans-grid">
      <button
        v-for="c in palette"
        :key="c"
        class="paint-pan-cup"
        :class="{ 'paint-pan-cup--active': modelValue === c }"
        :aria-label="`Select color ${c}`"
        @click="selectColor(c)"
      >
        <div class="paint-dollop" :style="{ backgroundColor: c }"></div>
      </button>
    </div>

    <!-- Mode B: Wooden Painter's Palette Mixer -->
    <div v-if="mode === 'wheel'" class="wooden-palette">
      <!-- Ergonomic Thumb hole on the wooden board -->
      <div class="palette-thumbhole"></div>
      
      <!-- Conic gradient color mixing ring -->
      <label class="wood-wheel-frame" :style="{ '--current-color': modelValue }">
        <input
          class="wood-wheel-input"
          type="color"
          :value="modelValue"
          aria-label="Mix custom color"
          @input="onWheelColorInput"
        />
        <div class="mixer-center-indicator" :style="{ backgroundColor: modelValue }"></div>
      </label>
      
      <div class="wood-picker-hint font-handwritten">
        Dab on the palette to mix a custom shade
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  colors?: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const defaultColors = [
  '#c85a5a', '#e8a838', '#4a90c4', '#62b5ba',
  '#7cb87a', '#b87aa8', '#e07a7a', '#d4b06a',
  '#6a8aa8', '#8ab8a8', '#c8a0b0', '#2a3b4c',
]

const mode = ref<'palette' | 'wheel'>('palette')
const palette = props.colors ?? defaultColors

function selectColor(c: string) {
  emit('update:modelValue', c)
}

function onWheelColorInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<style scoped>
/* Outer student paper memo note container — torn from a sketchbook page */
.colorpicker-container {
  border: 2px solid var(--text-primary);
  /* Highly irregular sketched outline — each corner cut differently, like hand-drawn */
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  padding: 28px 18px 22px 24px;
  background-color: var(--bg-secondary);
  box-shadow: 3px 4px 0px var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  transform: rotate(-1deg);
  margin-top: 10px;
}

/* Washi Tape sticker — jagged cut edges matching hero PolaroidCard style */
.washi-tape-sticker {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%) rotate(-6deg);
  width: 120px;
  height: 28px;
  background-color: rgba(79, 121, 163, 0.25);
  border: 1px dashed rgba(79, 121, 163, 0.4);
  backdrop-filter: blur(1.5px);
  z-index: 10;
  pointer-events: none;
  clip-path: polygon(
    0% 12%, 4% 0%, 96% 0%, 100% 8%,
    98% 50%, 100% 90%, 96% 100%, 4% 98%,
    0% 88%, 2% 48%
  );
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.theme-dark .washi-tape-sticker {
  background-color: rgba(184, 163, 125, 0.3);
  border-color: rgba(184, 163, 125, 0.5);
}

.colorpicker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--border-alpha);
  padding-bottom: 12px;
}

.colorpicker-title {
  font-size: 13px;
  font-weight: 900;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.02em;
}
.palette-icon {
  font-size: 14px;
}

/* Tab button styled as masking tape/sticky labels */
.colorpicker-tabs {
  display: flex;
  gap: 8px;
}
.tab-btn {
  border: 1.5px solid var(--text-primary);
  background: var(--bg-secondary);
  color: var(--text-gray);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; /* Sketched label */
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--text-primary);
  transition: all 0.2s ease;
}
.tab-btn:hover {
  color: var(--text-primary);
  transform: translate(-0.5px, -0.5px);
  box-shadow: 2px 2px 0px var(--text-primary);
}
.tab-btn--active {
  color: var(--bg-secondary);
  background-color: var(--accent-orange);
  border-color: var(--text-primary);
  box-shadow: 1px 1px 0px var(--text-primary);
}
.tab-btn--active:hover {
  color: var(--bg-secondary);
  box-shadow: 1px 1px 0px var(--text-primary);
  transform: none;
}

/* Organic wet watercolor drop display */
.colorpicker-preview-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.water-drop-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.water-drop {
  width: 26px;
  height: 26px;
  /* Organic fluid drop shape */
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  border: 2px solid var(--text-primary);
  position: relative;
  animation: drop-wobble 2.5s ease-in-out infinite alternate,
             drop-spawn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
}

.water-drop-reflection {
  position: absolute;
  top: 3px;
  left: 5px;
  width: 7px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: rotate(-30deg);
}

@keyframes drop-wobble {
  0% { transform: rotate(0deg) scale(1); border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
  50% { transform: rotate(10deg) scale(1.04); border-radius: 55% 45% 60% 40% / 45% 55% 45% 55%; }
  100% { transform: rotate(-8deg) scale(0.96); border-radius: 65% 35% 75% 25% / 55% 65% 35% 45%; }
}
@keyframes drop-spawn {
  0% { transform: scale(0.3) rotate(-40deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.colorpicker-hex {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
  opacity: 0.95;
}

/* Watercolor paint pans grid */
.pans-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.paint-pan-cup {
  aspect-ratio: 1;
  background-color: var(--bg-secondary);
  border: 1.5px solid var(--text-primary);
  /* Hand-sketched irregular cup outline */
  border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
  padding: 3px;
  cursor: pointer;
  position: relative;
  box-shadow: 1.5px 1.5px 0px var(--text-primary);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.paint-pan-cup:hover {
  transform: translateY(-2px) scale(1.08);
  box-shadow: 2px 3px 0px var(--text-primary);
  z-index: 2;
}

.paint-dollop {
  width: 100%;
  height: 100%;
  border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%;
  position: relative;
  box-shadow: inset 1px 1px 2px rgba(4, 8, 12, 0.15);
}



/* Active pan highlights with a physical drop shadow and double border */
.paint-pan-cup--active {
  transform: translateY(-3px) scale(1.12);
  border-color: var(--text-primary);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1.5px var(--bg-secondary), 0 0 0 3px var(--accent-orange);
  z-index: 2;
}
.paint-pan-cup--active:hover {
  transform: translateY(-3px) scale(1.12);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1.5px var(--bg-secondary), 0 0 0 3px var(--accent-orange);
}

/* Classical Wooden Kidney-shaped Painter's Palette Mixer */
.wooden-palette {
  position: relative;
  background-color: #e9c8a7; /* Warm natural oak wood tone */
  border: 2px solid var(--text-primary);
  border-radius: 65% 45% 60% 50% / 50% 60% 45% 55%; /* Curved organic board cut */
  box-shadow: 3.5px 3.5px 0px var(--text-primary);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.theme-dark .wooden-palette {
  background-color: #513e2f; /* Deep dark mahogany board */
  border-color: var(--text-primary);
}

/* Ergonomic Thumbhole showing app background through the wood board */
.palette-thumbhole {
  width: 22px;
  height: 30px;
  background-color: var(--bg-primary); /* hole transparency */
  border: 2px solid var(--text-primary);
  border-radius: 50%;
  transform: rotate(-20deg);
  box-shadow: inset 2px 2px 4px rgba(4, 8, 12, 0.35);
  flex-shrink: 0;
  transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Circular Mixing Swatch Frame */
.wood-wheel-frame {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: conic-gradient(
    #ff4b4b 0deg,
    #ff9f1a 45deg,
    #ffe74a 90deg,
    #5be37a 140deg,
    #3cb6ff 210deg,
    #7e63ff 275deg,
    #ff56c5 330deg,
    #ff4b4b 360deg
  );
  border: 2px solid var(--text-primary);
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.25), 1.5px 1.5px 0px var(--text-primary);
  cursor: pointer;
  flex-shrink: 0;
}

/* Fully hidden input. Clicking the wheel triggers native input. */
.wood-wheel-input {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
  cursor: pointer;
}

/* Wet Mixing center dollop */
.mixer-center-indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--text-primary);
  box-shadow: 1px 2px 4px rgba(4, 8, 12, 0.18), inset 1px 1px 1.5px rgba(255, 255, 255, 0.35);
  pointer-events: none;
  position: relative;
  transition: background-color 0.15s ease;
}
.mixer-center-indicator::after {
  content: '';
  position: absolute;
  top: 3px; left: 5px; width: 8px; height: 4px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  transform: rotate(-30deg);
}

.wood-picker-hint {
  font-size: 13px;
  line-height: 1.4;
  color: #3b2c1f;
  font-weight: 700;
  max-width: 140px;
}
.theme-dark .wood-picker-hint {
  color: #e5cdb8;
}
</style>
