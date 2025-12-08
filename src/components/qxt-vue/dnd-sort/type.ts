type IData = { item: any; list: any[] }

// DndBus拖拽项
export type IItem = {
    root: HTMLElement;
    item: HTMLElement;
    //parent: HTMLElement;
    //target: HTMLElement;
    // rootId: string;
    // data: any;
    // dataList: any[] | null;
    // path: number[];
    // index: number;
    // itemList: HTMLElement[];
    // listId: string | null;
    // direction: 'horizontal' | 'vertical';
    // reverse: boolean;
    // getData: () => IData;
}

export type IChangeResult = {
    from: IItem;
    over: IItem;
    fromData: IData;
    toData: IData;
    toPath: number[];
    toIndex: number;
    isBefore: boolean;
    isUp: boolean;
}

export interface IDndProps {
    dndName: string;
    dndPath: number[];
}

export interface IItemSlotProps {
    item: any;
}