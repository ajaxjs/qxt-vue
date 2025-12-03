<script setup lang="ts">
import { useDndBus } from './dnd-hook';
//import { ref } from 'vue';
import { nextTick, useId } from 'vue';

type IDndRootProps = {
    dndName: string;
}
const props = defineProps<IDndRootProps>()

const listId = useId();
const dndBus = useDndBus(props.dndName);
const list = defineModel<any[]>();
// 列表映射
dndBus.listMap.set(listId, list.value);

console.log(dndBus.listMap);


// 事件元素
const useEventElm = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    const dndItem = target.classList.contains('dnd-item') ? target : target.closest('.dnd-item') as HTMLElement;
    const dndRoot = target.closest('.dnd-root') as HTMLElement;
    return { target, dndItem, dndRoot };     //, index, itemList
};
// 获取根容器方向
const getRootDir = (e: DragEvent) => {
    const { dndRoot } = useEventElm(e);
    const computedStyle = getComputedStyle(dndRoot);
    const display = computedStyle.getPropertyValue('display');
    const direction = computedStyle.getPropertyValue('flex-direction');
    return display === 'flex' && direction === 'row' ? 'horizontal' : 'vertical';
}
// 判断是否在目标元素之前
const isBefore = (e: DragEvent) => {
    const { dndItem } = useEventElm(e);
    const dir = getRootDir(e);
    const { x: _x, y: _y } = e;
    const { left, top, width, height } = dndItem.getBoundingClientRect();

    if (dir === 'horizontal') {
        return _x < left + width / 2;
    } else {
        return _y < top + height / 2;
    }
}

const handleMoveItem = (e: DragEvent) => {
    if (!dndBus.over) return;
    dndBus.overBefore = isBefore(e);
    const { over, separator, overBefore } = dndBus;
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
    if (!target.dataset.key || !e.dataTransfer) return;
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
    if (!from || !over) return;
    const formList = dndBus.listMap.get(from.listId);
    const toList = dndBus.listMap.get(over?.listId);
    console.log('from:', formList, 'over:', toList);

    const fromData = formList.splice(from.index, 1);
    toList.splice(over.index, 0, ...fromData);
    dndBus.removeSeparator();
}
const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    dndBus.from?.item.classList.remove('dragging')
    dndBus.reset();
    console.log('4-DragEnd:', props.dndName);

}



</script>

<template>
    <div class="dnd-root" :list-id="listId" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped></style>