<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type IOption = {
    type?: 'label' | 'item',
    label: string,
    value: string,
}
type ISelect = {
    label: string,
    options: IOption[],
    class?: HTMLAttributes["class"],
}

const props = defineProps<ISelect>()

const modelValue = defineModel<string | number>()


</script>

<template>
    <Select v-model="modelValue">
        <SelectTrigger :class="cn('min-w-[180px]', props.class)">
            <SelectValue :placeholder="label" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <template v-for="(vo) in options" :key="vo.value">
                    <SelectLabel v-if="vo.type == 'label'">{{ vo.label }}</SelectLabel>
                    <SelectItem v-else :value="vo.value">
                        {{ vo.label }}
                    </SelectItem>
                </template>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>