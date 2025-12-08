<script setup lang="ts">
import { computed } from 'vue';
import DndRoot from './DndRoot.vue';
import { useDndItem } from './dnd-item';
import type { IDndProps } from './type';

const props = defineProps<IDndProps>();
const item = defineModel<any>({
    default: () => ({})
});
const { handleMouseDown, handleMouseUp, handleDragStart, handleDragEnter, handleDragLeave, handleDragDrop, handleDragEnd } = useDndItem(props,item);

const itemAttrs = computed(() => {
    const { dndPath, dndName } = props
    return {
        dndPath,
        dndName
    }
})

</script>

<template>
    <div class="dnd-item" @dragstart="handleDragStart" @dragenter="handleDragEnter" @dragleave="handleDragLeave"
        @drop="handleDragDrop" @dragend="handleDragEnd">
        <div class="dnd-item-handle" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
            <slot :item="item" v-bind="itemAttrs"></slot>
        </div>
        <DndRoot v-if="item.children" v-model="item.children" v-bind="{ dndName, dndPath }">
            <template #default="itemSlotProps">
                <slot v-bind="itemSlotProps"></slot>
            </template>
        </DndRoot>
    </div>
</template>

<style lang="scss" scoped>

</style>