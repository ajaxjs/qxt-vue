import { nextTick } from 'vue';
import { useDndBus, getEventDom, getIsBefore, getGlobalIndex, isSubset } from './dnd-hook';
import type { IItemProps, IItem } from './type';

export const useDndItem = (props: IItemProps, itemData: any) => {
    const dndBus = useDndBus(props.dndName);

    const buildItem = (item: HTMLElement, root: HTMLElement): IItem => {
        const { dndPath: path, dndName, rootId } = props;
        const data = itemData.value;
        const gindex = getGlobalIndex(dndBus.treeMap.get(rootId), itemData.value)
        const index = path[path.length - 1]!;
        //const siblings = Array.from(root.children).filter((item) => item.classList.contains('dnd-item')) as HTMLElement[];
        //const index = siblings.indexOf(item);
        return { item, root, data, path, dndName, rootId, gindex, index }
    }
    //console.log('-------index: ',dndBus.index);

    // 拖拽开始
    const handleDragStart = (e: DragEvent) => {
        if (!e.dataTransfer) return;
        const eventDom = getEventDom(e);
        const { dndItem, dndRoot } = eventDom;
        e.stopPropagation();
        e.dataTransfer.effectAllowed = 'move';
        dndItem.closest('.dnd-tree')?.classList.add('is-dragging')
        // 构建拖拽项
        dndBus.from = buildItem(dndItem, dndRoot);
        nextTick(() => dndItem.classList.add('dnd-dragging'));
        //console.log('1-Start:', '数据：', dndBus.from);

    }
    // 拖拽进入
    const handleDragEnter = (e: DragEvent) => {
        const { dndItem, dndRoot } = getEventDom(e);
        // (防止重复触发|from不存在非同组)
        if (!e.dataTransfer || !dndBus.from) return;
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.effectAllowed = 'move';
        dndBus.over = buildItem(dndItem, dndRoot);
        //console.log('2-Enter:', dndBus.from);
    }
    // 拖拽悬停
    let isBefore = false;
    const handleDragOver = (e: DragEvent) => {
        // 非同组
        if (!e.dataTransfer || !dndBus.from) return;
        const { dndItem, dndRoot } = getEventDom(e);
        dndBus.over = buildItem(dndItem, dndRoot);
        // 自身，或子集
        if (dndBus.from.item === dndItem || isSubset(dndBus.from.item, dndBus.over.item)) {
            dndBus.removeSeparator();
            return;
        }

        e.dataTransfer.effectAllowed = 'move';
        e.preventDefault();
        e.stopPropagation();
        const before = getIsBefore(e);
        if (isBefore === before) {
            return;
        }
        isBefore = before;
        // 插入分隔符
        if (isBefore) {
            dndItem.before(dndBus.getSeparator());
        } else {
            dndItem.after(dndBus.getSeparator());
        }
    }
    // 拖拽离开
    const handleDragLeave = () => {
        // 非同组
        //if (!dndBus.from) return;
    }
    // 拖拽放下
    const handleDragDrop = (e: DragEvent) => {
        const { target, dndItem, dndRoot } = getEventDom(e);
        e.stopPropagation();
        if (!dndBus.from) {
            return;
        }
        if (target.classList.contains('dnd-root')) {
            // TODO: 处理拖入到根元素的情况
            return;
        }

        dndBus.over = buildItem(dndItem, dndRoot);
        const { from, over } = dndBus;
        const isSameRoot = from.root === over.root;
        const isBefore = getIsBefore(e)
        const isGoUp = from.gindex > over.gindex;
        // 计算目标索引
        let toIndex = over.index;
        if (isSameRoot) {
            toIndex += (isGoUp ? (isBefore ? 0 : 1) : (isBefore ? -1 : 0));
        } else {
            toIndex += (isBefore ? 0 : 1)
        }
        const toPath = [...over.path.slice(0, -1), toIndex];
        const detail = {
            from,
            over,
            to: { index: toIndex, path: toPath },
            isSameRoot,
            isBefore,
            isGoUp,
        };
        // 无变化 不触发change事件
        if (isSameRoot && toIndex === from.index) {
            dndBus.reset();
            return;
        }
        // 交换拖拽项在目标列表中的位置
        console.log(props.manualSort);
        
        if (!props.manualSort) {
            const fromList = dndBus.getSibList(from);
            const toList = dndBus.getSibList(over);
            fromList.splice(from.index, 1);
            toList.splice(toIndex, 0, from.data);
        }
        // 触发change事件
        props.onChange(detail);
        dndBus.reset();
    }
    // 拖拽结束
    const handleDragEnd = () => {
        //const { dndItem, dndRoot } = getEventDom(e);
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
    return {
        handleMouseDown,
        handleMouseUp,
        handleDragStart,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDragDrop,
        handleDragEnd
    };
}

export const useItemAttrs = (props: IItemProps, options?: any) => {
    const { rootId, dndName, dndPath, rootClass, itemClass, manualSort, onChange } = props;
    return {
        rootId,
        dndName,
        dndPath,
        rootClass,
        itemClass,
        manualSort,
        onChange,
        ...options,
    }
}