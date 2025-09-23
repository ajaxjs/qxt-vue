<script setup>
import { ref } from 'vue'

import Dialog from '../../dialog/Dialog.vue'
import { WifiHigh } from 'lucide-vue-next';
const props = defineProps({
    type: String,
    text: {},
    html: Boolean,
})
// 播放状态
const isPlay = ref(false)

</script>

<template>
    <template v-if="type === 'audio'">
        <div class="flex cursor-pointer" :class="{'text-red-500':isPlay}" @click="isPlay = !isPlay">
            <WifiHigh class="rotate-90 size-6" :class="{'animate-pulse': isPlay}" />
            <span>{{ Math.round(text.duration) }}″</span>
        </div>
        <audio :src="isPlay ? text.src : ''" :autoplay="isPlay" @ended="isPlay = false"></audio>
    </template>
    <template v-else-if="type === 'image'">
        <Dialog>
            <template #trigger>
                <img :src="text" class="max-w-[15em]" />
            </template>
            <img :src="text" class="max-w-full" />
        </Dialog>
    </template>
    <template v-else-if="type === 'video'">
        <video :src="text.src" controls></video>
    </template>
    <template v-else>
        <span v-if="html" v-html="text"></span>
        <span v-else>{{ text }}</span>
    </template>
</template>

<style lang="scss" scoped></style>