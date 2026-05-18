<template>
  <div class="daiyo-upload">
    <div class="daiyo-upload-head font-tech">
      <span>{{ label }}</span>
      <span class="daiyo-upload-status">{{ files.length ? `${files.length} FILES` : 'EMPTY' }}</span>
    </div>
    <label class="daiyo-upload-zone">
      <input class="daiyo-upload-input" type="file" :multiple="multiple" @change="onChange" />
      <div class="daiyo-upload-text font-handwritten">Drop or click to upload</div>
    </label>
    <ul v-if="files.length" class="daiyo-upload-list font-tech">
      <li v-for="file in files" :key="file.name">{{ file.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  label?: string
  multiple?: boolean
}>(), {
  label: 'FILE UPLOAD',
  multiple: false,
})

const emit = defineEmits<{
  change: [files: File[]]
}>()

const files = ref<File[]>([])

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  files.value = Array.from(target.files || [])
  emit('change', files.value)
}
</script>

<style scoped>
.daiyo-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.daiyo-upload-head {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-gray);
}
.daiyo-upload-status {
  color: var(--accent-orange);
}
.daiyo-upload-zone {
  border: 2px dashed var(--card-border);
  border-radius: 14px 22px 10px 26px / 20px 10px 24px 14px;
  padding: 18px 12px;
  background: var(--card-bg);
  cursor: pointer;
  text-align: center;
}
.daiyo-upload-input {
  display: none;
}
.daiyo-upload-text {
  color: var(--text-primary);
  font-size: 17px;
}
.daiyo-upload-list {
  margin: 0;
  padding-left: 16px;
  font-size: 9px;
  color: var(--text-primary);
}
</style>
