import { nextTick } from 'vue';
import { useDndBus, getEventDom } from './dnd-hook';
import type { IDndProps } from './type';

export const useDndItem = (props: IDndProps, itemData: any) => {
    const dndBus = useDndBus(props.dndName);

    // 拖拽开始
    const handleDragStart = (e: DragEvent) => {
        const { target, dndItem, dndRoot } = getEventDom(e);
        if (!e.dataTransfer || target.classList.contains('dnd-root')) return;
        e.stopPropagation();
        e.dataTransfer.effectAllowed = 'move';
        dndBus.from = dndItem
        nextTick(() => dndItem.classList.add('dnd-dragging'));
        dndRoot.classList.add('is-dragging');
        console.log('1-Start:', '数据：',itemData.value);
    }
    // 拖拽进入
    const handleDragEnter = (e: DragEvent) => {
        const { dndItem } = getEventDom(e);
        // 防止重复触发
        if (!e.dataTransfer) return;
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        dndBus.over = dndItem;
        console.log('2-Enter:', dndBus.over);
    }
    const handleDragLeave = () => {
        dndBus.over = null;
        dndBus.index = -1;
    }

    const handleDragDrop = (e: DragEvent) => {
        const { dndItem } = getEventDom(e);
        e.stopPropagation();
        dndBus.over = dndItem;
        console.log('2-Drop:', dndBus.over);
    }
    // 拖拽结束
    const handleDragEnd = (e: DragEvent) => {
        const { dndItem, dndRoot } = getEventDom(e);
        dndItem.removeAttribute('draggable');
        dndItem.classList.remove('dnd-dragging');
        dndRoot.classList.remove('is-dragging');
        dndBus.reset();
    }

    // 句柄-启用拖拽
    const handleMouseDown = (e: MouseEvent) => {
        const { dndItem } = getEventDom(e);
        dndItem.setAttribute('draggable', 'true');
    }
    // 句柄-禁用拖拽
    const handleMouseUp = (e: MouseEvent) => {
        const { dndItem } = getEventDom(e);
        dndItem.removeAttribute('draggable');
    }
    return { handleMouseDown, handleMouseUp, handleDragStart, handleDragEnter, handleDragLeave, handleDragDrop, handleDragEnd };
}