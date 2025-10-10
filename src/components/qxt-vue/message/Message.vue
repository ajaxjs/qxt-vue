<script setup>
import { computed, useSlots } from 'vue'

import MsgNotify from './comps/MsgNotify.vue'
import MsgText from './comps/MsgText.vue'
import Avatar from '../avatar/Avatar.vue'
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
    hideNickname: Boolean,
    hideStamp: Boolean,
})
const slots = useSlots()
const nicknameVisib = computed(() => !props.hideNickname && (props.nickname || slots.nickname))
const avatarClass = computed(() => cn('size-10', nicknameVisib.value ? 'mt-5' : '', props.avatarClass))
const bgColor = computed(() => props.send ? '#DCF8C6' : '#FFFFFF')
</script>

<template>
    <!-- 系统通知 -->
    <MsgNotify v-if="type === 'notify'" v-bind="text" />
    <!-- 用户消息 -->
    <div v-else class="msg-item flex flex-row gap-x-3" :class="{ 'flex-row-reverse': send }">
        <div class="avatar">
            <slot v-if="$slots.avatar" name="avatar" v-bind="props"></slot>
            <Avatar v-else :src="avatar || ''" :class="avatarClass" />
        </div>
        <div class="flex-1 flex flex-col max-w-full " :class="send ? 'items-end ml-10' : 'items-start mr-10'">
            <!-- 昵称 -->
            <template v-if="nicknameVisib">
                <slot v-if="$slots.nickname" name="nickname"></slot>
                <div v-else-if="nickname" class="text-sm text-gray-500">{{ nickname }}</div>
            </template>
            <!-- 消息 -->
            <div class="msg-box bg-white p-2 rounded-md relative drop-shadow-xs min-h-10 min-w-10" :style="{ 'background-color': bgColor }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    class="absolute top-2  size-5"  :class="send ? 'left-full rotate-180' : 'right-full'">
                    <path :fill="bgColor" d="M14 12 L24 4 L24 20 Z" />
                </svg>
                <slot v-if="$slots.text" name="text" v-bind="props"></slot>
                <MsgText v-else :type="type" :text="text" :html="html" />
            </div>
            <!-- 时间 -->
            <template v-if="!hideStamp">
                <slot v-if="$slots.stamp" name="stamp" v-bind="props"></slot>
                <div v-else-if="stamp" class="stamp">{{ stamp }}</div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>