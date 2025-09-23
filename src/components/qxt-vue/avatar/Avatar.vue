<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
defineProps<{
  src: string,
  alt?: string,
}>()
</script>

<template>
  <Avatar>
    <slot></slot>
    <AvatarImage :src="src" :alt="alt" />
    <AvatarFallback>
      <slot v-if="$slots.fallback" name="fallback"></slot>
      <span v-else>{{ alt }}</span>
    </AvatarFallback>
  </Avatar>
</template>