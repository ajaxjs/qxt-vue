<script setup lang="ts">
import FileInfo from './FileInfo.vue'
import { Button } from '@/components/ui/button';
import { X as CloseIcon } from 'lucide-vue-next'
import FileIcon from './FileIcon.vue'

const files = defineModel<File[]>({ default: [] });

const handleDelete = (file: File) => {
    files.value = files.value.filter(f => f !== file)
}
</script>

<template>
    <div class="flex gap-2 flex-wrap max-w-full">
        <FileInfo v-for="(file, index) in files" :key="index" :file="file">
            <template #trigger>
                <div class="flex" @delete="handleDelete">
                    <div class="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-l-full">
                        <FileIcon :file="file" />
                        <div class="max-w-30 truncate">{{ file.name }}</div>
                    </div>
                    <Button class="p-1 rounded-r-full bg-gray-200 text-gray-500" size="icon-sm" @click.stop="handleDelete(file)">
                        <CloseIcon />
                    </Button>
                </div>
            </template>
        </FileInfo>
    </div>
</template>

<style lang="scss" scoped></style>