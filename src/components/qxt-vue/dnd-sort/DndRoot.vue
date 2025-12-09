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