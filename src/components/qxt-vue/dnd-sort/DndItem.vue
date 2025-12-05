<script setup lang="ts">
// import { ref } from 'vue'
import { useDndBus, getEventDom } from './dnd-hook';
type DndItemProps = {
    item: any,
    dndName: string,
}

const { item, dndName } = defineProps<DndItemProps>();
const dndBus = useDndBus(dndName);
dndBus.index += 1;

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
    <div class="dnd-item" :dnd-index="dndBus.index">
        <div v-if="$slots.handle" class="dnd-item-handle" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
            <slot name="handle" :item="item"></slot>
        </div>
        <slot :item="item" />
    </div>
</template>

<style lang="scss" scoped></style>