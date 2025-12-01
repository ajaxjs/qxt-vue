<script setup lang="ts">
import { onMounted, useTemplateRef, inject } from 'vue';
import { useDndBus } from './dnd-hooks';
type IDndItem = {
    item: any;
}
const props = defineProps<IDndItem>();
const itemRef = useTemplateRef<HTMLDivElement>('itemRef');
const dndName = inject('dnd-name') as string;

// Dnd总线
const dndBus = useDndBus(dndName);

onMounted(() => {
    dndBus.itemData.set(itemRef.value, props.item);
})
</script>

<template>
    <div ref="itemRef" draggable="true" class="dnd-item">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.dragging {
    opacity: 0.5;
}
</style>