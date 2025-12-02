
export type IBus = Record<string, any>;
export type BusGlobal = Record<string, any>;

export class DndBus {
    toBefore: boolean = false;
    fromRoot: HTMLElement | null = null;
    toRoot: HTMLElement | null = null;
    _didName: string;
    _fromItem: HTMLElement | null = null;
    _toItem: HTMLElement | null = null;
    _fromRootData: any[] = [];
    _toRootData: any[] = [];
    _fromIndex: number = -1;
    _toIndex: number = -1;
    _fromItemData: any = null;
    _toItemData: any = null;
    //dataMap: Map<string, any> = new Map();
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
            inner.classList.add('absolute', 'inset-0', 'bg-blue-300', 'rounded-sm', '-translate-y-1/2', 'pointer-events-none');
            inner.style = `${this.isHori ? 'width' : 'height'}: var(--separator-height, 4px);`;
            this._separator = document.createElement('div');
            this._separator.appendChild(inner);
            this._separator.classList.add('relative', this.isHori ? 'w-0' : 'h-0', 'pointer-events-none');
        }
        return this._separator;
    }
    get dndName() {
        return this._didName;
    }
    get fromList() {
        return this.fromRoot ? Array.from(this.fromRoot.children).filter((item) => item.classList.contains('dnd-item')) : [];
    }
    get fromItem() {
        return this._fromItem;
    }
    set fromItem(item: HTMLElement | null) {
        this._fromItem = item;
        this.fromRoot = item?.closest('.dnd-root') || null;
        this._fromIndex = this.fromIndex;
        this._fromRootData = this.fromRoot && this.rootData.get(this.fromRoot);
        this._fromItemData = item && this.itemData.get(item);
        // this._fromRootData = this.fromRoot?.dataset.key ? this.rootData.get(this.fromRoot.dataset.key) : null;
        // this._fromItemData = item?.dataset.key ? this.itemData.get(item.dataset.key) : null;
    }
    // Dom索引
    get fromIndex() {
        return this._fromItem ? this.fromList.indexOf(this._fromItem) : -1;
    }

    get toList() {
        return this.toRoot ? Array.from(this.toRoot.children).filter((item) => item.classList.contains('dnd-item')) : [];
    }
    get toItem() {
        return this._toItem;
    }
    set toItem(item: HTMLElement | null) {
        this._toItem = item;
        this.toRoot = item?.closest('.dnd-root') || null;
        this._toIndex = this.toBefore ? this.toIndex - 1 : this.toIndex;
        this._toRootData = this.toRoot && this.rootData.get(this.toRoot);
        this._toItemData = item && this.itemData.get(item);
        // this._toRootData = this.toRoot?.dataset.key ? this.rootData.get(this.toRoot.dataset.key) : null;
        // this._toItemData = item?.dataset.key ? this.itemData.get(item.dataset.key) : null;
    }
    // Dom索引
    get toIndex() {
        return this._toItem ? this.toList.indexOf(this._toItem) : -1;
    }
    // get fromRootData() {
    //     return this.fromRoot && this.rootData.get(this.fromRoot);
    // }
    // get toRootData() {
    //     return this.toRoot && this.rootData.get(this.toRoot);
    // }
    // get fromItemData() {
    //     return this.fromItem && this.itemData.get(this.fromItem);
    // }
    // get toItemData() {
    //     return this.toItem && this.itemData.get(this.toItem);
    // }
    get detail() {
        const { fromRoot, toRoot, fromItem, toItem, _fromIndex, _toIndex, _fromRootData, _toRootData, _fromItemData, _toItemData } = this;
        return {
            from: {
                rootData: _fromRootData,
                itemData: _fromItemData,
                root: fromRoot,
                index: _fromIndex,
                item: fromItem,
            },
            to: {
                rootData: _toRootData,
                itemData: _toItemData,
                root: toRoot,
                index: _toIndex,
                item: toItem,
            },
        }
    }
    reset() {
        this.fromItem = null;
        this.toItem = null;
        this.fromRoot = null;
        this.toRoot = null;
        this._fromIndex = -1;
        this._toIndex = -1;
        this._fromRootData = [];
        this._toRootData = [];
        this._fromItemData = null;
        this._toItemData = null;
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