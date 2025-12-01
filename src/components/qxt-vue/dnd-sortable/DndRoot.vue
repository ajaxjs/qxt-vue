<script setup lang="ts">
import { nextTick, useTemplateRef, useId } from 'vue';
import { useDndBus } from './dnd-hooks';

const props = defineProps({
    dndId: String
});

const dndName = props.dndId || useId();

// Dnd总线
const dndBus = useDndBus(dndName);

// DndRoot
const fromRoot = useTemplateRef('rootRef');

// Start
const handleDragStart = (e: DragEvent) => {
    if (!fromRoot.value || !e.dataTransfer) return;
    e.dataTransfer.effectAllowed = 'move';
    dndBus.fromItem = e.target as HTMLElement;
    nextTick(() => dndBus.fromItem.classList.add('dragging'))
}
// Enter
const handleDragEnter = (e: DragEvent) => {
    const target = (e.target as HTMLElement).closest('.dnd-item') as HTMLElement;
    console.log('-enter',e);
    
    if (!target || dndBus.fromItem === target || target === dndBus.toItem) return;
    if (dndName !== dndBus.dndName) return;
    dndBus.toItem = target;
}
// Over
const handleDragOver = (e: DragEvent) => {
    // 不同组
    if (!dndBus.fromItem) return;
    e.preventDefault();
    const target = (e.target as HTMLElement).closest('.dnd-item') as HTMLElement;
    if (dndBus.fromItem === target || !target) return;

    if (dndBus.toIndex > dndBus.fromIndex) {
        dndBus.toRoot.insertBefore(dndBus.fromItem, dndBus.toItem.nextSibling);
    } else {
        dndBus.toRoot.insertBefore(dndBus.fromItem, dndBus.toItem);
    }
}
// Leave
const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    if (!e.target) dndBus.toItem = null;
}
// Drop
const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    console.log('1----drop', dndBus.fromIndex, dndBus.toIndex);
}
// End
const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    if (!dndBus.fromItem) return;
    dndBus.fromItem.classList.remove('dragging');
    dndBus.fromItem = null;
}
</script>

<template>
    <div ref="rootRef" class="dnd-root" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.list-move {
    transition: transform .3s ease;
}

.list-enter-active,
.list-leave-active {
    transition: all .3s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>