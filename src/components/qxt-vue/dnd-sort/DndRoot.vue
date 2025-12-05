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
const getIsBefore = (e: DragEvent) => {
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
    const { from, over, separator } = dndBus;
    if (!from || !over || isSubset(from.item, over.item)) return;
    
    const overBefore = getIsBefore(e);

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
    dndBus.from?.item.classList.remove('dragging')
    const { dndItem } = useEventElm(e);
    dndBus.over = dndItem;
    const { from, over } = dndBus
    if (!from || !over || isSubset(from.item, over.item)) return;
    const formList = dndBus.listMap.get(from.listId);
    const toList = dndBus.listMap.get(over?.listId);
    const isBefore = getIsBefore(e);
    const isSameRoot = from.root == over.root;
    const isUp = Number(over.item.getAttribute('dnd-index')) < Number(from.item.getAttribute('dnd-index'));
    let toIndex = over.index;
    if (isSameRoot) {
        toIndex += (isUp ? (isBefore ? 0 : 1) : (isBefore ? -1 : 0));
    } else {
        toIndex += (isBefore ? 0 : 1)
    }
    // 未改变位置
    if ((isSameRoot && from.index === toIndex) || toIndex < 0) return;


    dndBus.index = toIndex;
    const toPath = [...props.dndPath, toIndex];
    if (!props.noSort) {
        const fromData = formList.splice(from.index, 1);
        toList.splice(toIndex, 0, ...fromData);
    }
    dndBus.removeSeparator();
    const detail: IChangeResult = { from, over, toPath, toIndex, isBefore, isUp };
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
    <div class="dnd-root" :list-id="listId" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd">
        <slot></slot>
    </div>
</template>

<style lang="scss"></style>