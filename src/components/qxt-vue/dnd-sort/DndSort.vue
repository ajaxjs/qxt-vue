<script setup lang="ts">
import { useId, computed } from 'vue';
import { useDndBus } from './dnd-hook';
import DndRoot from './DndRoot.vue';
type ISortProps = {
    dndName?: string;
    childKey?: string;
    rootClass?: string;
    itemClass?: string;
    manualSort?: boolean;
}

const emit = defineEmits(['change']);
const rootId = useId();
const props = defineProps<ISortProps>();
const dndName = props.dndName || rootId;
const childKey = props.childKey || 'children';
// 触发Change
const onChange = (detail: any) => {
    emit('change', detail);
}

const list = defineModel<any[]>();
const rootAttrs = computed(() => {
    const { rootClass, itemClass, manualSort } = props
    return {
        dndPath: [] as number[],
        dndName,
        rootId,
        rootClass,
        itemClass,
        manualSort,
        onChange,
    }
})
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

<style lang="scss">
.dnd-separator {
    position: relative;
    height: 0;
    z-index: 1;
}

.dnd-separator::after {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #3288faa1;
    border-radius: 2px;
    box-shadow: 0 0 5px #3288faa1;
}
</style>