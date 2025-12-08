<script setup lang="ts">
import { useDndBus, getIsReverse, getRootDir, getEventDom, getGlobalIndex } from './dnd-hook';
import { nextTick, useId } from 'vue';
import type { IChangeResult } from './type'

type IDndRootProps = {
    dndName: string;
    dndPath: number[];
    noSort?: boolean;
    listId?: string;
    depth: number;
    childKey?: string;
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
//dndBus.listMap.set(listId, list.value);
dndBus.pathMap.set(listId, dndPath);
dndBus.childKey = props.childKey || 'children';

if (props.depth === 0 && !dndBus.treeMap.has(listId)) {
    dndBus.treeMap.set(listId, list.value);
}


dndBus._separatorClass = props.separatorClass || '';
dndBus._separatorStyle = props.separatorStyle || '';

// 判断是否在目标元素之前
const getIsBefore = (e: DragEvent) => {
    const { dndRoot, getHandle } = getEventDom(e);
    const dir = getRootDir(dndRoot);
    const { x: _x, y: _y } = e;
    const { left, top, width, height } = getHandle()?.getBoundingClientRect();
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
    const { from, over, separator } = dndBus;
    if (!from || !over || isSubset(from.item, over.item)) return;

    const overBefore = getIsBefore(e);

    if (overBefore) {
        if (over.item.previousSibling === separator) return;
        over.parent.insertBefore(separator, over.item)
    } else {
        if (over.item.nextSibling === separator) return;
        over.parent.insertBefore(separator, over.item.nextSibling);
    }
}

const handleDragStart = (e: DragEvent) => {
    const { target, dndItem } = getEventDom(e);
    if (!e.dataTransfer || target.classList.contains('dnd-root')) return;
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    dndBus.from = dndItem;

    nextTick(() => dndBus.from?.item.classList.add('dragging'))
}
// 进入目标元素
const handleDragEnter = (e: DragEvent) => {
    if (!dndBus.from) return; // 不同组
    e.preventDefault();
    const { dndItem } = getEventDom(e);

    if (dndItem === dndBus.from.target) {
        dndBus.removeSeparator();
        return;
    }
    dndBus.over = dndItem;
    handleMoveItem(e)
}
// 判断是否为子元素
function isSubset(domA: HTMLElement, domB: HTMLElement) {
    // 排除自身（如需包含自身，可去掉这行）
    if (domB === domA) return false;

    let currentNode = domB.parentNode;
    // 向上遍历父节点，直到根节点
    while (currentNode) {
        if (currentNode === domA) {
            return true;
        }
        currentNode = currentNode.parentNode;
    }
    return false;
}


// 拖动目标元素 （必须）
const handleDragOver = (e: DragEvent) => {
    if (!dndBus.from) return; // 不同组
    e.preventDefault();
    const { dndItem } = getEventDom(e);
    if (!dndItem || dndItem === dndBus.from.target) return;
    dndBus.over = dndItem;
    handleMoveItem(e)
}
const handleDragLeave = (e: DragEvent) => {
    const { dndItem } = getEventDom(e);
    if (!dndItem || dndItem === dndBus?.over?.target) return; // 相同元素
    dndBus.removeSeparator();
    dndBus.over = null;
}
const handleDrop = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    e.preventDefault();
    e.stopPropagation();
    dndBus.from?.item.classList.remove('dragging')
    const { dndItem } = getEventDom(e);
    dndBus.over = dndItem;
    const { from, over } = dndBus;

    if (!from || !over || isSubset(from.item, over.item)) return;

    // 树全局下标
    const fromIndex = getGlobalIndex(from.item);
    const overIndex = getGlobalIndex(over.item);

    const isBefore = getIsBefore(e);
    const isSameRoot = from.parent == over.parent;
    const isUp = overIndex < fromIndex;
    // 目标项下标
    let toIndex = over.index;
    if (isSameRoot) {
        toIndex += (isUp ? (isBefore ? 0 : 1) : (isBefore ? -1 : 0));
    } else {
        toIndex += (isBefore ? 0 : 1)
    }

    // 未改变位置
    if ((isSameRoot && from.index === toIndex) || toIndex < 0) return;


    const fromData = from.getData();
    const toData = over.getData();

    dndBus.index = toIndex;
    const toPath = [...props.dndPath, toIndex];
    if (!props.noSort) {
        const fromItem = fromData.list.splice(from.index, 1);
        toData.list.splice(toIndex, 0, ...fromItem);
    }
    dndBus.removeSeparator();
    const detail: IChangeResult = { from, over, fromData, toData, toPath, toIndex, isBefore, isUp };
    emit('change', detail);

    //e.detail = detail;
}
const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    dndBus.from?.item.classList.remove('dragging')
    dndBus.reset();
}



</script>

<template>
    <div class="dnd-root" :list-id="listId" :depth="depth" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd">
        <slot></slot>
    </div>
</template>

<style lang="scss"></style>