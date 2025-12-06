<script setup lang="ts">
// import { ref } from 'vue'
import { getEventDom } from './dnd-hook';
type DndItemProps = {
    item: any,
    dndName: string,
}

const { item } = defineProps<DndItemProps>();

const handleMouseDown = (e: MouseEvent) => {
    const { dndItem } = getEventDom(e);
    if (!dndItem) return;

    dndItem.setAttribute('draggable', 'true');
}
const handleMouseUp = (e: MouseEvent) => {
    const { dndItem } = getEventDom(e);
    if (!dndItem) return;
    dndItem.setAttribute('draggable', 'false');
}
</script>

<template>
    <div class="dnd-item">
        <div v-if="$slots.handle" class="dnd-item-handle" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
            <slot name="handle" :item="item"></slot>
        </div>
        <slot :item="item" />
    </div>
</template>

<style lang="scss" scoped></style>