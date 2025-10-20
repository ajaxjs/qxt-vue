<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

type ButtonItem = {
    label?: string,
    type?: 'button' | 'separator' | 'text',
    icon?: FunctionalComponent,
    iconRight?: FunctionalComponent,
    [key: string]: any,
}

type ButtonGroupProps = {
    type: string,
    options: ButtonItem[],
}
defineProps<ButtonGroupProps>()

</script>

<template>
    <ButtonGroup>
        <template v-for="({ type, label, icon, iconRight, ...item }) in options">
            <ButtonGroupSeparator v-if="type == 'separator'" v-bind="{ ...$attrs, ...item }" />
            <ButtonGroupText v-else-if="type == 'text'" v-bind="{ ...$attrs, ...item }">
                <template v-if="icon">
                    <component :is="icon" />
                </template>
                <span>{{ label }}</span>
            </ButtonGroupText>
            <Button v-else v-bind="{ ...$attrs, ...item }">
                <template v-if="icon">
                    <component :is="icon" />
                </template>
                <span>{{ label }}</span>
                <template v-if="iconRight">
                    <component :is="iconRight" />
                </template>
            </Button>
        </template>
    </ButtonGroup>
</template>