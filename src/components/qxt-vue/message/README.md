# Message 消息组件

Message 组件是一个多功能的消息展示组件，用于显示聊天消息、系统通知等内容，支持多种消息类型和自定义样式。

## 特性

- 支持用户消息和系统通知两种模式
- 支持多种消息类型：文本、图片、音频、视频
- 支持自定义头像、昵称、时间戳
- 支持发送和接收两种消息方向
- 支持红点标记和自定义标记样式
- 支持 HTML 内容渲染
- 提供丰富的插槽用于自定义内容

## 使用方法

### 基本用法

```vue
<template>
  <!-- 接收的文本消息 -->
  <Message
    type="text"
    text="你好，这是一条消息"
    avatar="user-avatar.png"
    nickname="张三"
    stamp="12:30"
  />
  
  <!-- 发送的文本消息 -->
  <Message
    type="text"
    text="你好，这是我的回复"
    sent="true"
    stamp="12:31"
  />
</template>

<script setup>
import Message from '@/components/qxt-vue/message/Message.vue'
</script>
```

### 系统通知

```vue
<Message type="notify" :text="{ type: 'success', text: '欢迎加入聊天室' }" />
<Message type="notify" :text="{ type: 'error', text: '发送失败，请重试' }" />
<Message type="notify" :text="{ type: 'warning', text: '请注意隐私安全' }" />
<Message type="notify" :text="{ type: 'info', text: '系统将在5分钟后维护' }" />
```

### 多媒体消息

```vue
<!-- 图片消息 -->
<Message
  type="image"
  text="https://example.com/image.jpg"
  avatar="user-avatar.png"
  nickname="李四"
  stamp="12:32"
/>

<!-- 音频消息 -->
<Message
  type="audio"
  :text="{ src: 'https://example.com/audio.mp3', duration: 15.5 }"
  avatar="user-avatar.png"
  nickname="王五"
  stamp="12:33"
/>

<!-- 视频消息 -->
<Message
  type="video"
  :text="{ src: 'https://example.com/video.mp4', poster: 'https://example.com/poster.jpg' }"
  avatar="user-avatar.png"
  nickname="赵六"
  stamp="12:34"
/>
```

### 使用红点标记

```vue
<!-- 默认红色标记 -->
<Message
  type="text"
  text="这是一条带红点的消息"
  avatar="user-avatar.png"
  nickname="张三"
  dotted="true"
/>

<!-- 自定义标记样式（大蓝点） -->
<Message
  type="text"
  text="这是一条带自定义标记的消息"
  avatar="user-avatar.png"
  nickname="张三"
  dotted="bg-blue-500 size-3"
/>
```

### HTML 内容

```vue
<Message
  type="text"
  text="<strong>这是加粗文本</strong> 和 <em>斜体文本</em>"
  html="true"
  avatar="user-avatar.png"
  nickname="张三"
/>
```

### 使用插槽自定义内容

```vue
<Message
  type="text"
  text="这是一条消息"
  avatar="user-avatar.png"
  nickname="张三"
  stamp="12:30"
>
  <!-- 自定义头像 -->
  <template #avatar>
    <div class="custom-avatar">自定义头像</div>
  </template>
  
  <!-- 自定义昵称 -->
  <template #nickname>
    <div class="custom-nickname">自定义昵称</div>
  </template>
  
  <!-- 自定义文本内容 -->
  <template #text>
    <div class="custom-text">自定义文本内容</div>
  </template>
  
  <!-- 自定义时间戳 -->
  <template #stamp>
    <div class="custom-stamp">自定义时间戳</div>
  </template>
</Message>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| type | String | text | 消息类型，可选值：text, image, audio, video, notify |
| text | Any | - | 消息内容，根据 type 不同有不同的数据结构 |
| avatar | String | - | 头像 URL |
| nickname | String | - | 昵称 |
| stamp | String | - | 时间戳 |
| sent | Boolean | false | 是否为发送的消息 |
| dotted | Boolean/String | false | 红点标记，为 true 时显示默认红色标记，也可以传入自定义类名 |
| html | Boolean | false | 是否以 HTML 形式渲染文本内容 |
| avatarClass | Any | - | 头像自定义类名 |
| hideNickname | Boolean | false | 是否隐藏昵称 |
| hideStamp | Boolean | false | 是否隐藏时间戳 |

## 数据结构

### text 属性的数据结构

根据 type 不同，text 属性的数据结构也不同：

- **text 类型**：字符串
- **image 类型**：图片 URL 字符串
- **audio 类型**：对象 `{ src: String, duration: Number }`
- **video 类型**：对象 `{ src: String, poster: String }`
- **notify 类型**：对象 `{ type: String, text: String }`，其中 type 可选值：notify, error, success, warning, info

## 插槽

| 插槽名 | 说明 |
|-------|------|
| avatar | 自定义头像内容 |
| nickname | 自定义昵称内容 |
| text | 自定义文本内容 |
| stamp | 自定义时间戳内容 |

## 样式说明

组件使用 Tailwind CSS 进行样式管理，主要样式包括：

- 消息气泡背景色：发送消息为绿色 `#DCF8C6`，接收消息为白色 `#FFFFFF`
- 消息气泡带有小三角指向头像
- 支持通过 avatarClass 属性自定义头像样式
- 支持通过 dotted 属性自定义红点标记样式

## 注意事项

1. 使用 html 属性时请注意防止 XSS 攻击
2. 音频和视频消息需要浏览器支持相应的媒体格式
3. 图片消息点击后会通过 Dialog 组件展示大图
4. 自定义插槽的优先级高于对应的属性值