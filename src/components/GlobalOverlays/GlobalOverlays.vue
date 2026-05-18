<template>
  <div class="global-overlays">
    <svg class="noise-svg" style="display:none;">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
      </filter>
    </svg>
    <div class="grain-overlay"></div>
    <div class="scanline-overlay"></div>
    <div class="paper-pulp-overlay"></div>
    <div class="vignette-overlay"></div>
    <div class="grid-bg"></div>
  </div>
</template>

<style scoped>
/* All styles are global classes in src/styles/index.css */
</style>
