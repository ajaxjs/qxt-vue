<script setup lang="ts">
import { ref, computed, type FunctionalComponent } from 'vue';
import {
    File as FileIcon,
    FileImage,
    FileText,
    FileCode,
    FileVideoCamera as FileVideo,
    FileVolume,
    FileArchive as FileZip,
} from 'lucide-vue-next';

const props = defineProps<{ file: File }>();
const loaded = ref(false);
type IFileType = Record<string, { icon: FunctionalComponent, ext?: string[] }>
const iconMap: IFileType = {
    'image': { icon: FileImage },
    'video': { icon: FileVideo },
    'audio': { icon: FileVolume },
    'code': { icon: FileCode, ext: ['js', 'html', 'css', 'ts'] },
    'zip': { icon: FileZip },
    'text': { icon: FileText },
}
const fileIcon = computed(() => {
    let type = Object.keys(iconMap).find(key => {
        const item = iconMap[key]
        if (item?.ext && item.ext.some(e => props.file.name.endsWith('.' + e))) {
            return true
        } else if (props.file.type.includes(key)) {
            return true
        }
    }) || 'file', icon = FileIcon;
    if (iconMap[type]) {
        icon = iconMap[type].icon;
        return { type, icon }
    }
    return { type: 'file', icon: FileIcon }
})
const viewImg = (file: File) => URL.createObjectURL(file)
</script>

<template>
    <div>
        <template v-if="fileIcon.type === 'image'">
            <img v-show="loaded" :src="viewImg(file)" class="w-6 h-6 rounded-md" @load="loaded = true"
                @error="loaded = true" />
        </template>
        <component v-else :is="fileIcon.icon" class="w-6 h-6" />
    </div>
</template>

<style lang="scss" scoped></style>