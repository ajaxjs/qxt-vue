# DropdownMenu 下拉菜单组件

## 组件介绍

DropdownMenu 是一个功能丰富的下拉菜单组件，支持菜单项分组、子菜单、快捷键显示等特性，可用于实现上下文菜单、操作菜单等交互场景。

## 组件结构

- `DropdownMenu`：主容器组件
- `DropdownMenuGroup`：菜单项分组组件
- `DropdownMenuItem`：单个菜单项组件
- `DropdownMenuSub`：子菜单组件

## 类型定义

```typescript
// 单个菜单项类型
export type TDropdownMenuItem = {
    label: string;              // 菜单项标签文本
    shortcut?: string;          // 快捷键文本（可选）
    submenu?: TDropdownMenu;    // 子菜单配置（可选）
    onClick?: (e: Event) => void; // 点击事件处理函数（可选）
    disabled?: boolean;         // 是否禁用（可选）
    [key: string]: any;         // 其他自定义属性
}

// 菜单项数组类型
export type TDropdownMenuItems = TDropdownMenuItem[]

// 下拉菜单类型
export type TDropdownMenu = {
    label?: string;                       // 菜单标签（可选）
    items: TDropdownMenuItems | TDropdownMenuItems[]; // 菜单项或菜单项数组
}

// 选中事件类型
export type TSelectedEvent = Event & {
    selected: TDropdownMenuItem; // 选中的菜单项数据
}
```

## 组件属性

### DropdownMenu 组件

| 属性名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| label | string | 否 | 菜单标题标签 |
| items | TDropdownMenuItems \| TDropdownMenuItems[] | 是 | 菜单项配置，可以是一维数组（普通菜单）或二维数组（分组菜单） |

### DropdownMenuItem 组件

| 属性名 | 类型 | 必填 | 说明 |
|-------|------|------|------|
| label | string | 是 | 菜单项文本 |
| shortcut | string | 否 | 快捷键文本，如 "Ctrl+A" |
| submenu | TDropdownMenu | 否 | 子菜单配置 |
| onClick | function | 否 | 点击事件处理函数 |
| disabled | boolean | 否 | 是否禁用该菜单项 |

## 事件

### DropdownMenu 组件

| 事件名 | 参数类型 | 说明 |
|-------|---------|------|
| selected | TSelectedEvent | 菜单项被选中时触发，事件对象包含选中的菜单项数据 |

## 插槽

### DropdownMenu 组件

| 插槽名 | 说明 |
|-------|------|
| default | 下拉菜单的触发器内容，通常是按钮或文本 |
| label | 自定义菜单标题内容，优先级高于 label 属性 |

## 使用示例

### 基础用法

```vue
<template>
  <DropdownMenu :items="menuItems" @selected="handleSelected">
    <button>打开菜单</button>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from '@/components/qxt-vue/dropdown-menu/DropdownMenu.vue'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

const menuItems: TDropdownMenuItems = [
  { label: '新建', shortcut: 'Ctrl+N' },
  { label: '打开', shortcut: 'Ctrl+O' },
  { label: '保存', shortcut: 'Ctrl+S' },
  { label: '退出', disabled: true }
]

function handleSelected(event) {
  console.log('选中的菜单项:', event.selected)
}
</script>
```

### 分组菜单

```vue
<template>
  <DropdownMenu :items="groupedItems" label="文件操作">
    <button>文件</button>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from '@/components/qxt-vue/dropdown-menu/DropdownMenu.vue'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

const groupedItems: (TDropdownMenuItems | TDropdownMenuItems[]) = [
  [
    { label: '新建', shortcut: 'Ctrl+N' },
    { label: '打开', shortcut: 'Ctrl+O' },
    { label: '保存', shortcut: 'Ctrl+S' }
  ],
  [
    { label: '复制', shortcut: 'Ctrl+C' },
    { label: '粘贴', shortcut: 'Ctrl+V' },
    { label: '剪切', shortcut: 'Ctrl+X' }
  ]
]
</script>
```

### 带自定义点击处理的菜单

```vue
<template>
  <DropdownMenu :items="actionItems">
    <button>操作</button>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from '@/components/qxt-vue/dropdown-menu/DropdownMenu.vue'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

const actionItems: TDropdownMenuItems = [
  { 
    label: '编辑', 
    onClick: (e) => {
      console.log('编辑操作')
      // 自定义处理逻辑
    }
  },
  { 
    label: '删除', 
    onClick: (e) => {
      console.log('删除操作')
      // 自定义处理逻辑
    }
  }
]
</script>
```

### 带自定义标签的菜单

```vue
<template>
  <DropdownMenu :items="menuItems">
    <button>菜单</button>
    <template #label>
      <span class="custom-label">自定义标题</span>
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from '@/components/qxt-vue/dropdown-menu/DropdownMenu.vue'
import type { TDropdownMenuItems } from '@/components/qxt-vue/dropdown-menu/type'

const menuItems: TDropdownMenuItems = [
  { label: '选项1' },
  { label: '选项2' }
]
</script>

<style scoped>
.custom-label {
  color: #3b82f6;
  font-weight: bold;
}
</style>
```

## 注意事项

1. 组件依赖于 `@/components/ui/dropdown-menu` 中的基础下拉菜单组件
2. 当菜单项配置了 `disabled: true` 时，点击事件不会触发
3. 菜单项可以通过 `[key: string]: any` 添加自定义属性，这些属性会被传递到事件对象中
4. 子菜单的层级不受限制，可以嵌套多级子菜单