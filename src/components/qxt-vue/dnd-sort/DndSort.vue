<script setup lang="ts">
import { computed, onUnmounted, useId } from 'vue';
import { useDndBus } from './dnd-hook';
import DndRoot from './DndRoot.vue'
import DndItem from './DndItem.vue'

type IDndRootProps = {
    dndName?: string;
    dndPath?: number[];
    childKey?: string;
    noSort?: boolean;
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
const dndBus = useDndBus(dndName);
const childKey = props.childKey || 'children';

const rootAttrs = computed(() => {
    const { noSort, rootClass, separatorStyle, separatorClass } = props;
    return {
        dndName,
        dndPath,
        noSort,
        class: rootClass,
        separatorClass,
        separatorStyle,
    }
})

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
    <DndRoot v-model="list" v-bind="rootAttrs" @change="handleChange">
        <DndItem v-for="(item, i) in list" :key="i" :item="item" :data-key="i" :dnd-name="dndName">
            <slot :item="item"></slot>
            <DndSort v-if="Array.isArray(item[childKey])" v-model="item[childKey]" v-bind="rootAttrs"
                :dnd-path="[...dndPath, i]" @change="handleChange">
                <template #default="{ item }">
                    <slot :item="item"></slot>
                </template>
            </DndSort>
        </DndItem>
    </DndRoot>
</template>

<style lang="scss" scoped></style>