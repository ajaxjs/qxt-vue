<script setup lang="ts">
import PickerScroll from './PickerScroll.vue';
import type { IPickerViewProps } from './type'

defineProps<IPickerViewProps>()

const emit = defineEmits(['change'])

const selectedValue = defineModel({
    type: Array,
    default: () => [],
});

</script>

<template>
    <div class="picker-view flex">
        <template v-for="(row, i) in rows">
            <PickerScroll :options="row" v-model="selectedValue[i]" class="flex-1" />
        </template>
    </div>
</template>

<style lang="scss" scoped></style>