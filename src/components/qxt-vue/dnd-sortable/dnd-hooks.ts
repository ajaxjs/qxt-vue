
export type IBus = Record<string, any>;
export type BusGlobal = Record<string, any>;

export class DndBus {
    _didName: string;
    _fromItem: HTMLElement | null = null;
    _toItem: HTMLElement | null = null;
    fromRoot: HTMLElement | null = null;
    toRoot: HTMLElement | null = null;
    toBefore: boolean = false;
    rootData: Map<HTMLElement, any> = new Map();
    itemData: Map<HTMLElement, any> = new Map();
    direction: 'horizontal' | 'vertical' = 'vertical';
    _separator: HTMLElement | null = null;
    constructor(GroupName: string) {
        this._didName = GroupName;
    }
    get isHori() {
        return this.direction === 'horizontal';
    }
    get separator() {
        if (!this._separator) {
            const inner = document.createElement('div');
            inner.classList.add('absolute', 'inset-0', 'bg-blue-300', 'rounded-sm', '-translate-y-1/2');
            inner.style = `${this.isHori ? 'width' : 'height'}: var(--separator-height, 4px);`;
            this._separator = document.createElement('div');
            this._separator.appendChild(inner);
            this._separator.classList.add('relative', this.isHori ? 'w-0' : 'h-0');
        }
        return this._separator;
    }
    get dndName() {
        return this._didName;
    }
    get fromItem() {
        return this._fromItem;
    }
    set fromItem(value: HTMLElement | null) {
        this._fromItem = value;
        this.fromRoot = value?.closest('.dnd-root') || null;
    }
    get fromIndex() {
        return this._fromItem && this.fromRoot ? Array.from(this.fromRoot.children).indexOf(this._fromItem) : -1;
    }
    get toItem() {
        return this._toItem;
    }
    set toItem(value: HTMLElement | null) {
        this._toItem = value;
        this.toRoot = value?.closest('.dnd-root') || null;
    }
    get toIndex() {
        return this._toItem && this.toRoot ? Array.from(this.toRoot.children).indexOf(this._toItem) : -1;
    }
    get fromRootData() {
        return this.fromRoot && this.rootData.get(this.fromRoot);
    }
    get toRootData() {
        return this.toRoot && this.rootData.get(this.toRoot);
    }
    get fromItemData() {
        return this.fromItem && this.itemData.get(this.fromItem);
    }
    get toItemData() {
        return this.toItem && this.itemData.get(this.toItem);
    }
    get detail() {
        const { fromRoot, toRoot,fromItem, toItem, fromIndex, toIndex, fromItemData, toItemData } = this;
        return {
            from: {
                root: fromRoot,
                index: fromIndex,
                data: fromItemData,
                item: fromItem,
            },
            to: {
                root: toRoot,
                index: toIndex,
                data: toItemData,
                item: toItem,
            },
        }
    }
    reset() {
        this.fromItem = null;
        this.toItem = null;
        this.fromRoot = null;
        this.toRoot = null;
        this.separator.remove();
    }
}

const DndBusInstance: BusGlobal = {};
export function useDndBus(GroupName: string) {
    if (!DndBusInstance[GroupName]) {
        DndBusInstance[GroupName] = new DndBus(GroupName);
    }
    return DndBusInstance[GroupName]
}

export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };

    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
    };

    return debounced as T & { cancel(): void };
}