<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

defineOptions({
    inheritAttrs: false
})

const props = defineProps<{
    defaultValue?: string | number
    modelValue?: string | number
    class?: HTMLAttributes["class"]
    wrapClass?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
})
</script>

<template>
    <div :class="cn('flex items-center gap-2 min-w-0', wrapClass)">
        <slot name="before"></slot>
        <div data-slot="input" :class="cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            props.class,
        )">
            <slot name="prefix"></slot>
            <slot v-if="$slots.input" v-bind="{ ...$attrs, ...props }" name="input"></slot>
            <input v-else v-model="modelValue" v-bind="$attrs" class="flex-1 outline-none">
            <slot name="suffix"></slot>
        </div>
        <slot name="after"></slot>
    </div>
</template>