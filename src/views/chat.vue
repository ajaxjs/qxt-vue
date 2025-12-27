<script setup lang="ts">
import { ref } from 'vue'
import { ChatInput } from '@/components/qxt-vue/chat'
const text = ref('')
const type = ref()
</script>

<template>
    <CardBox title="Field" body-class="space-y-4">
        <div class="p-2">
            <ChatInput v-model="text" v-model:type="type" placeholder="请输入" />
            {{ type }}-{{ text }}
        </div>
    </CardBox>
</template>

<style lang="scss" scoped>

</style>