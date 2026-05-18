<template>
  <button class="btn btn-crayon font-tech" @click="$emit('click')">
    <slot>SHAKE THE BOOK! ❄️</slot>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.btn {
  flex: 1;
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-primary);
  padding: 14px 20px;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 2px 3px 0px var(--border-alpha);
}
.btn-crayon {
  font-weight: 700;
  transform: rotate(1deg);
}
.btn-crayon:hover {
  background: repeating-linear-gradient(
    45deg,
    var(--accent-orange) 0px,
    var(--accent-orange) 3px,
    transparent 3px,
    transparent 6px
  );
  border-color: var(--accent-orange);
  color: var(--text-primary);
  transform: scale(1.04) rotate(-2deg);
}
.btn-crayon:active {
  background-color: var(--accent-orange);
  color: var(--bg-primary);
  transform: scale(0.97) rotate(0deg);
}
</style>