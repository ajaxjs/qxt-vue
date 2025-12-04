import type { IItem } from './type';
// 拖拽事件总线
const dndBusMap = new Map<string, DndBus>();

class DndBus {
    dndName: string;
    listMap = new Map<any, any>();
    pathMap = new Map<any, number[]>();
    _from: IItem | null = null;
    _over: IItem | null = null;
    _separator: HTMLElement | null = null;
    index: number = -1;
    constructor(dndName: string) {
        this.dndName = dndName;
    }
    get from(): IItem | null {
        return this._from;
    }
    set from(item: HTMLElement | null) {
        this._from = item ? useIitemDom.call(this, item) : null;
    }
    get over(): IItem | null {
        return this._over;
    }
    set over(item: HTMLElement | null) {
        this._over = item ? useIitemDom.call(this, item) : null;
    }
    get separator() {
        if (!this._separator) {
            const isHori = this.over?.direction === 'horizontal';
            const inner = document.createElement('div');
            inner.classList.add('absolute', 'inset-0', 'bg-blue-300/60', 'rounded-sm', '-translate-y-1/2', 'pointer-events-none');
            inner.style = `${isHori ? 'width' : 'height'}: var(--separator-height, 4px);`;
            this._separator = document.createElement('div');
            this._separator.appendChild(inner);
            this._separator.classList.add('relative', isHori ? 'w-0' : 'h-0', 'pointer-events-none');
        }
        return this._separator;
    }
    removeSeparator() {
        this._separator?.remove();
    }

    reset() {
        this.from = null;
        this.over = null;
        this._separator?.remove();
    }
    destroy() {
        this.removeSeparator();
        this.reset();
        dndBusMap.delete(this.dndName);
    }
}


export function useDndBus(dndName: string) {
    if (!dndBusMap.has(dndName)) {
        dndBusMap.set(dndName, new DndBus(dndName));
    }
    return dndBusMap.get(dndName)!;
}

export function useIitemDom(this: DndBus, target: HTMLElement): IItem {
    const item = ((target.classList.contains('dnd-item') ? target : target.closest('.dnd-item'))) as HTMLElement;
    const root = target.closest('.dnd-root') as HTMLElement;
    const itemList = Array.from(root.children).filter((item) => item.classList.contains('dnd-item')) as HTMLElement[];
    const index = itemList.indexOf(item) || 0;
    const listId = root.getAttribute('list-id');
    const direction = getRootDir(root);
    const path = [...this.pathMap.get(listId) || [], index];
    const data = this.listMap.get(listId)?.[index];
    return { target, item, root, index, itemList, listId, direction, path, data };
}

// 获取根容器方向
const getRootDir = (dndRoot: HTMLElement) => {
    const computedStyle = getComputedStyle(dndRoot);
    const display = computedStyle.getPropertyValue('display');
    const direction = computedStyle.getPropertyValue('flex-direction');
    return display === 'flex' && direction === 'row' ? 'horizontal' : 'vertical';
}
