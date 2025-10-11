# 表单组件 (Form & Field)

表单组件是一套用于快速构建表单界面的组件集合，提供了表单容器和各类表单项的封装，支持多种输入类型和灵活的布局配置。

安装命令：

```bash
npx qxt-vue add form
```



## 组件列表

| 组件名称 | 组件说明 |
|---------|---------|
| Form | 表单容器组件，用于组织和管理表单项 |
| Field | 表单项组件，支持多种输入类型 |

## 组件导入

```typescript
// 按需导入
import { Form, Field } from '@/components/qxt-vue/form'
```

## Form 组件

表单容器组件，用于组织表单项和按钮，支持内联布局和自定义内容。

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| fields | Array | [] | 表单字段配置数组 |
| btns | Array | [{ label: '提交', type: 'submit' }] | 表单按钮配置数组 |
| inline | Boolean | false | 是否使用内联布局 |
| inputInline | Boolean | false | 表单项是否使用内联布局 |
| class | String/Object/Array | - | 自定义样式类 |
| modelValue | Object | {} | 表单数据对象（支持 v-model） |

### 按钮配置 (btns) 项属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| label | String | - | 按钮文本 |
| type | String | 'submit' | 按钮类型 |
| variant | String | - | 按钮样式变体 |
| onClick | Function | - | 按钮点击事件处理函数 |
| ... | - | - | 支持其他 Button 组件的属性 |

### 插槽 (Slots)

| 插槽名 | 说明 |
|-------|------|
| prepend | 表单头部自定义内容 |
| append | 表单字段之后、按钮之前的自定义内容 |
| btns | 自定义按钮区域内容，使用后会覆盖默认按钮 |
| after | 表单底部自定义内容 |

## Field 组件

表单项组件，支持多种输入类型的封装，提供统一的样式和交互体验。

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| id | String | - | 表单项 ID |
| label | String | - | 表单项标签文本 |
| type | String | 'text' | 表单项类型，支持：text、textarea、select、radio、checkbox、switch、date、datetime 等 |
| name | String | - | 表单项名称，用于表单提交时的字段名 |
| placeholder | String | - | 输入框占位文本 |
| caption | String | - | 表单项说明文本 |
| inline | Boolean | false | 表单项是否使用内联布局 |
| labelWidth | String | - | 标签宽度，仅在内联布局下有效 |
| options | Array | [] | 选择项数组，用于 radio、checkbox、select 类型 |
| gap | Number | - | 标签与输入框之间的间距 |
| labelClass | String | - | 标签自定义样式类 |
| inputClass | String | - | 输入框自定义样式类 |
| orientation | String | - | 单选框/复选框的排列方向，可选 'horizontal' 或 'vertical' |
| switchIcon | String | - | 开关类型组件的图标样式，可选 'checkbox' 或 'switch'（仅 type='switch' 时有效） |
| modelValue | Any | - | 表单项值（支持 v-model） |
| ... | - | - | 支持其他对应输入组件的属性 |

### 支持的输入类型

| 类型 | 说明 | 对应的组件 |
|-----|------|-----------|
| text (默认) | 文本输入框 | Input |
| textarea | 多行文本输入框 | Textarea |
| select | 下拉选择器 | Select |
| radio | 单选框组 | RadioGroup |
| checkbox | 复选框组 | CheckboxGroup |
| switch | 开关组件 | Switch/Checkbox |
| date | 日期选择器 | DatePicker |
| datetime | 日期时间选择器 | DatePicker |

## 使用示例

### 基础用法

```vue
<template>
  <Form v-model="formData" :fields="fields">
    <template #prepend>
      <h3>用户信息表单</h3>
    </template>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@/components/qxt-vue/form'

const formData = ref({
  username: '',
  email: '',
  age: '',
})

const fields = [
  {
    label: '用户名',
    name: 'username',
    placeholder: '请输入用户名',
    required: true,
  },
  {
    label: '邮箱',
    name: 'email',
    type: 'email',
    placeholder: '请输入邮箱',
    required: true,
  },
  {
    label: '年龄',
    name: 'age',
    type: 'number',
    placeholder: '请输入年龄',
  },
]
</script>
```

### 自定义按钮

```vue
<template>
  <Form v-model="formData" :fields="fields">
    <template #btns>
      <Button @click="handleCancel">取消</Button>
      <Button type="submit" @click="handleSubmit">提交</Button>
    </template>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@/components/qxt-vue/form'
import { Button } from '@/components/ui/button'

const formData = ref({})
const fields = [/* 字段配置 */]

const handleCancel = () => {
  // 取消操作逻辑
}

const handleSubmit = () => {
  // 提交操作逻辑
}
</script>
```

### 内联布局

```vue
<template>
  <Form v-model="formData" :fields="fields" inline inputInline>
    <!-- 表单内容 -->
  </Form>
</template>
```

### 高级字段类型

```vue
<template>
  <Form v-model="formData" :fields="advancedFields">
    <!-- 表单内容 -->
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form } from '@/components/qxt-vue/form'

const formData = ref({
  gender: 'male',
  interests: [],
  birthday: '',
  remarks: '',
  receiveNotifications: true,
  termsAccepted: false,
})

const advancedFields = [
  {
    label: '性别',
    name: 'gender',
    type: 'radio',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    label: '兴趣爱好',
    name: 'interests',
    type: 'checkbox',
    options: [
      { label: '阅读', value: 'reading' },
      { label: '旅行', value: 'traveling' },
      { label: '运动', value: 'sports' },
    ],
  },
  {
    label: '出生日期',
    name: 'birthday',
    type: 'date',
    placeholder: '请选择出生日期',
  },
  {
    label: '接收通知',
    name: 'receiveNotifications',
    type: 'switch',
  },
  {
    label: '同意条款',
    name: 'termsAccepted',
    type: 'switch',
    switchIcon: 'checkbox', // 使用复选框样式的开关
  },
  {
    label: '备注',
    name: 'remarks',
    type: 'textarea',
    placeholder: '请输入备注信息',
    caption: '选填，最多输入200个字符',
  },
]
</script>
```

## 依赖说明

本组件依赖以下 shadcn-vue 组件：

```json
{
  "shadcn-vue": [
    "checkbox",
    "label",
    "select",
    "switch",
    "radio-group",
    "textarea",
    "button"
  ],
  "internal": [
    "qxt-vue/input",
    "qxt-vue/picker",
    "qxt-vue/select",
    "qxt-vue/radio-group",
    "qxt-vue/checkbox-group"
  ]
}
```

## 注意事项

1. 表单数据绑定使用 `v-model`，自动与 `modelValue` 同步
2. Field 组件会根据 `type` 属性自动选择对应的输入组件
3. 所有组件均支持响应式属性，可以根据数据动态更新
4. 使用自定义样式时，可以通过 `class`、`labelClass`、`inputClass` 等属性进行样式覆盖