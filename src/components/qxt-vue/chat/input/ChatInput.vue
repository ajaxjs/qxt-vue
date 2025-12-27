<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { FileList } from '../files/'

import type { IChatInputProps } from './type'
import {
    Paperclip as ClipIcon,
    ArrowUpIcon,
    Mic as MicIcon,
    Keyboard as KeyboardIcon,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils';
import { useFileDialog } from '@vueuse/core'
import AudioInput from './AudioInput.vue'
import InputText from './InputText.vue'

const emit = defineEmits(['send'])
const props = defineProps<IChatInputProps>();

const text = defineModel({ default: '' })
const tabs = defineModel<'text' | 'audio'>('type', { default: 'text' })
const fileList = defineModel<File[]>('files');

const { files, open, onCancel, onChange } = useFileDialog({
    accept: 'image/*,text/*,video/*,audio/*,application/zip',
    ...props.fileDialog,
})
const updateFile = () => {
    fileList.value = Array.from(files.value || [])
}
onCancel(updateFile)
onChange(updateFile)
const handleSubmit = () => {
    emit('send', { text: text.value, files: fileList.value })
}
const handleSwitch = () => {
    tabs.value = tabs.value === 'text' ? 'audio' : 'text'
}
const handlePasteFile = (files: File[]) => {
    fileList.value = [...(fileList.value || []), ...files]
}
</script>

<template>
    <form
        class="chat-input border border-solid border-gray-200 rounded-4xl focus-within:border-gray-400 transition duration-300 ease-in-out"
        @submit.prevent="handleSubmit">
        <div v-if="fileList?.length" class="flex gap-2 py-2 px-3">
            <FileList v-model="fileList" />
        </div>
        <div class="flex w-full items-end">
            <div class="pl-2 py-2">
                <Button variant="outline" type="button" size="icon" class="rounded-full" @click="handleSwitch()">
                    <MicIcon v-if="tabs === 'text'" />
                    <KeyboardIcon v-else />
                </Button>
            </div>
            <div v-if="tabs === 'text'" class="flex items-end flex-1">
                <div class="py-2 pl-1">
                    <Button type="button" variant="ghost" size="icon" class="rounded-full" @click="open">
                        <ClipIcon />
                    </Button>
                </div>
                <InputText v-model="text" :placeholder="placeholder"
                    :class="cn('input flex-1 min-w-0 w-full overflow-x-hidden break-all min-h-13 max-h-46 pl-1', inputClass)"
                    @send="handleSubmit" @pastefile="handlePasteFile" />
            </div>
            <div v-else class="flex items-end flex-1 p-2">
                <AudioInput />
            </div>
            <div class="flex pr-2 py-2 gap-2">
                <Button size="icon" class="rounded-full">
                    <ArrowUpIcon />
                </Button>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped></style>
