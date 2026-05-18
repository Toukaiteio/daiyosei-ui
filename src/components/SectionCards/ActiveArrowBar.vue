<template>
  <div class="active-arrow-bar">
    <div class="active-arrow-pointer">▼</div>
    <div class="horizontal-line"></div>
  </div>
</template>

<style scoped>
.active-arrow-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.active-arrow-pointer {
  color: var(--accent-orange);
  font-size: 14px;
  margin-bottom: 6px;
  animation: pointer-bounce 2s infinite ease-in-out alternate;
}
@keyframes pointer-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}
.horizontal-line {
  width: 80%;
  height: 1px;
  background-color: var(--border-alpha);
}
</style>
