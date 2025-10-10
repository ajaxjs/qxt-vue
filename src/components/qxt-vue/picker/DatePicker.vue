<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button';
import DateView from './DateView.vue'
import type { ILifa, TDate } from './TDate'
//import PickerWrap from './PickerWrap.vue'
import Model from '../model/Model.vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    }
})
const visible = ref(false);
const dateViewRef = ref();
const currentDate = ref(props.modelValue)
const date = ref();

const emit = defineEmits(['update:modelValue', 'change', 'cancel']);

function onCancel() {
    emit('cancel');
    hide()
}

function onOk() {
    emit('update:modelValue', currentDate.value);
    hide()
}

function setLifa(lifa: ILifa) {
    dateViewRef.value.setLifa(lifa);
}

function show() {
    visible.value = true;
}

function hide() {
    visible.value = false;
}

function onChange(dt: TDate) {
    date.value = dt.toJson();
}
defineExpose({
    show,
    hide,
})
window.addEventListener('resize', (e) => {
    console.log('resize', e);
    
})
</script>

<template>
    <Model v-model="visible" class="min-w-[280px] w-full max-w-[480px] rounded-lg overflow-hidden">
        <div class="header flex bg-gray-100 p-1 text-gray-500">
            <Button variant="outline" @click="onCancel">取消</Button>
            <div class="flex-1"></div>
            <div class="lifa-group flex p-1 bg-gray-200">
                <div class="lifa-item" :class="{ 'active': date?.lifa === '公历' }" @click="setLifa('公历')">公历</div>
                <div class="lifa-item" :class="{ 'active': date?.lifa === '农历' }" @click="setLifa('农历')">农历</div>
            </div>
            <div class="flex-1"></div>
            <Button variant="outline" class="text-primary" @click="onOk">确定</Button>
        </div>
        <DateView ref="dateViewRef" v-model="currentDate" @change="onChange" />
    </Model>
</template>

<style lang="scss">
.lifa-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    border-radius: 5px;
    cursor: pointer;

    &.active {
        background-color: var(--primary);
        color: #fff;
    }
}
</style>