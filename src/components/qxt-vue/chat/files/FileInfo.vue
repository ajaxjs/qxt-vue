<script setup lang="ts">
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
// import { Button } from '@/components/ui/button';

defineProps<{ file: File }>()
const emit = defineEmits(['delete'])
// 格式化文件大小 单位：B,KB,MB,GB,TB
function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
const viewImg = (file: File) => URL.createObjectURL(file)
</script>

<template>
    <Drawer>
        <DrawerTrigger>
            <slot name="trigger" />
        </DrawerTrigger>
        <DrawerContent aria-hidden="true">
            <DrawerHeader>
                <DrawerTitle>
                    {{ file.name }}
                </DrawerTitle>
                <DrawerDescription class="space-y-2">
                    <div v-if="file.type.startsWith('image')">
                        <img :src="viewImg(file)" class="max-w-full max-h-50 rounded-md" />
                    </div>
                    <div>文件类型：{{ file.type }}</div>
                    <div>文件大小：{{ formatFileSize(file.size) }}</div>
                    <div>最后修改时间：{{ new Date(file.lastModified).toLocaleString() }}</div>
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <DrawerClose class="text-red-500 border border-red-300 rounded-md p-2" @click="emit('delete', file)">
                    删除文件
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>
