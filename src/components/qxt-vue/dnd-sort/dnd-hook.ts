import type { IItem } from './type';
// 拖拽事件总线
const dndBusMap = new Map<string, DndBus>();

class DndBus {
    dndName: string;
    rootMap = new Map<any, HTMLElement>();  // 根节点映射+
    treeMap = new Map<any, any>();  // 树映射+
    // listMap = new Map<any, any>();
    pathMap = new Map<any, number[]>();
    _from: IItem | null = null;
    _over: IItem | null = null;
    _separator: HTMLElement | null = null;
    _separatorStyle: string = '';
    _separatorClass: string = '';
    index: number = -1;
    childKey: string = 'children';
    constructor(dndName: string) {
        this.dndName = dndName;
    }
    get from(): IItem | null {
        return this._from;
    }
    set from(item: HTMLElement | null) {
        this._from = item ? this.getItemResult(item) : null;
    }
    get over(): IItem | null {
        return this._over;
    }
    set over(item: HTMLElement | null) {
        this._over = item ? this.getItemResult(item) : null;
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
    getItemResult(target: HTMLElement): IItem {
        const item = ((target.classList.contains('dnd-item') ? target : target.closest('.dnd-item'))) as HTMLElement;
        const parent = item.closest('.dnd-root') as HTMLElement;
        const itemList = Array.from(parent.children).filter((item) => item.classList.contains('dnd-item')) as HTMLElement[];
        const index = itemList.indexOf(item) || 0;
        const listId = parent.getAttribute('list-id');
        const direction = getRootDir(parent);
        const reverse = getIsReverse(parent);

        const { path, root } = getTargetPath(item);
        const rootId = root.getAttribute('list-id') || '';
        const getData = () => this.getItemData(rootId, path);

        return { root, rootId, target, item, parent, index, itemList, listId, direction, reverse, path, getData };
    }
    // 根据路径获取当前数据项
    getItemData(rootId: string, path: number[]) {
        const { childKey } = this;
        const tree = this.treeMap.get(rootId);
        if (!tree) {
            return { item: null, list: null }
        }
        let item = null;
        let list = tree;
        try {
            path.forEach((index, i) => {
                if (i === path.length - 1) {
                    item = list[index];
                } else {
                    list = list[index][childKey];
                }
            });
        } catch (error) {
            console.error('获取数据项失败:', error, list, path);
            console.log('tree', tree);
            
        }
        return { item, list };
    }
    // 删除分隔线
    removeSeparator() {
        this._separator?.remove();
    }
    // 重置拖拽项
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

/**
 * 获取目标元素的路径
 * @param dndItem 目标元素
 * @returns 包含路径数组和根容器元素的对象
 */
export function getTargetPath(dndItem: HTMLElement) {
    let current = dndItem, path: number[] = [];
    while (current) {
        const parent = current.closest('.dnd-root') as HTMLElement;
        const isTop = parent.getAttribute('depth') == '0';
        const itemList = Array.from(parent.children).filter((item) => item.classList.contains('dnd-item')) as HTMLElement[];
        const index = itemList.findIndex((item) => item === current) || 0;
        path.unshift(index);
        if (isTop || !parent) {
            return { path, root: parent };
        }
        current = parent.closest('.dnd-item') as HTMLElement;
    }
    return { path: [], root: current };
}
/**
 * 获取最顶层的根容器
 * @param target 目标元素
 * @returns 最顶层的根容器元素
 */
export function getTopRoot(target: HTMLElement) {
    let current: HTMLElement | null = target;
    while (current) {
        const parent = current.parentElement as HTMLElement;
        const isRoot = parent.classList.contains('dnd-root');
        const isTop = Number(parent.getAttribute('depth')) === 0;
        if (isRoot && isTop) {
            return parent;
        }
        current = parent;
    }
    return null;
}

export function getGlobalIndex(dndItem: HTMLElement, dndTopRoot?: HTMLElement): number {
    const root = dndTopRoot || getTopRoot(dndItem);
    if (!root || !root.contains(dndItem)) return -1;

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                // 排除根节点本身
                if (node === root) return NodeFilter.FILTER_SKIP;
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let index = 0;
    let current = walker.nextNode() as HTMLElement | null;

    while (current) {
        if (current === dndItem) {
            return index;
        }
        index++;
        current = walker.nextNode() as HTMLElement | null;
    }

    return -1; // 理论上不会走到
}
