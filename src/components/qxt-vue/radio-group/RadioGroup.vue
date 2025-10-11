<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from 'vue'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type IOption = {
    label: string,
    value: string,
}
defineOptions({
    inheritAttrs: false
})
const props = defineProps<{
    name: string,
    options: IOption[],
    orientation: 'vertical' | 'horizontal',
    class?: HTMLAttributes["class"]
}>()
const modelValue = defineModel<string | number>()
const radioClass = computed(() => {
    const { orientation } = props;
    return cn('radio-group px-3 py-1', props.class, {
        // fix: horizontal参数无效
        'flex': orientation === 'horizontal'
    })
})
</script>

<template>
    <RadioGroup v-model="modelValue" :orientation="orientation" :class="radioClass">
        <div class="flex items-center" v-for="(item, i) in options" :key="i">
            <RadioGroupItem :id="name + i" :value="item.value" />
            <Label :for="name + i" class="pl-2">{{ item.label }}</Label>
        </div>
    </RadioGroup>
</template>