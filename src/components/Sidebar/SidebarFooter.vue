<template>
  <div class="sidebar-footer">
    <div class="footer-rule"></div>
    <div class="footer-text">{{ content.copyright }}</div>
    <div class="footer-text footer-text--sub">{{ content.tagline }}</div>
  </div>
</template>

<script setup lang="ts">
import type { SidebarFooterContent } from '../../types'

defineProps<{
  content: SidebarFooterContent
}>()
</script>

<style scoped>
.sidebar-footer .footer-rule {
  height: 1px;
  background: var(--border-alpha);
  margin-bottom: 16px;
}
.footer-text {
  font-size: 8px;
  color: var(--text-gray);
  line-height: 1.4;
}
</style>
