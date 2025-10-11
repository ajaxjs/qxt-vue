<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

defineOptions({
    inheritAttrs: false
})

type IOption = {
    label: string,
    value: string,
}
const props = defineProps<{
    name: string,
    options: IOption[],
    orientation: 'vertical' | 'horizontal',
    class?: HTMLAttributes["class"],
}>()

const inputClass = computed(() => {
    const { orientation } = props;
    const lay = orientation === 'horizontal' ? 'flex items-center gap-2' : 'space-y-2';
    return cn('radio-group px-3 py-1', lay, props.class)
})

</script>

<template>
    <div :class="inputClass">
        <div v-for="(item, i) in options" :key="i" class="flex items-center gap-1">
            <Checkbox :id="'name' + i" v-bind="item" />
            <label :for="'name' + i"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {{ item.label }}
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>