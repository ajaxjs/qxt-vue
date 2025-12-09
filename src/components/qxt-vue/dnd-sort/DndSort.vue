<script setup lang="ts">
import { useId } from 'vue';
// import type { IChangeResult } from './type';
// import { emit } from './dnd-item';
import { useDndBus } from './dnd-hook';
import DndRoot from './DndRoot.vue';
type ISortProps = {
    dndName?: string;
    childKey?: string;
}

const emit = defineEmits(['change']);
const rootId = useId();
const props = defineProps<ISortProps>();
const dndName = props.dndName || rootId;
const childKey = props.childKey || 'children';

const onChange = (detail: any) => {

    // console.log('---change from List:', dndBus.getSibList(from));

    emit('change', detail);
}

const list = defineModel<any[]>();
const rootAttrs = {
    dndPath: [] as number[],
    dndName,
    rootId,
    onChange,
}
const dndBus = useDndBus(dndName);
dndBus.childKey = childKey;
dndBus.treeMap.set(rootId, list.value);

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