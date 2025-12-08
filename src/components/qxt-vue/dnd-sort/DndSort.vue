<script setup lang="ts">
import { useId } from 'vue';
//import type { IDndProps } from './type';
import { useDndBus } from './dnd-hook';
import DndRoot from './DndRoot.vue';
type ISortProps = {
    dndName?: string;
    childKey?: string;
}
const dndId = useId();
const props = defineProps<ISortProps>();
const dndName = props.dndName || dndId;
const childKey = props.childKey || 'children';

const list = defineModel<any[]>();
const rootAttrs = {
    dndPath: [] as number[],
    dndName,
}
const dndBus = useDndBus(dndName);
dndBus.childKey = childKey;
console.log('dndBus:', dndBus);


</script>

<template>
    <div class="dnd-tree">
        <DndRoot v-model="list" v-bind="rootAttrs">
            <template #default="itemSlotProps">
                <slot v-bind="itemSlotProps"></slot>
            </template>
        </DndRoot>
    </div>
</template>

<style lang="scss" scoped></style>