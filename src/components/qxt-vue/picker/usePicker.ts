//{ startYear = 1900, endYear = 2100, format = 'lifa YYYY-MM-DD HH:mm leap', type = 'datetime' }
import type { PickerOption } from './type';
import { TDate } from './TDate';

export function buildYears(startYear: number, endYear: number) {
    const years: PickerOption = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push({
            name: 'year',
            label: year.toString() + '年',
            value: year,
        });
    }
    return years;
}

export function buildMonth(date: TDate) {
    const months: PickerOption = [];
    for (let i = 1; i <= 12; i++) {
        const no: string = date.lifa === '农历' ? date.toChinaMonth(i)??'' : i.toString().padStart(2, '0') + '月';
        months.push({
            name: 'month',
            label: no,
            value: i,
        });
        if (date.lifa === '农历' && i === date.leapMonth()) {
            months.push({
                name: 'month',
                label: '闰' + no,
                value: -i,
            });
        }
    }
    return months;
}
export function buildDays(date: TDate) {
    const days: PickerOption = [];
    for (let i = 1; i <= date.getMonthDays(); i++) {
        const label = date.lifa === '农历' ? date.toChinaDay(i)??'' : i.toString().padStart(2, '0') + '日';
        days.push({
            name: 'day',
            label,
            value: i,
        });
    }
    return days;
}

export function buildHours() {
    const hours: PickerOption = [];
    for (let i = 0; i < 24; i++) {
        hours.push({
            name: 'hour',
            label: i.toString().padStart(2, '0') + '时',
            value: i,
        });
    }
    return hours;
}
export function buildMinutes() {
    const minutes: PickerOption = [];
    for (let i = 0; i < 60; i++) {
        minutes.push({
            name: 'minute',
            label: i.toString().padStart(2, '0') + '分',
            value: i,
        });
    }
    return minutes;
}

export function buildSeconds() {
    const seconds: PickerOption = [];
    for (let i = 0; i < 60; i++) {
        seconds.push({
            name: 'second',
            label: i.toString().padStart(2, '0') + '秒',
            value: i,
        });
    }
    return seconds;
}
