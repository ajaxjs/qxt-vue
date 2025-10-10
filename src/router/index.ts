import { createWebHashHistory, createRouter } from 'vue-router'

export const routes = [
    { path: '/', component: () => import('@/views/index.vue'), meta: { title: '首页' } },
    { path: '/message', component: () => import('@/views/message.vue'), meta: { title: '消息' } },
    { path: '/picker', component: () => import('@/views/picker.vue'), meta: { title: '选择器' } },
    { path: '/form', component: () => import('@/views/form.vue'), meta: { title: '表单' } },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router