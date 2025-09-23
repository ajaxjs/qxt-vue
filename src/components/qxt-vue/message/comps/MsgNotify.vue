<script setup>
import { computed } from 'vue';
const props = defineProps({
    type: String,
    text: String,
})
const theme = {
    notify: 'bg-gray-200/60 text-gray-500',
    error: 'bg-red-200/60 text-red-500',
    success: 'bg-green-200/60 text-green-500',
    warning: 'bg-yellow-200/60 text-yellow-500',
    info: 'bg-blue-200/60 text-blue-500',
}
const classes = computed(() => theme[props.type] || theme.notify)
</script>

<template>
    <div class="text-center">
        <div :class="classes" class="px-2 inline-block rounded-sm text-sm">
            {{ text }}
        </div>
    </div>
</template>

<style lang="scss" scoped></style>