<script setup lang="ts">
import { ref, reactive } from 'vue';
import PickerScroll from './PickerScroll.vue';
import type { PickerItem, IDateViewProps } from './type.ts';
import { TDate } from './TDate.ts';
import type { ILifa } from './TDate.ts';
import { buildYears, buildMonth, buildDays, buildHours, buildMinutes, buildSeconds } from './usePicker.ts';

const { startYear = 1900, endYear = 2100, format = 'lifa YYYY-MM-DD HH:mm leap' } = defineProps<IDateViewProps>();
const emit = defineEmits(['update:modelValue', 'change']);
const columns = ref()
const dateValue = defineModel<string>();
const date = reactive(new TDate(dateValue.value, format));
const dateArr = date.toArray().map((vo: any) => vo.leap ? -vo.int : vo.int);

function buildDateColumn() {
    const { fkey } = date.toJson();
    return fkey!.map(key => {
        if (['YY', 'YYYY'].includes(key)) {
            return buildYears(startYear, endYear);
        } else if (['MM', 'M'].includes(key)) {
            return buildMonth(date as TDate);
        } else if (['DD', 'D'].includes(key)) {
            return buildDays(date as TDate);
        } else if (['HH', 'H'].includes(key)) {
            return buildHours();
        } else if (['mm', 'm'].includes(key)) {
            return buildMinutes();
        } else if (['ss', 's'].includes(key)) {
            return buildSeconds();
        }
    }).filter(vo => vo);
}
columns.value = buildDateColumn();


function emitValue() {
    const dataStr = date.toString();
    emit('update:modelValue', dataStr);
    emit('change', date);
}
emitValue()

// 日期选择器值改变事件
function onChange(index: number, item: PickerItem) {
    const list = date.toArray();
    const { mkey } = list[index];
    if (mkey == 'year') {
        const leap = date.leapMonth();
        date.setYear(item.value as number);
        if (date.lifa == '农历' && leap !== date.leapMonth()) {
            const colKey = list.findIndex((vo: any) => vo.mkey == 'month');
            columns.value[colKey] = buildMonth(date as TDate);
        }
    } else if (mkey == 'month') {
        date.setMonth(item.value as number);
        const colKey = list.findIndex((vo: any) => vo.mkey == 'day');
        columns.value[colKey] = buildDays(date as TDate);
    }else if (mkey == 'day') {
        date.setDay(item.value as number);
    }else if (mkey == 'hour') {
        date.setHour(item.value as number);
    }else if (mkey == 'minute') {
        date.setMinute(item.value as number);
    }else if (mkey == 'second') {
        date.setSecond(item.value as number);
    }
    emitValue()
    console.log(index, item);
    
}

function setLifa(lifa: ILifa) {
    date.setLifa(lifa);
    emitValue();
    columns.value = buildDateColumn();
}

function setDate(dt: TDate) {
    date.setDate(dt);
    emitValue();
    columns.value = buildDateColumn();
}

defineExpose({
    date,
    setLifa,
    setDate,
})

</script>

<template>
    <div class="flex">
        <PickerScroll v-model="dateArr[index]" v-for="(column, index) in columns" :key="index" :options="column!"
            @change="(item) => onChange(index, item)" class="flex-1" />
    </div>
</template>

<style lang="scss" scoped></style>