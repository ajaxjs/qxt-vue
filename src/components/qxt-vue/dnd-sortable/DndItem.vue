<script setup lang="ts">
</script>

<template>
    <div draggable="true" class="dnd-item">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.dragging {
    opacity: 0.5;
}
</style>