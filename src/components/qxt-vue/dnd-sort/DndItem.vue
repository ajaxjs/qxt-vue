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
    dndItem.removeAttribute('draggable');
}
</script>

<template>
    <div class="dnd-item" @dragend="handleMouseUp" @mouseup="handleMouseUp">
        <div v-if="$slots.handle" class="dnd-item-handle" @mousedown="handleMouseDown">
            <slot name="handle" :item="item"></slot>
        </div>
        <slot :item="item" />
    </div>
</template>

<style lang="scss" scoped></style>