import type { IItem } from './type';
// 拖拽事件总线
const dndBusMap = new Map<string, DndBus>();


// 拖拽事件总线类
class DndBus {
    dndName: string;
    treeMap: Map<string, any> = new Map();
    _from: IItem | null = null;
    _over: IItem | null = null;
    _separator: HTMLElement | null = null;
    childKey: string = 'children';
    constructor(dndName: string) {
        this.dndName = dndName;
    }
    get from(): IItem | null {
        return this._from;
    }
    set from(item: IItem | null) {
        this._from = item;
    }
    get over(): IItem | null {
        return this._over;
    }
    set over(item: IItem | null) {
        this._over = item;
    }
    getSeparator(): HTMLElement {
        if (!this._separator) {
            this._separator = document.createElement('div');
            this._separator.classList.add('dnd-separator');
        }
        return this._separator;
    }
    removeSeparator() {
        if (this._separator) {
            this._separator.remove();
            this._separator = null;
        }
    }
    // 获取Item同级列表
    getSibList(item: IItem) {
        const { path, rootId } = item
        const tree = this.treeMap.get(rootId);

        let list = tree;
        for (const index of path.slice(0, -1)) {
            list = list[index][this.childKey];
        }
        return list;
    }
    reset() {
        const { from, over } = this;
        if (from) {
            from.item.removeAttribute('draggable');
            from.item.classList.remove('dnd-dragging');
            from.item.closest('.dnd-tree')?.classList.remove('is-dragging');
        }
        if (over) {
            over.item?.closest('.dnd-tree')?.classList.remove('is-dragging');
        }
        this.removeSeparator();
        this._from = null;
        this._over = null;
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
// 获取根容器方向
export const getRootDir = (dndRoot: HTMLElement) => {
    const [display, direction] = getCssVal(dndRoot, ['display', 'flex-direction']);
    return display === 'flex' && direction?.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
}
// 检查是否倒序
export const getIsReverse = (dndRoot: HTMLElement) => {
    return getCssVal(dndRoot, 'flex-direction').indexOf('-reverse') > 0;
}
/**
 * 是否悬停在元素上方
 * @param e 拖拽事件对象
 * @returns {boolean}
 */
export const getIsBefore = (e: DragEvent): boolean => {
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
/**
 * 获取元素在树中的全局索引
 * @param tree 树结构数组
 * @param item 目标元素
 * @param childKey 子元素键名，默认"children"
 * @returns 全局索引，未找到返回-1
 */
export function getGlobalIndex(tree: any[], item: any, childKey: string = "children"): number {
    let index = 0;
    const dfs = (nodes: any[]): boolean => {
        for (const node of nodes) {
            if (node === item) return true;
            index++;
            if (node[childKey]?.length) {
                if (dfs(node[childKey])) return true;
            }
        }
        return false;
    };
    dfs(tree);
    return index;
}

// 判断是否为子元素
export function isSubset(root: HTMLElement, item: HTMLElement) {
    // 排除自身（如需包含自身，可去掉这行）
    if (item === root) return false;

    let currentNode = item.parentNode;
    // 向上遍历父节点，直到根节点
    while (currentNode) {
        if (currentNode === root) {
            return true;
        }
        currentNode = currentNode.parentNode;
    }
    return false;
}