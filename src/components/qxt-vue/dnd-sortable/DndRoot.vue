<script setup lang="ts">
import { nextTick, useTemplateRef, useId, provide, onMounted, onUnmounted } from 'vue';
import { useDndBus } from './dnd-hooks';


const props = defineProps({
    dndId: String,
    data: Object,
});
const emit = defineEmits(['update', 'change']);

const itemKey = useId();
const dndName = props.dndId || useId();
provide('dnd-name', dndName);

// Dnd总线
const dndBus = useDndBus(dndName);

// DndRoot
const fromRoot = useTemplateRef('rootRef');

onMounted(() => {
    if (!fromRoot.value) return;
    if (!Array.from(fromRoot.value.children).find(item => item.classList.contains('dnd-item'))) {
        return console.error('DndRoot 只能包含 DndItem 组件', fromRoot.value);
    }

    //dndBus.rootData.set(fromRoot.value, props.data);
    dndBus.rootData.set(itemKey, props.data);
    const computedStyle = getComputedStyle(fromRoot.value);
    const display = computedStyle.getPropertyValue('display');
    const direction = computedStyle.getPropertyValue('flex-direction');
    if (display === 'flex' && direction === 'row') {
        dndBus.direction = 'horizontal';
    } else {
        dndBus.direction = 'vertical';
    }
})
onUnmounted(() => {
    dndBus.reset();
})

/**
 * 处理占位符位置
 * @param e 拖动事件
 */
function handlePlaceholder(e: DragEvent) {
    const target = e.target as HTMLElement;
    const dndItem = target.closest('.dnd-item') as HTMLElement;
    if (target && target.classList.contains('dnd-root')) {
        e.stopPropagation();
        return;
    }
    // 忽略：拖动元素包含目标元素
    if (dndBus.fromItem.contains(dndItem)) return;

    dndBus.toItem = dndItem;

    const { x: _x, y: _y } = e;
    const { left, top, width, height } = dndItem.getBoundingClientRect();
    //console.log(left, top, width, height);
    if (dndBus.direction === 'horizontal') {
        dndBus.toBefore = _x < left + width / 2;
    } else {
        dndBus.toBefore = _y < top + height / 2;
    }
    // 插入目标占位符
    if (dndBus.toBefore) {
        if (dndBus.toItem.previousSibling === dndBus.separator) return;
        dndBus.toRoot.insertBefore(dndBus.separator, dndBus.toItem)
    } else {
        if (dndBus.toItem.nextSibling === dndBus.separator) return;
        dndBus.toRoot.insertBefore(dndBus.separator, dndBus.toItem.nextSibling);
    }
    emit('update', dndBus.detail);
}

// Start---
const handleDragStart = (e: DragEvent) => {
    if (!fromRoot.value || !e.dataTransfer) return;
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    const target = e.target as HTMLElement;
    dndBus.fromItem = target.classList.contains('dnd-item') ? target : target.closest('.dnd-item') as HTMLElement;

    nextTick(() => dndBus.fromItem?.classList.add('dragging'))
}
// Enter
const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const dndItem = target.closest('.dnd-item') as HTMLElement;
    // 忽略：不同组、相同元素、拖动元素
    if (!dndBus.fromRoot || !dndItem || dndBus.fromItem === dndItem || dndItem === dndBus.toItem) return;

    handlePlaceholder(e);

}
// Over
const handleDragOver = (e: DragEvent) => {
    // 不同组
    if (!dndBus.fromRoot) return;
    e.preventDefault();
    const target = e.target as HTMLElement;
    const dndItem = target.closest('.dnd-item') as HTMLElement;
    if (dndBus.fromItem === dndItem || !dndItem) return;
    handlePlaceholder(e);
}
// Leave
const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const dndItem = target.closest('.dnd-item') as HTMLElement;
    if (!dndItem || dndItem?.classList.contains('dnd-root')) {
        dndBus.separator.remove();
    }
}
// Drop
const handleDrop = (e: DragEvent) => {
    if (dndBus.fromItem && dndBus.fromItem.contains(dndBus.toItem)) return;
    e.preventDefault();
    const { from, to } = dndBus.detail;

    // 不能插入到自己的位置
    if (!dndBus.toItem || (from.index === to.index && from.root === to.root)) return;

    if (dndBus.toBefore) {
        dndBus.toRoot.insertBefore(dndBus.fromItem, dndBus.toItem)
    } else {
        dndBus.toRoot.insertBefore(dndBus.fromItem, dndBus.toItem.nextSibling);
    }
    // console.log('-from:', from);
    // console.log('-to:', to);
    // 操作数据
    //to.rootData.splice(to.index + 1, 0, from.itemData);
    //from.rootData.splice(from.index, 1);    
    
    
    emit('change', dndBus.detail);
    e.stopPropagation();
}
// End
const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    dndBus.fromItem?.classList.remove('dragging');
    dndBus.reset();
}

const handleMouseUp = () => dndBus.reset();
</script>

<template>
    <div ref="rootRef" class="dnd-root" :data-key="itemKey" @dragstart="handleDragStart" @dragenter="handleDragEnter"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop" @dragend="handleDragEnd"
        @mouseup="handleMouseUp">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.dnd-placeholder {
    position: relative;
    display: none;

    &.vertical::before,
    &.horizontal::before {
        content: '';
        background-color: blue;
        position: absolute;
        box-shadow: 0 0 5px blue;
        top: 0;
        left: 0;
        transform: translateY(-1px);
        border-radius: 2px;
    }

    &.vertical::before {
        width: 100%;
        height: 2px;
    }

    &.horizontal::before {
        width: 2px;
        height: 100%;
    }
}

.list-move {
    transition: transform .3s ease;
}

.list-enter-active,
.list-leave-active {
    transition: all .3s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>