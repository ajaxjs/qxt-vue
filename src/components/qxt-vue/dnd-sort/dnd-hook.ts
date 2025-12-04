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
    _separatorStyle: string = '';
    _separatorClass: string = '';
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
            //inner.classList.add('absolute', 'inset-0', 'bg-blue-300/60', 'rounded-sm', '-translate-y-1/2', 'pointer-events-none');
            inner.classList.add('inner');
            inner.style = this._separatorStyle || `border-radius:2px;background-color: var(--separator-color, #007bff);${isHori ? 'width' : 'height'}: var(--separator-height, 4px); transform: ${isHori ? 'translateX(-50%)' : 'translateY(-50%)'}`;
            this._separatorClass.split(' ').filter(vo => vo).forEach((item) => inner.classList.add(item));
            this._separator = document.createElement('div');
            this._separator.appendChild(inner);
            this._separator.classList.add('dnd-separator');
            this._separator.style = `position:relative;${isHori ? 'width' : 'height'}:0;z-index:9;pointer-events:none;`;
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
    const root = item.closest('.dnd-root') as HTMLElement;
    const itemList = Array.from(root.children).filter((item) => item.classList.contains('dnd-item')) as HTMLElement[];
    const index = itemList.indexOf(item) || 0;
    const listId = root.getAttribute('list-id');
    const direction = getRootDir(root);
    const reverse = getIsReverse(root);
    const path = [...this.pathMap.get(listId) || [], index];
    const data = this.listMap.get(listId)?.[index];
    return { target, item, root, index, itemList, listId, direction, reverse, path, data };
}
// 获取根容器方向
export const getRootDir = (dndRoot: HTMLElement) => {
    const [display, direction] = getCssVal(dndRoot, ['display', 'flex-direction']);
    return display === 'flex' && direction?.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
}
// 检查是否倒序
export const getIsReverse = (dndRoot: HTMLElement) => {
    return getCssVal(dndRoot, 'flex-direction').indexOf('-reverse') > 0;
}
// 获取css属性值
export const getCssVal = <T extends string | string[]>(
    el: HTMLElement,
    prop: T
): T extends string ? string : string[] => {
    const style = getComputedStyle(el);
    return (Array.isArray(prop)
        ? prop.map(p => style.getPropertyValue(p).trim())
        : style.getPropertyValue(prop).trim()) as any;
};
