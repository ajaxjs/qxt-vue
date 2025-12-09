<script setup lang="ts">
import DndItem from './DndItem.vue';
import type { IItemProps, IItemSlotProps } from './type';
import { useItemAttrs } from './dnd-item';

const props = defineProps<IItemProps>();

defineSlots<{
    default: (props: IItemSlotProps) => any;
}>();

const list = defineModel<any[]>({
    default: () => []
});

</script>

<template>
    <div class="dnd-root" :class="rootClass">
        <DndItem v-for="(,i) in list" :key="i" v-model="list[i]"
            v-bind="useItemAttrs(props, { dndPath: [...dndPath, i] })">
            <template #default="itemSlotProps">
                <slot v-bind="itemSlotProps"></slot>
            </template>
        </DndItem>
    </div>
</template>

<style lang="scss">
.dnd-separator{
    position: relative;
    height: 0;
    z-index: 1;
}
.dnd-separator::after{
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