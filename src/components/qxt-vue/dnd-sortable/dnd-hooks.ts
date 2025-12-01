
export type IBus = Record<string, any>;
export type BusGlobal = Record<string, any>;

export class DndBus {
    _didName: string;
    _fromItem: HTMLElement | null = null;
    _toItem: HTMLElement | null = null;
    fromRoot: HTMLElement | null = null;
    toRoot: HTMLElement | null = null;
    constructor(GroupName: string) {
        this._didName = GroupName;
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
}

const DndBusInstance: BusGlobal = {};
export function useDndBus(GroupName: string) {
    if (!DndBusInstance[GroupName]) {
        DndBusInstance[GroupName] = new DndBus(GroupName);
    }
    return DndBusInstance[GroupName]
}