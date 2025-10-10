// 待删-选项数据不固定
export type PickerItem = {
    label?: string;
    value?: string | number;
    // 是否禁用
    disabled?: boolean;
    [key: string]: any;
}
// 待删-选项数据不固定
export type PickerOption = PickerItem[];

export type IPickerScrollProps = {
    options: PickerOption;
    itemLabel?: string;
    itemValue?: string;
    // 对齐方式
    align?: 'center' | 'start' | 'end';
    // 前缀
    prefix?: string;
    // 后缀
    suffix?: string;
    // 选项高度
    itemHeight?: number;
    // 最大显示行数，推荐单数
    maxRow?: number;
}

export type IPickerViewProps = {
    rows: PickerOption[];
}

export type IDateViewProps = {
    // 当前选中的日期
    modelValue?: Date | string;
    // 开始年份
    startYear?: number;
    // 结束年份
    endYear?: number;
    // 格式化方式
    format?: string;
    // 显示模式，可选 'year-month-day' | 'year-month' | 'month-day'
    type?: 'date' | 'datetime' | 'time';
    // 对齐方式
    align?: 'center' | 'start' | 'end';
    // 选项高度
    itemHeight?: number;
    // 最大显示行数
    maxRow?: number;
}

export type IDatePickerProps = IDateViewProps & {
    // 是否禁用
    confirmText?: string;
}