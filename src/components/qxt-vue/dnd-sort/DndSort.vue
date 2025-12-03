<script setup lang="ts">
import { useId } from 'vue';
import DndRoot from './DndRoot.vue'
import DndItem from './DndItem.vue'

interface IDndRootProps {
    dndName?: string;
}
const props = defineProps<IDndRootProps>();

const list = defineModel<any[]>();
const dndId = useId();
const dndName = props.dndName || dndId;

interface DndSlotProps {
    item: any;
}
defineSlots<{
    default: (props: DndSlotProps) => any;
}>();
</script>

<template>
    <DndRoot v-model="list" :dnd-name="dndName">
        <DndItem v-for="(item, i) in list" :key="i" :item="item" :data-key="i" :dnd-name="dndName">
            <slot :item="item"></slot>
            <DndSort v-if="Array.isArray(item.children)" v-model="item.children" :dnd-name="dndName">
                <template #default="{ item }">
                    <slot :item="item"></slot>
                </template>
            </DndSort>
        </DndItem>
    </DndRoot>
</template>

<style lang="scss" scoped></style>