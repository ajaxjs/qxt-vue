# DndSort 组件使用说明

## 组件介绍

DndSort 是一个基于 Vue 3 的树形结构拖拽排序组件，支持垂直和水平布局，可实现跨列表拖拽、自定义展开/折叠等功能。

## 组件特性

- 🔄 支持树形结构的拖拽排序
- 📐 支持垂直和水平布局
- 🎛️ 支持拖拽手柄
- 🔍 支持展开/折叠功能
- 🔗 支持跨列表拖拽（相同 dndName）
- 🎯 支持手动排序和自动排序
- 📱 响应式设计

## 组件结构

```
dnd-sort/
├── DndSort.vue       # 主组件
├── DndRoot.vue       # 根容器组件
├── DndItem.vue       # 拖拽项组件
├── dnd-hook.ts       # 拖拽事件总线和工具函数
├── dnd-item.ts       # 拖拽项核心逻辑
└── type.ts           # TypeScript 类型定义
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| v-model | Array | [] | 绑定的数据源 |
| dndName | string | 自动生成 | 拖拽组名称，相同名称的组件可以相互拖拽 |
| childKey | string | 'children' | 子元素的键名 |
| rootClass | string | '' | 根容器的 CSS 类名 |
| itemClass | string | '' | 拖拽项的 CSS 类名 |
| handleClass | string | '' | 拖拽手柄的 CSS 类名 |
| manualSort | boolean | false | 是否手动排序，为true时，通过`@change`事件手动排序。 |
| expand | boolean \| Function | true | 是否展开子项，可为布尔值或函数。函数接收 IExpendEvent 参数并返回布尔值 |

## 事件

| 事件名 | 参数类型 | 说明 |
|--------|----------|------|
| change | IChangeResult | 拖拽排序后触发，返回拖拽详情 |
| expand | IExpendResult | 展开/折叠状态改变时触发，返回展开详情 |

### IChangeResult 类型

```typescript
interface IChangeResult {
    from: IItem;       // 拖拽源
    over: IItem;       // 拖拽目标
    to: {
        index: number; // 目标索引
        path: number[]; // 目标路径
    };
    isBefore: boolean; // 是否放在目标元素之前
    isGoUp: boolean;   // 是否向上移动
    isSameRoot: boolean; // 是否在同一根容器内
}
```

### IExpendEvent 类型

```typescript
interface IExpendEvent {
    item: any;         // 当前项数据
    path: number[];    // 当前项在树中的路径
    rootId: string;    // 根容器 ID
    dndName: string;   // 拖拽组名称
}
```

### IExpendResult 类型

```typescript
interface IExpendResult extends IExpendEvent {
    expand: boolean;   // 展开状态
}
```

## 插槽

| 插槽名 | 作用域 | 说明 |
|--------|--------|------|
| default | { item, expand, path, rootId, dndName } | 自定义拖拽项内容 |

### 插槽参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| item | any | 当前拖拽项的数据 |
| expand | object | 参考下面说明 |
| path | number[] | 当前项在树中的路径 |
| rootId | string | 根容器 ID |
| dndName | string | 拖拽组名称 |

### expand 对象

```typescript
interface IExpend {
    get: () => boolean;      // 获取展开状态
    set: (expend: boolean) => void; // 设置展开状态
    toggle: () => boolean;   // 切换展开状态
}
```

## 使用示例

### 1. 基本树形结构拖拽

```vue
<template>
  <DndSort v-model="tree" expand dnd-name="mytree" root-class="my-root" @change="handleChange">
    <template #default="{ item, expand }">
      <div class="item p-2 border border-gray-300 rounded-md">
        <h3 class="text-lg font-bold">
          {{ item.title }}
          <button v-if="expand" @click="expand.toggle">
            {{ expand.get() ? '收起' : '展开' }}
          </button>
        </h3>
        <p class="text-sm text-gray-500">{{ item.description }}</p>
      </div>
    </template>
  </DndSort>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DndSort from './DndSort.vue'
import type { IChangeResult } from './type'

const tree = ref([
  { 
    id: 1, 
    title: '树级1', 
    children: [
      { id: '1-1', title: '项目 A1', description: '这是第一个可拖拽项目' },
      { id: '1-2', title: '项目 A2', description: '这是第二个可拖拽项目' }
    ]
  },
  { 
    id: 2, 
    title: '树级2', 
    children: [
      { id: '2-1', title: '项目 B1', description: '这是第三个可拖拽项目' }
    ]
  }
])

const handleChange = (detail: IChangeResult) => {
  console.log('拖拽详情:', detail)
}
</script>
```

### 2. 水平布局拖拽

```vue
<template>
  <DndSort v-model="list" root-class="flex border border-blue-200 rounded-md" item-class="p-1">
    <template #default="{ item }">
      <div class="item border border-gray-300 p-2 rounded-md">{{ item.title }}</div>
    </template>
  </DndSort>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DndSort from './DndSort.vue'

