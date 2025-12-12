<script setup lang="ts">
import { ref, computed } from 'vue';
import DndRoot from './DndRoot.vue';
import { useDndItem, useItemAttrs } from './dnd-item';
import type { IItemProps, IExpendEvent, IExpendResult } from './type';

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

const getExpendEvent = (): IExpendEvent => {
    const { dndPath: path, rootId, dndName } = props
    return { item: item.value, path, rootId, dndName };
}

const getExpand = () => {
    if (props.expand instanceof Function) {
        return props.expand(getExpendEvent());
    }
    return props.expand;
}
const expanded = ref(getExpand())

const setExpand = (show: boolean) => {
    expanded.value = show;
    const eventResult: IExpendResult = {
        ...getExpendEvent(),
        expand: show
    }
    props.onExpand(eventResult);
}

const itemAttrs = computed(() => {
    const { dndPath: path, rootId, dndName } = props
    let expand;
    if (Array.isArray(item.value.children)) {
        expand = {
            get: () => expanded.value,
            set: (expend: boolean) => setExpand(expend),
            toggle: () => setExpand(!expanded.value)
        }
    }
    return {
        path,
        rootId,
        dndName,
        expand
    }
})


</script>

<template>
    <div class="dnd-item" :class="itemClass" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragleave="handleDragLeave" @dragover="handleDragOver" @drop="handleDragDrop" @dragend="handleDragEnd">
        <div class="dnd-item-handle" :class="handleClass" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
            <slot :item="item" v-bind="itemAttrs"></slot>
        </div>
        <DndRoot v-if="item.children" v-show="expanded" v-model="item.children" v-bind="useItemAttrs(props)">
            <template #default="itemSlotProps">
                <slot v-bind="itemSlotProps"></slot>
            </template>
        </DndRoot>
    </div>
</template>

<style lang="scss" scoped></style>