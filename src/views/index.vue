<script setup lang="ts">
import { DropdownMenu } from '@/components/qxt-vue/dropdown-menu'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

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
</script>

<template>
    <div class="p-4">
        <DropdownMenu :items="menu" label="My Account">
            <button>Open</button>
        </DropdownMenu>
    </div>
</template>

<style lang="scss" scoped></style>