<script setup lang="ts">
// import { ref } from 'vue'
//import { useDndBus } from './dnd-hook';
type DndItemProps = {
    item: any,
    dndName: string,
}

const { item } = defineProps<DndItemProps>();


//dndBus.itemMap.set(item.id, item);
// console.log(item);
</script>

<template>
    <div :id="item.id" class="dnd-item" draggable="true">
        <slot :item="item" />
    </div>
</template>

<style lang="scss" scoped>
</style>