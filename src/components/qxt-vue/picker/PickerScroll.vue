<script setup lang="ts">
import { onMounted, computed, useTemplateRef, onUnmounted, watch, nextTick } from 'vue'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import type { IPickerScrollProps } from './type'

BScroll.use(Wheel)

const viewRef = useTemplateRef('bs-wrapper')

// 设置默认Props
const { itemHeight = 44, maxRow = 5, options = [], align = 'center', itemLabel = 'label', itemValue = 'value' } = defineProps<IPickerScrollProps>();

const emit = defineEmits(['change'])
// 模型
const selectedValue = defineModel();
// 计算滚动样式
const wrapStyle = computed(() => ({
    '--item-height': `${itemHeight}px`,
    '--max-cols': maxRow,
    '--mask-height': `${Math.floor(maxRow / 2) * itemHeight}px`,
    height: `${itemHeight * maxRow}px`,
    padding: `${Math.floor(maxRow / 2) * itemHeight}px 0`
}))
const alignType = {
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end',
}

// 选项改变事件
const onWheelIndexChanged = (index: number) => {
    const item = options[index]
    selectedValue.value = item?.[itemValue];
    emit('change', item)
}

let bs: BScroll;
onMounted(() => {
    const selectedIndex = options.findIndex(item => item[itemValue] === selectedValue.value)
    bs = new BScroll(viewRef.value!, {
        wheel: {
            wheelWrapperClass: 'picker-scroll-column',
            wheelItemClass: 'picker-scroll-item',
            wheelDisabledItemClass: 'disabled',
            selectedIndex: selectedIndex >= 0 ? selectedIndex : 0,
        },
        useTransition: false,
        probeType: 3
    })
    bs.on('wheelIndexChanged', onWheelIndexChanged)
    if (selectedValue.value === void 0 || selectedValue.value === null) {
        onWheelIndexChanged(bs.getSelectedIndex())
    }
})

watch(()=>options, () => {
    nextTick(()=>bs.refresh())
})

onUnmounted(() => {
    bs.destroy()
})

defineExpose({
    destroy: () => bs.destroy(),
})
</script>

<template>
    <div ref="bs-wrapper" class="picker-scroll select-none" :style="wrapStyle">
        <div class="picker-scroll-column">
            <div v-for="(item, i) in options" :key="i" class="picker-scroll-item flex items-center"
                :class="[{ 'disabled': item.disabled }, alignType[align]]" :style="{ height: `${itemHeight}px` }">
                <div>{{ item[itemLabel] }}</div>
            </div>
        </div>
        <div class="mask-top"></div>
        <div class="mask-bottom"></div>
    </div>
</template>

<style lang="scss" scoped>
.picker-scroll {
    position: relative;
    overflow: hidden;
    max-height: calc(var(--item-height) * var(--max-cols));
}

.picker-scroll-item {
    cursor: pointer;

    &.disabled {
        cursor: not-allowed;
        color: #CCC;
    }
}

.mask-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--mask-height);
    border-bottom: 1px solid rgba($color: #CCC, $alpha: 0.5);
    background: linear-gradient(180deg, rgba($color: #fff, $alpha: 0.6) 0%, rgba($color: #fff, $alpha: 0) 100%);
    pointer-events: none;
}

.mask-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--mask-height);
    border-top: 1px solid rgba($color: #CCC, $alpha: 0.5);
    background: linear-gradient(0deg, rgba($color: #fff, $alpha: 0.6) 0%, rgba($color: #fff, $alpha: 0) 100%);
    pointer-events: none;
}
</style>