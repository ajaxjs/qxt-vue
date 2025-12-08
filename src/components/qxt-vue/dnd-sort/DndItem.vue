<script setup lang="ts">
// import { ref } from 'vue'
import { computed } from 'vue';
import { getEventDom } from './dnd-hook';
type DndItemProps = {
    item: any;
}

const { item } = defineProps<DndItemProps>();
const slotProps = computed(() => {
    return {
        item,
    }
});

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
            <slot name="handle" v-bind="slotProps"></slot>
        </div>
        <slot v-bind="slotProps" />
    </div>
</template>

<style lang="scss" scoped></style>