const list = ref([
  { id: '1', title: '项目 A1' },
  { id: '2', title: '项目 A2' },
  { id: '3', title: '项目 A3' }
])
</script>
```

### 3. 非响应式数据排序

```vue
<template>
  <DndSort v-model="planTree" manualSort @change="handleSort">
    <template #default="{ item }">
      <div class="item p-2 border border-gray-300 rounded-md">
        <h3 class="text-lg font-bold">{{ item.title }}</h3>
        <p class="text-sm text-gray-500">{{ item.description }}</p>
      </div>
    </template>
  </DndSort>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import DndSort from './DndSort.vue'
import type { IChangeResult } from './type'

const list = ref([
  { id: '1', title: '项目 A1', description: '这是第一个可拖拽项目' },
  { id: '2', title: '项目 A2', description: '这是第二个可拖拽项目' }
])

// 使用非响应式数据
const planTree = toRaw(list.value)

const handleSort = (detail: IChangeResult) => {
  const { from, over, to } = detail
  // 手动处理排序逻辑
  console.log('拖拽源:', from)
  console.log('拖拽目标:', over)
  console.log('目标位置:', to)
}
</script>
```

### 4. 自定义展开逻辑

```vue
<template>
  <DndSort v-model="tree" :expand="checkExpand" @change="handleChange">
    <template #default="{ item, expand }">
      <div class="item p-2 border border-gray-300 rounded-md">
        <h3 class="text-lg font-bold">
          {{ item.title }}
          <button v-if="expand" @click="expand.toggle">
            {{ expand.get() ? '收起' : '展开' }}
          </button>
        </h3>
      </div>
    </template>
  </DndSort>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DndSort from './DndSort.vue'
import type { IChangeResult, IExpendEvent } from './type'

const tree = ref([
  { id: 1, title: '树级1', children: [{ id: '1-1', title: '项目 A1' }] },
  { id: 2, title: '树级2', children: [{ id: '2-1', title: '项目 B1' }] },
  { id: 3, title: '树级3', children: [{ id: '3-1', title: '项目 C1' }] }
])

// 自定义展开逻辑：仅展开id为3的项
const checkExpand = (event: IExpendEvent) => {
  return event.item.id === 3
}

const handleChange = (detail: IChangeResult) => {
  console.log('拖拽详情:', detail)
}
</script>
```

### 5. 使用expand事件

```vue
<template>
  <div class="flex gap-3">
    <div class="w-2/3">
      <DndSort v-model="tree" expand dnd-name="mytree" root-class="my-root" 
               @change="handleChange" @expand="onExpand">
        <template #default="{ item, expand }">
          <div class="item p-2 border border-gray-300 rounded-md">
            <h3 class="text-lg font-bold">
              {{ item.title }}
              <button v-if="expand" @click="expand.toggle">
                {{ expand.get() ? '收起' : '展开' }}
              </button>
            </h3>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
          </div>
        </template>
      </DndSort>
    </div>
    <div class="w-1/3 overflow-auto">
      <pre>{{ expandMap }}</pre>
      <pre>{{ tree }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
import DndSort from './DndSort.vue'
import type { IChangeResult, IExpendResult } from './type'

// 树形结构数据
const tree = ref([
  { 
    id: 1, 
    title: '树级1', 
    children: [
      { id: '1-1', title: '项目 A1', description: '这是第一个可拖拽项目' },
      { id: '1-2', title: '项目 A2', description: '这是第二个可拖拽项目' }
    ]
  },
  { 
    id: 2, 
    title: '树级2', 
    children: [
      { id: '2-1', title: '项目 B1', description: '这是第三个可拖拽项目' }
    ]
  }
])

// 记录展开状态的映射
const expandMap = ref({})

// 拖拽排序事件处理
const handleChange = (detail: IChangeResult) => {
  console.log('拖拽详情:', detail)
}

// 展开/折叠事件处理
const onExpand = (detail: IExpendResult) => {
  console.log('展开详情:', detail)
  // 记录展开状态
  expandMap.value[detail.path.join('.')] = detail.expand
}
</script>
```

## CSS 类名

| 类名 | 说明 |
|------|------|
| .dnd-tree | 树容器 |
| .dnd-root | 根容器 |
| .dnd-item | 拖拽项 |
| .dnd-item-handle | 拖拽手柄 |
| .dnd-separator | 拖拽分隔线 |
| .dnd-separator.hori | 水平分隔线 |
| .dnd-separator.vert | 垂直分隔线 |
| .dnd-dragging | 拖拽中的项 |
| .is-dragging | 拖拽中的树 |

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

1. 确保数据源是响应式的（使用 ref 或 reactive），否则自动排序功能可能无法正常工作。
2. 跨列表拖拽时，确保两个组件的 dndName 相同。
3. 手动排序时，需要在 change 事件中自行处理数据的排序逻辑。
4. 自定义 expand 函数时，需要返回布尔值来控制展开/折叠状态。
5. 拖拽手柄是可选的，不设置时可拖拽整个项。

## 依赖

- Vue 3
- TypeScript

## 更新日志

### v1.1.0
- 新增 expand 事件，展开/折叠状态改变时触发
- 优化 expand 函数参数，提供更完整的上下文信息

### v1.0.0
- 初始版本发布
- 支持树形结构拖拽排序
- 支持水平和垂直布局
- 支持展开/折叠功能
- 支持跨列表拖拽

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT