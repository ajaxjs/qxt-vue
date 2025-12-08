import type { IItem } from './type';
// 拖拽事件总线
const dndBusMap = new Map<string, DndBus>();
// 拖拽事件总线类
class DndBus {
    dndName: string;
    _from: IItem | null = null;
    _over: IItem | null = null;
    _separator: HTMLElement | null = null;
    index: number = -1;
    childKey: string = 'children';
    constructor(dndName: string) {
        this.dndName = dndName;
    }
    get from(): IItem | null {
        return this._from;
    }
    set from(item: HTMLElement | null) {
        this._from = item ? this._getItemResult(item) : null;
    }
    get over(): IItem | null {
        return this._over;
    }
    set over(item: HTMLElement | null) {
        this._over = item ? this._getItemResult(item) : null;
    }
    private _getItemResult(item: HTMLElement): IItem {
        const root = item.closest('.dnd-root') as HTMLElement;
        return {
            root,
            item,
        }
    }
    reset() {
        this.from = null;
        this.over = null;
        this.index = -1;
        this._from?.item.classList.remove('dnd-dragging');
    }
}

export function useDndBus(dndName: string) {
    if (!dndBusMap.has(dndName)) {
        dndBusMap.set(dndName, new DndBus(dndName));
    }
    return dndBusMap.get(dndName)!;
}

/**
 * 获取事件触发的元素
 * @param e 鼠标事件对象
 * @returns 包含目标元素、dnd-item元素、dnd-root元素和获取句柄元素的函数的对象
 */
export const getEventDom = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dndItem = target.classList.contains('dnd-item') ? target : target.closest('.dnd-item') as HTMLElement;
    const dndRoot = target.closest('.dnd-root') as HTMLElement;
    const getHandle = () => Array.from(dndItem.children).find((item) => item.classList.contains('dnd-item-handle')) as HTMLElement;
    return { target, dndItem, dndRoot, getHandle };
}
