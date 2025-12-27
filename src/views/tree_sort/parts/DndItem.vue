<script setup lang="ts">
import { computed } from 'vue';
import DndRoot from './DndRoot.vue';


const props = defineProps({
    item: Object,
    depth: {
        type: Number,
        default: 0
    }
})
// 子项的属性
const itemAttrs = computed(() => {
    return {
        depth: props.depth
    }
})

</script>

<template>
    <div class="dnd-item">
        <div class="dnd-handle">
            <slot name="handle" :item="item" v-bind="itemAttrs"></slot>
        </div>
        <template v-if="item && item.children">
            <DndRoot v-model="item.children" :depth="depth">
                <template #handle="itemSlotProps">
                    <slot name="handle" v-bind="itemSlotProps"></slot>
                </template>
            </DndRoot>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>