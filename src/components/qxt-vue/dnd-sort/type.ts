
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
    manualSort?: boolean;
    rootClass?: string;
    itemClass?: string;
    handleClass?: string;
    expand?: boolean | ((item: any) => boolean);
    onChange: (result: IChangeResult) => void;
    onExpand: (detail: IExpendResult) => void;
}

type IExpend = undefined | {
    get: () => boolean,
    set: (expend: boolean) => void,
    toggle: () => boolean
};

export interface IItemSlotProps {
    item: any;
    path: number[];
    dndName: string;
    expand?: IExpend
}
// 展开事件参数
export type IExpendEvent = {
    item: any;
    path: number[];
    rootId: string;
    dndName: string;
}
export type IExpendResult = IExpendEvent & {
    expand: boolean;
}