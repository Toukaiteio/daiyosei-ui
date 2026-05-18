<template>
  <div class="vertical-tag font-tech">
    <slot>* study diary *</slot>
  </div>
</template>

<style scoped>
.vertical-tag {
  position: absolute;
  left: 10px; top: 0;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: var(--text-gray);
  opacity: 0.6;
  font-size: 11px;
  height: 100%;
  border-right: 1.5px dashed var(--border-alpha);
  padding-right: 6px;
}
</style>
