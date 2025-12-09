//type IData = { item: any; list: any[] }

// DndBus拖拽项
export type IItem = {
    dndName: string;
    rootId: string;
    gindex: number;
    index: number;
    root: HTMLElement;
    path: number[];
    item: HTMLElement;
    data: any;
    // siblings: HTMLElement[];

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
    to: {
        index: number;
        path: number[];
    }
    isBefore: boolean;
    isGoUp: boolean;
    isSameRoot: boolean;
    // fromData: IData;
    // toData: IData;
    // toPath: number[];
    // toIndex: number;
    // isBefore: boolean;
    // isUp: boolean;
}

export interface IDndProps {
    rootId: string;
    dndName: string;
    dndPath: number[];
    onChange: (result: IChangeResult) => void;
}

export interface IItemSlotProps {
    item: any;
}