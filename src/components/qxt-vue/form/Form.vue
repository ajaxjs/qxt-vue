<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"

import Field from './Field.vue'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

const { inline = false, itemInline = false, btns, class: classes } = defineProps<{
    fields: any[],
    btns?: any[],
    inline?: boolean | null,
    itemInline?: boolean,
    class?: HTMLAttributes["class"]
}>()


const modelValue = defineModel({
    type: Object,
    default: () => ({}),
})

const formClass = computed(() => {
    const org = inline ? 'flex gap-4' : 'space-y-4'
    return cn(org, classes)
})

const buttons = computed(() => {
    return btns || [{ label: '提交', type: 'submit' }]
})
</script>

<template>
    <form :class="formClass">
        <!-- 表单标题 -->
        <slot name="prepend"></slot>
        <!-- 表单字段 -->
        <template v-for="vo in fields as any" :key="vo.name">
            <Field v-model="modelValue[vo.name]" v-bind="{ ...$attrs, ...vo }" :inline="itemInline" />
        </template>
        <slot name="append"></slot>
        <!-- 提交按钮 -->
        <slot v-if="$slots.btns" name="btns"></slot>
        <div v-else class="flex gap-2">
            <Button v-for="(btn, i) in buttons" :key="i" v-bind="btn">{{ btn.label }}</Button>
        </div>
        <slot name="after"></slot>
    </form>
</template>

<style lang="scss" scoped></style>