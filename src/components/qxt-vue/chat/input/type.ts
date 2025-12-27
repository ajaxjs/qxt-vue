import type { UseFileDialogOptions } from '@vueuse/core';

export type { UseFileDialogOptions }
// 聊天输入框属性
export interface IChatInputProps {
    placeholder?: string;
    inputClass?: string;
    // 接受的文件类型
    fileDialog?: UseFileDialogOptions;
}
