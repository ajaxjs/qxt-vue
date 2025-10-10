<script setup lang="ts">

</script>

<template>
  <div class="bg-white p-5">
    <h1 class="test-heading">测试@apply指令</h1>
    <div class="test-button">点击我</div>
  </div>
</template>

<style lang="scss" scoped>
.test-heading {
  @apply text-2xl font-bold text-blue-500;
}

.test-button {
  @apply px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600;
}
</style>