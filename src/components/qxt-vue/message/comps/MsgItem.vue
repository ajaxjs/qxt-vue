<script setup>
import { computed, useSlots } from 'vue'
import MsgText from './MsgText.vue'
import Avatar from '../../avatar/Avatar.vue'
import { msgProps } from '../message.js'
import { cn } from '@/lib/utils.js'

const props = defineProps({
    type: String,
    text: {},
    avatar: String,
    nickname: String,
    stamp: String,
    send: Boolean,

    html: Boolean,
    avatarClass: {},
})

//const slots = useSlots()
//console.log(props)

</script>

<template>
    <div class="flex flex-row gap-x-2" :class="{ 'flex-row-reverse': send }">
        <div>
            <Avatar :src="avatar || ''" :class="cn('size-8', props.avatarClass)" />
        </div>
        <div class="flex-1 flex flex-col max-w-full" :class="send ? 'items-end' : 'items-start'">
            <!-- 昵称 -->
            <slot v-if="$slots.nickname" name="nickname"></slot>
            <div v-else-if="nickname" class="text-sm text-gray-500">{{ nickname }}</div>
            <!-- 消息 -->
            <div class="bg-white p-2 rounded-md">
                <MsgText :type="type" :text="text" :html="html" />
            </div>
            <!-- 时间 -->
            <slot v-if="$slots.stamp" name="stamp" v-bind="props"></slot>
            <div v-else-if="stamp">{{ stamp }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>