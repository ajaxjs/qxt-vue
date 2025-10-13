<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Message } from '@/components/qxt-vue/message'
//import type { Message as MessageType } from './qxt-vue/message/types'
// 以下代码展示了 message 的类型设置方式，`message` 是一个 ref，其值为 MessageType 数组
// 当前代码存在语法错误，缺少逗号分隔数组元素，下面进行修正
const message = ref([
  {
    type: 'message',
    text: 'hello world',
    send: true,
    avatar: 'https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/avatar/random/216.png',
    nickname: '客户1',
    dotted: true,

  },
  {
    type: 'notify',
    text: { type: 'notify', text: '这是一个通知信息！' },
  },
  {
    type: 'notify',
    text: { type: 'error', text: '这是一个错误信息！+' },
  },
  {
    type: 'image',
    text: 'https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/kefu/202509/68ce5b95eb15f.png',
    avatar: 'https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/avatar/random/216.png',
    nickname: '客户1',
    dotted: 'bg-blue-500 size-3',
    stamp: '2025-09-20 10:00:00'
  },
  {
    type: 'audio',
    text: { "src": "https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/kefu/audio/68d10583c43c0.wav", "duration": 5.89 },
    avatar: 'https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/avatar/random/216.png',
    nickname: '客户1'
  },
  {
    type: 'video',
    text: { "src": "https://cloud.video.taobao.com//play/u/14547989/p/2/e/6/t/1/259641289036.mp4", "poster": "https://shop2020-1251134852.cos.accelerate.myqcloud.com/goods/202004/1586945341560447.jpg" },
    avatar: 'https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/avatar/random/216.png',
    nickname: '客户1'
  },
  {
    type: 'message',
    text: '秒是国际单位制中时间的基本单位，符号是s。 有时也会借用英文缩写标示为sec，惟sec于正式文书及学术上应避免使用（应直接使用s）。 秒在英文里的原始词义是计算小时的六十分',
    send: true,
    avatar: 'https://crm-1251134852.cos.ap-guangzhou.myqcloud.com/avatar/random/216.png',
    nickname: '客户1'

  },
]);
</script>

<template>
  <div class="flex flex-col gap-4 p-5 max-w-md m-auto bg-gray-200">
    <Message v-for="item in message" v-bind="item" avatar-class="size-10 rounded-lg"></Message>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
