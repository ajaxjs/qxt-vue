<script setup lang="ts">
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/qxt-vue/input"
import { DatePicker } from "@/components/qxt-vue/picker"
import { Select } from "@/components/qxt-vue/select"
import { RadioGroup } from "@/components/qxt-vue/radio-group"
import { CheckboxGroup } from "@/components/qxt-vue/checkbox-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import { ref, computed } from "vue"

const props = defineProps({
    id: String,
    label: String,
    type: String,
    name: String,
    placeholder: String,
    caption: String,
    // 样式
    inline: Boolean,
    labelWidth: String,
    options: Array,
    gap: Number,
    labelClass: String,
    inputClass: String,
    // 单选框垂直方向
    orientation: String,
    // 切换图标（checkbox或switch）
    switchIcon: String,
})

const modelValue = defineModel<any>()

// 字段样式
const fieldStyle = computed(() => {
    const { labelWidth, gap } = props
    const style: any = {}
    if (labelWidth) {
        style['--label-width'] = labelWidth
    }
    if (gap) {
        style['--gap'] = 'calc(' + gap + ' * var(--spacing))'
    }
    return style;
})
// 字段类名
const fieldClass = computed(() => {
    return [
        props.inline ? 'field-inline' : 'field-block',
    ]
})
// 输入框属性
const inputAttrs = computed<any>(() => {
    const { id, type, name, placeholder, label, options, inline, orientation } = props
    const attrs: any = {
        id: id || name,
        type,
        name,
        placeholder,
        label,
        options,
    }
    if (['radio', 'checkbox'].includes(type!)) {
        attrs.orientation = orientation || (inline ? 'horizontal' : 'vertical')
    }

    return attrs
})

const inputClass = computed(() => {
    const { inline } = props
    const width = inline ? 'w-full' : ''
    return cn('input-item', width, props.inputClass)
})
const pickerRef = ref()
</script>

<template>
    <div class="field-item" :class="fieldClass" :style="fieldStyle">
        <div class="field-input gap-2">
            <Label :for="id || name" class="label" :class="labelClass">
                {{ label }}
            </Label>
            <!-- 日期时间选择器 -->
            <template v-if="['datetime', 'date'].includes(type!)">
                <Input :wrap-class="inputClass" v-bind="inputAttrs">
                <template #input>
                    <div class="input flex-1 flex items-center" :placeholder @click="pickerRef.show()">{{ modelValue }}
                    </div>
                </template>
                <template #after>
                    <Button variant="outline" @click="pickerRef.show()">选择</Button>
                </template>
                </Input>
                <DatePicker ref="pickerRef" v-model="modelValue" :type="type" v-bind="$attrs" />
            </template>
            <!-- 单选框 -->
            <RadioGroup v-else-if="type === 'radio'" v-model="modelValue" v-bind="inputAttrs" :class="inputClass" />
            <!--  -->
            <div v-else-if="type === 'switch'" :class="cn('flex items-center', inputClass)">
                <Checkbox v-if="switchIcon === 'checkbox'" v-model="modelValue" v-bind="inputAttrs" />
                <Switch v-else v-model="modelValue" v-bind="inputAttrs" />
                <label :for="id || name" class="text-sm text-gray-500 pl-2">{{ label }}</label>
            </div>
            <!-- 复选框 -->
            <CheckboxGroup v-else-if="type === 'checkbox'" v-model="modelValue" v-bind="inputAttrs"
                :class="inputClass" />
            <!-- 文本域 -->
            <Textarea v-else-if="type === 'textarea'" v-model="modelValue" v-bind="inputAttrs" :class="inputClass" />
            <!-- 选择器 -->
            <Select v-else-if="type === 'select'" v-model="modelValue" v-bind="inputAttrs" :class="inputClass" />
            <!-- 输入框 -->
            <Input v-else v-model="modelValue" v-bind="inputAttrs" :wrap-class="inputClass" />
        </div>
        <div v-if="caption" class="caption flex text-sm text-gray-500">
            <div class="cap-space"></div>
            <div class="flex-1">{{ caption }}</div>
        </div>
    </div>
</template>

<style lang="scss">
.field-item {
    --gap-default: calc(2 * var(--spacing));

    .caption {
        margin-top: var(--gap, var(--gap-default));
    }
}

.field-block {
    .label {
        margin-bottom: var(--gap, var(--gap-default));
    }
}

.field-inline {
    --label-label-default: 6em;

    .field-input {
        display: flex;
    }

    .cap-space,
    .label {
        width: var(--label-width, var(--label-label-default));
        justify-content: flex-end;
    }
}

div.input:empty:before {
    content: attr(placeholder);
    color: var(--muted-foreground);
}
</style>