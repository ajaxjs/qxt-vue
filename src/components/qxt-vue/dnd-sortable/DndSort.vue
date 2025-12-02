<script setup lang="ts">
import { ref, useId } from 'vue';
import DndRoot from './DndRoot.vue';
import DndItem from './DndItem.vue';

type TreeNode = {
    children?: TreeNode[],
    [key: string]: any
}
type ITreeProps = {
    data: TreeNode[],
    dndId?: string,
    depth?: number,
}
const { dndId, depth = 0 } = defineProps<ITreeProps>()
const dndName = ref(dndId || useId());


interface DndSlotProps {
    item: any;
}
defineSlots<{
    default: (props: DndSlotProps) => any;
}>();
</script>

<template>
    <DndRoot :dnd-id="dndName" :depth="depth" :data="data">
        <DndItem v-for="(item, i) in data" :key="i" :item="item">
            <slot :item="item"></slot>
            <DndSort v-if="Array.isArray(item.children)" :data="item.children" :dnd-id="dndName" :depth="depth + 1">
                <template #default="prop">
                    <slot :item="prop.item"></slot>
                </template>
            </DndSort>
        </DndItem>
    </DndRoot>
</template>

<style lang="scss" scoped></style>