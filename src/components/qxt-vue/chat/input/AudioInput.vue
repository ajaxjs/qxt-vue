<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button'
import { Recorder } from '../lib/AudioRecord'
import { Mic as MicIcon } from 'lucide-vue-next'

let recorder = new Recorder();
const permission = ref<boolean | null>(null)
const isRecording = ref(false)
onMounted(async () => {
    try {
        permission.value = await recorder.getPermission()
    } catch (err) {
        permission.value = false
        console.error('获取麦克风权限失败', err)
    }
    console.log('--onMounted');

})
onUnmounted(() => {
    if (recorder) {
        recorder.destroy()
    }
    console.log('--onUnmounted');
})
recorder.on('end', ({ url, blob }) => {
    console.log('onEnd', blob)
    const audio = new Audio(url)
    audio.play().catch(err => {
        console.error('播放失败', err)
    })
    audio.onplay = () => {
        console.log('播放完成')
    }
})

let handleStart = (e: TouchEvent) => {
    e.preventDefault()
    if (permission.value !== true) {
        return
    }
    isRecording.value = true
    recorder.start()
};
let handleStop = (e: TouchEvent) => {
    e.preventDefault()
    if (permission.value !== true) {
        return
    }
    isRecording.value = false
    recorder.end()
};
let handleCancel = (e: TouchEvent) => {
    e.preventDefault()
    if (permission.value !== true) {
        return
    }
    isRecording.value = false
    recorder.cleanup()
};
</script>

<template>
    <Button type="button" variant="outline"
        class="rounded-full w-full text-gray-500 select-none relative after:absolute after:inset-0"
        @touchstart="handleStart" @touchend="handleStop" @touchcancel="handleCancel" @mousedown="handleStart"
        @mouseup="handleStop" @mouseout="handleCancel">
        <template v-if="permission === null">
            <span class="text-gray-500">正在初始化...</span>
        </template>
        <template v-else-if="permission === true">
            <MicIcon />
            <span v-if="!isRecording">按住 说话</span>
            <span v-else>松开 结束</span>
        </template>
        <template v-else>
            <span class="text-red-500">未获取麦克风权限</span>
        </template>
    </Button>
</template>

<style lang="scss" scoped></style>