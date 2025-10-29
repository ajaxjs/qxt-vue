# qxt-vue

qxt-vue 是一个基于 Vue 3 和 Tailwind CSS 的组件库，提供了一系列现代化的 UI 组件，帮助开发者快速构建美观且功能丰富的 Vue 应用。

## 可用组件

### UI 组件

以下是 qxt-vue 提供的标准 UI 组件：

- avatar
- button-group
- button
- checkbox
- dialog
- dropdown-menu
- field
- form
- input
- label
- radio-group
- select
- separator
- switch
- textarea
- toggle-group
- toggle

### 自定义组件

以下是 qxt-vue 提供的项目特定自定义组件：

- avatar
- button-group
- checkbox-group
- dialog
- dropdown-menu
- form
- input
- message
- model
- picker
- radio-group
- select

## 安装组件

使用 CLI 命令可以轻松安装所需的组件：

```bash
# 安装单个组件
npx qxt-vue@latest add button
npx qxt-vue@latest add input
npx qxt-vue@latest add dialog

# 安装多个组件
npx qxt-vue@latest add button input label
```

## 项目配置

项目使用 TypeScript，样式基于 Tailwind CSS，采用 New York 风格设计。

## 快速开始

1. 安装 qxt-vue CLI：
```bash
npm install -g qxt-vue-cli
```

2. 在你的 Vue 项目中添加组件：
```bash
npx qxt-vue@latest add <component-name>
```

3. 在组件中导入并使用：
```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <Button>点击按钮</Button>
</template>
```