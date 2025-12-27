<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: '',
    },
    bodyClass: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <div class="card p-4 border border-gray-200 rounded-2xl m-4">
        <div class="text-lg font-bold pb-4 border-b border-gray-200">{{ title }}</div>
        <div class="py-4" :class="bodyClass">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
</style>