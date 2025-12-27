<script setup>
import { Button } from '@/components/ui/button';
import { routes } from '@/router/index'

</script>

<template>
  <nav class="flex gap-2 p-2 bg-amber-100 w-screen overflow-x-auto">
    <Button variant="outline" v-for="vo in routes" :key="vo.path" @click="$router.push(vo.path)">
      {{ vo.meta.title }}
    </Button>
  </nav>
  <div class="container mx-auto py-4">
    <router-view />
  </div>
</template>

<style scoped></style>
