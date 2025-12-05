<script setup lang="ts">
// import { ref } from 'vue'
import { useDndBus } from './dnd-hook';
type DndItemProps = {
    item: any,
    dndName: string,
}

const { item, dndName } = defineProps<DndItemProps>();
const dndBus = useDndBus(dndName);
dndBus.index += 1;
//dndBus.itemMap.set(item.id, item);
// console.log(item);
</script>

<template>
    <div class="dnd-item" draggable="true" :dnd-index="dndBus.index">
        <slot :item="item" />
    </div>
</template>

<style lang="scss" scoped>
</style>