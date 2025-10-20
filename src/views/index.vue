<script setup lang="ts">
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems, TDropdownMenuItem } from '@/components/qxt-vue/dropdown-menu/type'
import { ButtonGroup } from '@/components/qxt-vue/button-group'
import { PlusIcon } from "lucide-vue-next"
import { Button } from '@/components/ui/button'

function onClick(e: Event) {
    console.log('menu click', e);
}
const menu: TDropdownMenuItems = [
    { label: 'Billing', shortcut: '⇧⌘P', onClick },
    { label: 'Team', shortcut: '⌘T', onClick },
    { label: 'Subscription', disabled: true, onClick },
    {
        label: 'Max Team',
        shortcut: '⌘T',
        submenu: {
            label: 'Max Team',
            items: [
                { label: 'Max Team 1', shortcut: '⌘T', onClick },
                { label: 'Max Team 2', shortcut: '⌘T', onClick },
                {
                    label: 'Max Team 3', shortcut: '⌘T',
                    submenu: {
                        label: 'Max Team 3',
                        items: [
                            { label: 'Max Team 3-1', shortcut: '⌘T', onClick },
                            { label: 'Max Team 3-2', shortcut: '⌘T', onClick },
                        ]
                    }
                },
                { label: 'Max Team 4', shortcut: '⌘T', onClick },
            ]
        }
    },
]
function onSelected(item: TDropdownMenuItem) {
    console.log('selected', item.selected);
}
</script>

<template>
    <div class="p-4">
        <CardBox title="DropdownMenu" body-class="space-y-4">
            <DropdownMenu :items="menu" label="My Account" @selected="onSelected">
                <Button>Open</Button>
            </DropdownMenu>
        </CardBox>

        <CardBox title="ButtonGroup" body-class="space-y-4">
            <ButtonGroup type="primary" size="sm" variant="outline" :options="[
                { type: 'button', label: '回复' },
                { type: 'button', label: '删除' },
            ]" />
            <ButtonGroup type="primary" variant="outline" :options="[
                { type: 'button', label: '回复' },
                { type: 'button', label: '删除' },
            ]" />
            <ButtonGroup type="primary" size="lg" variant="outline" :options="[
                { type: 'button', label: '回复' },
                { type: 'button', label: '删除' },
            ]" />
            <!-- 分隔符 -->
            <ButtonGroup type="primary" size="lg" :options="[
                { type: 'button', label: '回复' },
                { type: 'separator', class: 'bg-red-800' },
                { type: 'button', label: '添加', icon: PlusIcon },
            ]" />
        </CardBox>
    </div>
</template>

<style lang="scss" scoped></style>