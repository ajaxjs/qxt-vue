<script setup lang="ts">
import { useDndBus, getIsReverse, getRootDir } from './dnd-hook';
//import { ref } from 'vue';
import { nextTick, useId } from 'vue';
import type { IChangeResult } from './type'

type IDndRootProps = {
    dndName: string;
    dndPath: number[];
    noSort?: boolean;
    separatorClass?: string;
    separatorStyle?: string;
}
const props = defineProps<IDndRootProps>()
const emit = defineEmits(['change']);

const listId = useId();
const dndBus = useDndBus(props.dndName);
const dndPath = props.dndPath || [];

const list = defineModel<any[]>();
// 列表映射
dndBus.listMap.set(listId, list.value);
dndBus.pathMap.set(listId, dndPath);
dndBus._separatorClass = props.separatorClass || '';
dndBus._separatorStyle = props.separatorStyle || '';

// 事件元素
const useEventElm = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    const dndItem = target.classList.contains('dnd-item') ? target : target.closest('.dnd-item') as HTMLElement;
    const dndRoot = target.closest('.dnd-root') as HTMLElement;
    return { target, dndItem, dndRoot };
};

// 判断是否在目标元素之前
const isBefore = (e: DragEvent) => {
    const { dndItem, dndRoot } = useEventElm(e);
    const dir = getRootDir(dndRoot);
    const { x: _x, y: _y } = e;
    const { left, top, width, height } = dndItem.getBoundingClientRect();
    let is_before = false;
    if (dir === 'horizontal') {
        is_before = _x < left + width / 2;
    } else {
        is_before = _y < top + height / 2;
    }
    // 检查是否反向排序
    const is_reverse = getIsReverse(dndRoot);
    // 倒序排->取反
    return is_reverse ? !is_before : is_before;
}

const handleMoveItem = (e: DragEvent) => {
    if (!dndBus.over) return;
    const overBefore = isBefore(e);

    const { over, separator } = dndBus;
    if (overBefore) {
        if (over.item.previousSibling === separator) return;
        over.root.insertBefore(separator, over.item)
    } else {
        if (over.item.nextSibling === separator) return;
        over.root.insertBefore(separator, over.item.nextSibling);
    }
}

const handleDragStart = (e: DragEvent) => {
    const { target, dndItem } = useEventElm(e);
    if (!target.dataset.key || !e.dataTransfer || target.classList.contains('dnd-root')) return;
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    dndBus.from = dndItem;
    nextTick(() => dndBus.from?.item.classList.add('dragging'))
}
// 进入目标元素
const handleDragEnter = (e: DragEvent) => {
    if (!dndBus.from) return; // 不同组
    e.preventDefault();
    const { dndItem } = useEventElm(e);
    if (dndItem === dndBus.from.target) {
        dndBus.removeSeparator();
        return;
    }
    dndBus.over = dndItem;
    handleMoveItem(e)
}

// 拖动目标元素 （必须）
const handleDragOver = (e: DragEvent) => {
    if (!dndBus.from) return; // 不同组
    e.preventDefault();
    const { dndItem } = useEventElm(e);
    if (!dndItem || dndItem === dndBus.from.target) return;
    dndBus.over = dndItem;
    handleMoveItem(e)
}
const handleDragLeave = (e: DragEvent) => {
    const { dndItem } = useEventElm(e);
    if (!dndItem || dndItem === dndBus?.over?.target) return; // 相同元素
    dndBus.removeSeparator();
    dndBus.over = null;
}
const handleDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    e.preventDefault();
    e.stopPropagation();
    const { dndItem } = useEventElm(e);
    dndBus.over = dndItem;
    const { from, over } = dndBus
    if (!from || !over || from.item === over.item) return;
    const formList = dndBus.listMap.get(from.listId);
    const toList = dndBus.listMap.get(over?.listId);
    const isbefore = isBefore(e);
    const isUp = over.index < from.index;
    const _isUp = Number(over.item.getAttribute('global-index')) < Number(from.item.getAttribute('global-index'));
    let toIndex = over.index + (isbefore ? (isUp ? 0 : -1) : (isUp ? 1 : 0));
    console.log('isUp', _isUp);
    // 未改变位置
    if ((from.root==over.root && from.index === toIndex) || toIndex < 0) return;
    

    dndBus.index = toIndex;
    const toPath = [...props.dndPath, toIndex];
    if (!props.noSort) {
        const fromData = formList.splice(from.index, 1);
        toList.splice(toIndex, 0, ...fromData);
    }
    dndBus.removeSeparator();
    const detail: IChangeResult = { from, over, toPath, toIndex, isBefore: isbefore, isUp };
    emit('change', detail);

    //e.detail = detail;
}
const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    dndBus.from?.item.classList.remove('dragging')
    dndBus.reset();
    console.log('drag end', dndBus);

}



</script>

<template>
    <div class="dnd-root" :list-id="listId" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd">
        <slot></slot>
    </div>
</template>

<style lang="scss"></style>