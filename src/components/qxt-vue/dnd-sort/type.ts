
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
}

export interface IItemProps {
    rootId: string;
    dndName: string;
    dndPath: number[];
    manualSort?: boolean
    rootClass?: string;
    itemClass?: string;
    handleClass?: string;
    onChange: (result: IChangeResult) => void;
}

export interface IItemSlotProps {
    item: any;
    path: number[];
    dndName: string;
}