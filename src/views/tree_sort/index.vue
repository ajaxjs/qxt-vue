<script setup lang="ts">
import DndTree from './parts/DndTree.vue';
import data from './data.json';

const treeData = data as any[];
</script>

<template>
    <div class="min-h-100">
        <DndTree :model-value="treeData">
            <template #handle="{ item, depth }">
                <div class="title">+{{ depth }}-{{ item.name || item.tag }}</div>
            </template>
        </DndTree>
    </div>
</template>

<style lang="scss" scoped></style>