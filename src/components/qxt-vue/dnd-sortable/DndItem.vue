<script setup lang="ts">
import { onMounted, useTemplateRef, inject, useId } from 'vue';
import { useDndBus } from './dnd-hooks';
type IDndItem = {
    item: any;
}
const props = defineProps<IDndItem>();
const itemRef = useTemplateRef<HTMLDivElement>('itemRef');
const dndName = inject('dnd-name') as string;
const itemKey = `${dndName}-${props.item.id}`;//useId()

// Dnd总线
const dndBus = useDndBus(dndName);

onMounted(() => {
    //dndBus.itemData.set(itemRef.value, props.item);
    dndBus.itemData.set(itemKey, props.item);
})
</script>

<template>
    <div ref="itemRef" :data-key="itemKey" draggable="true" class="dnd-item hover:bg-blue-100">
        <slot :item="item"></slot>
    </div>
</template>

<style lang="scss" scoped>
.dragging {
    opacity: 0.5;
}
</style>