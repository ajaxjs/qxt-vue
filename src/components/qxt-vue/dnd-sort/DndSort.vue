<script setup lang="ts">
import { computed, useId } from 'vue';
import type { IItemSlotProps } from './type'
import DndRoot from './DndRoot.vue'
import DndItem from './DndItem.vue'

type IDndRootProps = {
    dndName?: string;
    dndPath?: number[];
    childKey?: string;
    noSort?: boolean;
    depth?: number;
    rootClass?: string;
    separatorClass?: string;
    separatorStyle?: string;
}
const props = defineProps<IDndRootProps>();
const emit = defineEmits(['change']);

const list = defineModel<any[]>();
const rootId = useId();
const dndName = props.dndName || rootId;
const dndPath = props.dndPath || [];
const childKey = props.childKey || 'children';
const depth = props.depth || 0;

const rootAttrs = computed(() => {
    const { noSort, rootClass, separatorStyle, separatorClass } = props;
    return {
        dndName,
        dndPath,
        noSort,
        childKey,
        listId: rootId,
        class: rootClass,
        separatorClass,
        separatorStyle,
    }
})

const handleChange = (detail: any) => {
    emit('change', detail);
}

defineSlots<{
    default: (props: IItemSlotProps) => any;
}>();
</script>

<template>
    <DndRoot v-model="list" v-bind="rootAttrs" @change="handleChange" :depth="depth">
        <DndItem v-for="(item, i) in list" :key="i" :item="item">
            <template #handle="slotProps">
                <slot v-bind="slotProps"></slot>
            </template>
            <DndSort v-if="Array.isArray(item[childKey])" v-model="item[childKey]" v-bind="rootAttrs"
                :dnd-path="[...dndPath, i]" @change="handleChange" :depth="depth + 1">
                <template #default="slotProps">
                    <slot v-bind="slotProps"></slot>
                </template>
            </DndSort>
        </DndItem>
    </DndRoot>
</template>

<style lang="scss" scoped></style>