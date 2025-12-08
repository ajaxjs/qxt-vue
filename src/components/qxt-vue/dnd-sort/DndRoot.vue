<script setup lang="ts">
import DndItem from './DndItem.vue';
import type { IDndProps, IItemSlotProps } from './type';

const props = defineProps<IDndProps>();

defineSlots<{
    default: (props: IItemSlotProps) => any;
}>();

const list = defineModel<any[]>({
    default: () => []
});
</script>

<template>
    <div class="dnd-root">
        <DndItem v-for="(,i) in list" :key="i" v-model="list[i]" v-bind="{ dndName, dndPath: [...dndPath, i] }">
            <template #default="itemSlotProps">
                <slot v-bind="itemSlotProps"></slot>
            </template>
        </DndItem>
    </div>
</template>

<style lang="scss" scoped></style>