<script setup lang="ts">
import { routes as navList } from '@/router'
/*
const nav = [
    {
        name: '首页',
        path: '/',
    },
    {
        name: '消息中心',
        path: '/message',
    },
    {
        name: '选择器',
        path: '/picker',
    },
];*/
</script>

<template>
    <div class="p-4">
        <div v-for="item in navList" :key="item.path">
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>