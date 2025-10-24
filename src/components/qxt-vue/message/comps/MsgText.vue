<script setup>
import { ref, nextTick } from 'vue'

import Dialog from '../../dialog/Dialog.vue'
import { WifiHigh, CirclePlay, LoaderCircle } from 'lucide-vue-next';
const props = defineProps({
    type: String,
    text: {},
    html: Boolean,
    sent: Boolean,
})
// 播放状态
const isPlay = ref(false)
const emit = defineEmits(['img-loaded'])

function imgLoaded(e) {
    nextTick(() => emit('img-loaded', e))
}
// 播放时间更新
const loadAudio = ref(false)
const playTime = ref(0)
function onClickPlay() {
    if (isPlay.value) {
        playEnd()
    } else {
        isPlay.value = true
        loadAudio.value = true
    }
}
function onUpdateTime(e) {
    playTime.value = e.target.currentTime
}
function playEnd() {
    isPlay.value = false;
    playTime.value = 0;
}
</script>

<template>
    <template v-if="type === 'audio'">
        <div class="flex cursor-pointer" :class="{ 'text-red-500': isPlay, 'flex-row-reverse': sent }"
            @click="onClickPlay">
            <WifiHigh class="rotate-90 size-6" :class="{ 'animate-pulse': isPlay, 'rotate-z-[180deg]': sent }" />
            <span>{{ Math.round((text?.duration || 0) - playTime) }}″</span>
        </div>
        <audio :src="isPlay ? text.src : ''" :autoplay="isPlay" @ended="playEnd" @timeupdate="onUpdateTime"></audio>
    </template>
    <template v-else-if="type === 'image'">
        <Dialog>
            <template #trigger>
                <img :src="text?.src || text" class="max-w-[15em]" @load="imgLoaded" />
            </template>
            <img :src="text?.src || text" class="max-w-full" />
        </Dialog>
    </template>
    <template v-else-if="type === 'video'">
        <div v-if="!isPlay" class="relative aspect-video" @click="isPlay = true">
            <img :src="text.poster" class="rounded-sm" @load="imgLoaded" />
            <CirclePlay
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 text-white bg-black/50 rounded-full p-2 cursor-pointer shadow-sm" />
        </div>

        <video v-else :src="isPlay ? text.src : ''" :poster="text.poster" controls autoplay class="rounded-sm"></video>
    </template>
    <template v-else>
        <span v-if="html" v-html="text"></span>
        <span v-else>{{ text }}</span>
    </template>
</template>

<style lang="scss" scoped></style>