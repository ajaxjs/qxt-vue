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
}
const props = defineProps<ITreeProps>()
const dndName = ref(props.dndId) || useId();


interface DndSlotProps {
    item: any;
}
defineSlots<{
    default: (props: DndSlotProps) => any;
}>();
</script>

<template>
    <DndRoot :dnd-id="dndName">
        <DndItem v-for="(group, i) in props.data" :key="i" :item="group">
            <slot :item="group"></slot>
            <DndSort v-if="Array.isArray(group.children)" :data="group.children" :dnd-id="dndName">
                <template #default="prop">
                    <slot :item="prop.item"></slot>
                </template>
            </DndSort>
        </DndItem>
    </DndRoot>
</template>

<style lang="scss" scoped></style>