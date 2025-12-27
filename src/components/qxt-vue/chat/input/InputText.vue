<script setup lang="ts">
import { nextTick } from 'vue'
import { InputGroupTextarea } from '@/components/ui/input-group';
const text = defineModel({ default: '' })
//const fileList = defineModel<File[]>('files');
const emit = defineEmits(['send', 'pastefile'])

// 处理粘贴文件
const handlePaste = (e: ClipboardEvent) => {
    if (!e.clipboardData || e.clipboardData.items.length === 0) {
        return
    }
    const list = Array.from(e.clipboardData.items);
    if (list.some(item => item.kind === 'file')) {
        e.preventDefault();
        const pastefile = list.filter(item => item.kind === 'file').map(item => item.getAsFile()).filter((file) => file instanceof File)
        //console.log('---fileList.value', fileList.value);
        emit('pastefile', pastefile)

    }
}
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault()
        const target = e.target as HTMLTextAreaElement
        const cursorPos = target.selectionStart   // 光标开始位置（有选中文本时和 selectionEnd 可能不同）
        const textBefore = text.value.substring(0, cursorPos)
        const textAfter = text.value.substring(target.selectionEnd)

        // 直接拼接新内容（这里会触发 v-model 的更新）
        text.value = textBefore + '\n' + textAfter

        // 等 DOM 更新完后再恢复光标位置（关键！）
        nextTick(() => {
            // 新光标位置 = 原来位置 + 1（换行符长度）
            const newPos = cursorPos + 1
            target.selectionStart = target.selectionEnd = newPos

            // 可选：滚动到光标可见位置
            target.scrollTop = target.scrollHeight
        })
    } else if (e.key === 'Enter') {
        e.preventDefault()
        emit('send')
    }
}
</script>

<template>
    <InputGroupTextarea v-model="text" @paste="handlePaste" @keydown="handleKeydown" />
</template>

<style lang="scss" scoped></style>