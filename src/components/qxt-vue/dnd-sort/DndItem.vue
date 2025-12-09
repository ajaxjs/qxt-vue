<script setup lang="ts">
import { computed } from 'vue';
import DndRoot from './DndRoot.vue';
import { useDndItem, useItemAttrs } from './dnd-item';
import type { IItemProps } from './type';

const props = defineProps<IItemProps>();
const item = defineModel<any>({
    default: () => ({})
});
const {
    handleMouseDown,
    handleMouseUp,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDragDrop,
    handleDragEnd
} = useDndItem(props, item);

const itemAttrs = computed(() => {
    const { dndPath: path, dndName } = props
    return {
        path,
        dndName
    }
})

</script>

<template>
    <div class="dnd-item" @dragstart="handleDragStart" @dragenter="handleDragEnter" @dragleave="handleDragLeave"
        @dragover="handleDragOver" @drop="handleDragDrop" @dragend="handleDragEnd">
        <div class="dnd-item-handle" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
            <slot :item="item" v-bind="itemAttrs"></slot>
        </div>
        <DndRoot v-if="item.children" v-model="item.children" v-bind="useItemAttrs(props)">
            <template #default="itemSlotProps">
                <slot v-bind="itemSlotProps"></slot>
            </template>
        </DndRoot>
    </div>
</template>

<style lang="scss" scoped></style>