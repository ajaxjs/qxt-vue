<script setup>
import { computed, useSlots } from 'vue'

import MsgNotify from './comps/MsgNotify.vue'
import MsgText from './comps/MsgText.vue'
import Avatar from '../avatar/Avatar.vue'
import { cn } from '@/lib/utils.js'

const props = defineProps({
    type: String,
    text: {},
    // 子消息标题
    caption: String,
    avatar: String,
    nickname: String,
    stamp: String,
    sent: Boolean,
    // 红点标记，默认红色，也可以自定义类名
    dotted: [Boolean, String],

    html: Boolean,
    avatarClass: {},
    hideNickname: Boolean,
    hideStamp: Boolean,
})
const slots = useSlots()
const nicknameVisib = computed(() => !props.hideNickname && (props.nickname || slots.nickname))
const avatarClass = computed(() => cn('size-10', nicknameVisib.value ? 'mt-5' : '', props.avatarClass))
const bgColor = computed(() => props.sent ? '#DCF8C6' : '#FFFFFF')
const dotClass = computed(() => {
    const dotted = typeof props.dotted === 'string' ? props.dotted : '';
    const pos = props.sent ? 'right-[100%] mr-1' : 'left-[100%] ml-1';
    return cn('absolute top-[50%] translate-y-[-50%] bg-red-500 text-white text-xs size-2 rounded-full', pos, dotted)
})

const emit = defineEmits(['height-update'])

function heightUpdate(e) {
    emit('height-update', e)
}
</script>

<template>
    <!-- 系统通知 -->
    <MsgNotify v-if="type === 'notify'" v-bind="text" />
    <!-- 用户消息 -->
    <div v-else class="msg-item flex flex-row gap-x-3" :class="{ 'flex-row-reverse': sent }">
        <div class="avatar">
            <slot v-if="$slots.avatar" name="avatar" v-bind="props"></slot>
            <Avatar v-else :src="avatar || ''" :class="avatarClass" />
        </div>
        <div class="flex-1 flex flex-col max-w-full space-y-1" :class="sent ? 'items-end ml-10' : 'items-start mr-10'">
            <!-- 昵称 -->
            <template v-if="nicknameVisib">
                <slot v-if="$slots.nickname" name="nickname"></slot>
                <div v-else-if="nickname" class="text-sm text-gray-500">{{ nickname }}</div>
            </template>
            <!-- 消息 -->
            <slot name="before-text"></slot>
            <div class="msg-box bg-white p-2 rounded-md relative drop-shadow-xs min-h-10 min-w-10"
                :style="{ 'background-color': bgColor }">
                <!-- 消息三角 -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    class="absolute top-2  size-5" :class="sent ? 'left-full rotate-180' : 'right-full'">
                    <path :fill="bgColor" d="M14 12 L24 4 L24 20 Z" />
                </svg>
                <!-- 消息后置内容 -->
                <slot name="prepend-text"></slot>
                <!-- 消息内容 -->
                <slot v-if="$slots.text" name="text" v-bind="props"></slot>
                <MsgText v-else :type="type" :text="text" :html="html" :sent="sent" @img-loaded="heightUpdate" />
                <!-- 红点标记 -->
                <div v-if="dotted" :class="dotClass"></div>
                <!-- 消息后置内容 -->
                <slot name="append-text"></slot>
            </div>
            <div v-if="(type === 'audio' && text?.content) || caption"
                class="bg-gray-50 text-gray-500 rounded-sm px-2 py-1">
                {{ text.content || caption }}
            </div>
            <!-- 时间 -->
            <template v-if="!hideStamp">
                <slot v-if="$slots.stamp" name="stamp" v-bind="props"></slot>
                <div v-else-if="stamp" class="stamp text-sm text-gray-500">{{ stamp }}</div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>