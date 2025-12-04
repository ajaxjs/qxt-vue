// DndBus拖拽项
export type IItem = {
    root: HTMLElement;
    target: HTMLElement;
    item: HTMLElement;
    path: number[];
    index: number;
    itemList: HTMLElement[];
    listId: string | null;
    direction: 'horizontal' | 'vertical';
}

export type IChangeResult = {
    from: IItem;
    over: IItem;
    toPath: number[];
    toIndex: number;
    isBefore: boolean;
    isUp: boolean;
}