<script setup lang="ts">
import { useId, computed } from 'vue';
import DndRoot from './DndRoot.vue';
import { DndProps } from './dnd-props';

const props = defineProps(DndProps)

const treeData = defineModel<any[]>({});
const groupId = useId();
const rootAttrs = computed(() => {
    const { sortable } = props
    return {
        sortable: {
            group: groupId,
            ...sortable,
        },
    }
})
</script>

<template>
    <DndRoot v-model="treeData" v-bind="rootAttrs">
        <template #handle="itemSlotProps">
            <slot name="handle" v-bind="itemSlotProps"></slot>
        </template>
    </DndRoot>
</template>

<style lang="scss" scoped></style>