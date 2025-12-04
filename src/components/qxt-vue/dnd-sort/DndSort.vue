<script setup lang="ts">
import { onUnmounted, useId } from 'vue';
import { useDndBus } from './dnd-hook';
import DndRoot from './DndRoot.vue'
import DndItem from './DndItem.vue'

interface IDndRootProps {
    dndName?: string;
    dndPath?: number[];
}
const props = defineProps<IDndRootProps>();
const emit = defineEmits(['change']);

const list = defineModel<any[]>();
const rootId = useId();
const dndName = props.dndName || rootId;
const dndPath = props.dndPath || [];
const dndBus = useDndBus(dndName);
//dndBus.listMap.set(rootId, list.value);

onUnmounted(() => dndBus.destroy())

const handleChange = (detail: any) => {
    emit('change', detail);
}

interface DndSlotProps {
    item: any;
}
defineSlots<{
    default: (props: DndSlotProps) => any;
}>();
</script>

<template>
    <DndRoot v-model="list" :dnd-name="dndName" :_root-id="rootId" :dnd-path="dndPath" @change="handleChange">
        <DndItem v-for="(item, i) in list" :key="i" :item="item" :data-key="i" :dnd-name="dndName">
            <slot :item="item"></slot>
            <DndSort v-if="Array.isArray(item.children)" v-model="item.children" :dnd-name="dndName"
                :dnd-path="[...dndPath, i]" @change="handleChange">
                <template #default="{ item }">
                    <slot :item="item"></slot>
                </template>
            </DndSort>
        </DndItem>
    </DndRoot>
</template>

<style lang="scss" scoped></style>