<script setup lang="ts">
import Item, { type ItemProps } from '@/components/qxt-vue/item/Item.vue'
type ListItemProps = ItemProps & { [key: string]: any }
const items: ListItemProps[] = [
    {
        title: 'Default Variant',
        description: 'Standard styling with subtle background and borders.',
        variant: 'outline',
    },
    {
        title: 'Default Variant',
        description: 'Standard styling with subtle background and borders.',
        variant: 'outline',
        actions: [{ text: 'Action 1', variant: 'outline' }, { text: 'Action 2' }]
    },
];
</script>

<template>
    <div>
        <Item v-for="(item, i) in items" :key="i" v-bind="item" />
    </div>
</template>

<style lang="scss" scoped></style>