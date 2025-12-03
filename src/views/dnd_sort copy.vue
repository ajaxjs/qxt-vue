<script setup lang="ts">
import { ref, toRaw } from 'vue';
import DndRoot from '@/components/qxt-vue/dnd-sortable/DndRoot.vue';
import DndItem from '@/components/qxt-vue/dnd-sortable/DndItem.vue';
import DndSort from '@/components/qxt-vue/dnd-sortable/DndSort.vue';



// DndRoot组件引用
const dndRoot1 = ref();
const dndRoot2 = ref();
const dndRoot3 = ref();

// 第一个列表数据
const list1 = ref([
    { id: '1', title: '项目 1', description: '这是第一个可拖拽项目' },
    { id: '2', title: '项目 2', description: '这是第二个可拖拽项目' },
    { id: '3', title: '项目 3', description: '这是第三个可拖拽项目' },
    { id: '4', title: '项目 4', description: '这是第四个可拖拽项目' },
    { id: '5', title: '项目 5', description: '这是第五个可拖拽项目' },
]);

// 第二个列表数据
const list2 = ref([
    { id: '6', title: '项目 6', description: '这是第六个可拖拽项目' },
    { id: '7', title: '项目 7', description: '这是第七个可拖拽项目' },
    { id: '8', title: '项目 8', description: '这是第八个可拖拽项目' },
]);

// 第三个列表数据（使用不同的dnd-id，不能与前两个相互拖拽）
const list3 = ref([
    { id: 'a', title: '特殊项目 A', description: '这个项目只能在相同dnd-id的容器中拖拽' },
    { id: 'b', title: '特殊项目 B', description: '这个项目只能在相同dnd-id的容器中拖拽' },
]);

const tree = ref([
    { id: 1, title: '树级1', children: toRaw(list1.value) },
    { id: 2, title: '树级2', children: toRaw(list2.value) },
    { id: 3, title: '树级3', children: toRaw(list3.value) },
])

// 更新列表数据
const handleChange = (dndBus: any) => {
    console.log('更新列表数据:', dndBus);
    // 这里可以添加实际的更新逻辑，例如发送请求到服务器
};
</script>

<template>
    <div class="dnd-demo max-w-4xl mx-auto">
        <h1 class="demo-title">拖拽排序功能演示</h1>

        <div class="flex gap-3">
            <div class="flex-1">
                <DndSort :data="tree">
                    <template #default="{ item }">
                        <div class="item-content">
                            <div class="item-title">{{ item.title }}</div>
                            <div class="item-description">{{ item.description }}</div>
                        </div>
                    </template>
                </DndSort>
            </div>
            <div class="flex-1">
                <pre>{{ tree }}</pre>
            </div>
        </div>

        <div class="demo-description">
            <p>以下是两个可以相互拖拽的容器（使用相同的 dnd-id）：</p>
        </div>

        <div class="flex gap-4">
            <!-- 第一个容器 -->
            <div class="w-[50%] bg-gray-100 p-2">
                <h2 class="container-title">容器 1 (dnd-id: "group-1")</h2>
                <DndRoot dndId="group-1" v-model:list="list1" class="flex flex-col" ref="dndRoot1" :data="list1"
                    @change="handleChange">
                    <template #default>
                        <DndItem v-for="(item, index) in list1" :key="index" :item="item">
                            <div class="item-content">
                                <div class="item-title">{{ item.title }}</div>
                                <div class="item-description">{{ item.description }}</div>
                            </div>
                        </DndItem>
                    </template>
                </DndRoot>
            </div>

            <!-- 第二个容器 - 与第一个容器使用相同的dnd-id，可以相互拖拽 -->
            <div class="w-[50%] bg-gray-100 p-2">
                <h2 class="container-title">容器 2 (dnd-id: "group-1")</h2>
                <DndRoot dndId="group-1" v-model:list="list2" class="demo-root min-h-100" ref="dndRoot2" :data="list2"
                    @change="handleChange">
                    <template #default>
                        <DndItem v-for="(item, index) in list2" :key="index" :item="item">
                            <div class="item-content">
                                <div class="item-title">{{ item.title }}</div>
                                <div class="item-description">{{ item.description }}</div>
                            </div>
                        </DndItem>
                    </template>
                </DndRoot>
            </div>
        </div>

        <!-- 第三个容器 - 使用不同的dnd-id，不能与前两个相互拖拽 -->
        <div class="container-section bg-gray-100 p-2 my-4">
            <h2 class="container-title">容器 3 (dnd-id: "group-2") - 不能与上面的容器相互拖拽</h2>
            <DndRoot dndId="group-2" v-model:list="list3" class="demo-root" ref="dndRoot3">
                <template #default>
                    <DndItem v-for="(item, index) in list3" :key="index" :item="item">
                        <div class="item-content">
                            <div class="item-title bg-orange-200 px-2 rounded-sm">{{ item.title }}</div>
                            <div class="item-description">{{ item.description }}</div>
                        </div>
                    </DndItem>
                </template>
            </DndRoot>
        </div>

        <!-- 数据展示区域 -->
        <div>
            <h3>数据状态</h3>
            <div class="flex gap-2">
                <div class="data-section flex flex-col w-[33.33%] border border-gray-300">
                    <h4 class="p-1 font-bold bg-gray-100">容器 1 数据:</h4>
                    <div class="min-w-0 overflow-auto flex-1">
                        <pre>{{ list1 }}</pre>
                    </div>
                </div>
                <div class="data-section flex flex-col w-[33.33%] border border-gray-300">
                    <h4 class="p-1 font-bold bg-gray-100">容器 2 数据:</h4>
                    <div class="min-w-0 overflow-auto flex-1">
                        <pre>{{ list2 }}</pre>
                    </div>
                </div>
                <div class="data-section flex flex-col w-[33.33%] border border-gray-300">
                    <h4 class="p-1 font-bold bg-gray-100">容器 3 数据:</h4>
                    <div class="min-w-0 overflow-auto flex-1">
                        <pre>{{ list3 }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.dnd-root {
    padding: 4px;
}

.item-content {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 4px;
    padding: 8px;
    background-color: #fff;
}
</style>

<style lang="scss" scoped>
.container-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #409eff;
}
</style>