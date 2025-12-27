<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue';
import type { IItemSlotProps } from './type';
import { DndProps } from './dnd-props';
import DndItem from './DndItem.vue';
import Sortable from 'sortablejs';


const props = defineProps({
    ...DndProps,
    depth: {
        type: Number,
        default: 0
    }
})
const tree = defineModel<any[]>({});
const itemRef = useTemplateRef<HTMLElement>('itemRef');
onMounted(() => {

    if (itemRef.value) {
        const sortable = Sortable.create(itemRef.value, {
            animation: 150,
            ...props.sortable
        });
        console.log(sortable);
        
    }
})

const itemAttrs = computed(() => ({
    depth: props.depth + 1
}))

defineSlots<{
    handle: (props: IItemSlotProps) => any;
}>();
</script>

<template>
    <div ref="itemRef" class="dnd-root pl-5">
        <DndItem v-for="(vo, i) in tree" :key="i" :item="vo" v-bind="itemAttrs">
            <template #handle="itemSlotProps">
                <slot name="handle" v-bind="itemSlotProps"></slot>
            </template>
        </DndItem>
    </div>

</template>

<style lang="scss" scoped></style>