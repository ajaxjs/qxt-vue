<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

defineProps({
    title: String,
    description: String,
    actions: Array,
    content: String,
    html: Boolean,
})
</script>

<template>
    <Dialog>
        <DialogTrigger v-if="$slots.trigger">
            <slot name="trigger"></slot>
        </DialogTrigger>
        <DialogContent :class="$attrs.class">
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription>
                    {{ description }}
                </DialogDescription>
            </DialogHeader>
            <!-- 内容 -->
            <slot v-if="$slots.default"></slot>
            <template v-if="content">
                <span v-if="html" v-html="content"></span>
                <span v-else>{{ content }}</span>
            </template>
            <DialogFooter v-if="actions?.length">
                <template v-for="({ text, ...attr }, i) in actions" :key="i">
                    <Button v-bind="attr">{{ text }}</Button>
                </template>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>