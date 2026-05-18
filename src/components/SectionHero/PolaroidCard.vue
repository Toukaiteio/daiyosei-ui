<template>
  <SketchbookPhotoCard :signature="signature" />
</template>

<script setup lang="ts">
import SketchbookPhotoCard from '../SketchbookPhotoCard/SketchbookPhotoCard.vue'

defineProps<{
  signature?: string
}>()
</script>
