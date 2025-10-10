<script setup lang="ts">
import { ref } from 'vue'
import { PickerView, DateView, DatePicker } from '@/components/qxt-vue/picker'
import type { PickerOption } from '@/components/qxt-vue/picker/type'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'


const mutiValue = ref(['val19', null, 'val29'])
// 农历 1993-05-10 16:25 (闰月)
const currentDate = ref('公历 1993-05-10 16:25')

const dataPicker = ref();



const buildOpts = (count: number) => new Array(count).fill(0).map((_, index) => ({
    label: `选项${index}`,
    value: `val${index}`,
}))

const optItem: PickerOption[] = [
    buildOpts(100),
    buildOpts(100),
    buildOpts(100),
]


</script>

<template>
    <div class="w-md max-w-full mx-auto p-4 flex flex-col gap-4">
        <div class="p-4 bg-white shadow-sm rounded-2xl">
            Picker选择器 - <span class="text-blue-500 font-bold">{{ mutiValue }}</span>
            <PickerView :rows="optItem" v-model="mutiValue" />
        </div>
        <div class="p-4 bg-white shadow-sm rounded-2xl">
            Picker日期选择器 - <span class="text-blue-500 font-bold">{{ currentDate }}</span>
    
            <DateView ref="dateView" v-model="currentDate" />
        </div>
        <div class="p-4 bg-white shadow-sm rounded-2xl">
            Picker日期选择器 - <span class="text-blue-500 font-bold">{{ currentDate }}</span>
            <Button @click="dataPicker.show()">打开日期选择器</Button>
            <DatePicker ref="dataPicker" v-model="currentDate" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>