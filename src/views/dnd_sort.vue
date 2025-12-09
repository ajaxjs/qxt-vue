<script setup lang="ts">
import { ref, toRaw } from 'vue'
import DndSort from '@/components/qxt-vue/dnd-sort/DndSort.vue'
import type { IChangeResult } from '@/components/qxt-vue/dnd-sort/type'

const children = [
    { id: '6', title: '三目 C1', description: '这是第六个可拖拽项目' },
    { id: '7', title: '三目 C2', description: '这是第七个可拖拽项目' },
    { id: '8', title: '三目 C3', description: '这是第八个可拖拽项目' },
];
// 第一个列表数据
const list1 = ref([
    { id: '1', title: '项目 A1', description: '这是第一个可拖拽项目' },
    { id: '2', title: '项目 A2', description: '这是第二个可拖拽项目' },
    { id: '3', title: '项目 A3', description: '这是第三个可拖拽项目', children },
    { id: '4', title: '项目 A4', description: '这是第四个可拖拽项目' },
    { id: '5', title: '项目 A5', description: '这是第五个可拖拽项目' },
]);

// 第二个列表数据
const list2 = ref([
    { id: '6', title: '条目 B6', description: '这是第六个可拖拽项目' },
    { id: '7', title: '条目 B7', description: '这是第七个可拖拽项目' },
    { id: '8', title: '条目 B8', description: '这是第八个可拖拽项目' },
]);

// 第三个列表数据（使用不同的dnd-id，不能与前两个相互拖拽）
const list3 = ref([
    { id: 'a', title: '特殊项目 A', description: '这个项目只能在相同dnd-id的容器中拖拽' },
    { id: 'b', title: '特殊项目 B', description: '这个项目只能在相同dnd-id的容器中拖拽' },
]);

const tree = ref([
    { id: 1, title: '+ 树级1', children: toRaw(list1.value) },
    { id: 2, title: '+ 树级2', children: toRaw(list2.value) },
    { id: 3, title: '+ 树级3', children: toRaw(list3.value) },
])

const planTree = toRaw(list1.value);

const handleChange = (detail: IChangeResult) => {
    console.log('---change:', detail);
}

const handleSort = (detail: IChangeResult) => {
    const { from, over, to } = detail;
    console.log(from, over, to);

    // if (isBefore) {
    //     //over.parent.insertBefore(from.item, over.item);
    // } else {
    //     //over.parent.insertBefore(from.item, over.item.nextSibling);
    // }
    //console.log(from.path.join(' -> '), isUp ? '上移' : '下移', '到', toPath.join(' -> '), isBefore ? '前' : '后');
}

</script>

<template>
    <div>响应式数据排序</div>
    <div class="flex gap-3">
        <div class="w-2/3">
            <DndSort v-model="tree" dnd-name="mytree" root-class="my-root" @change="handleChange">
                <template #default="{ item }">
                    <div class="item p-2 border border-gray-300 rounded-md">
                        <h3 class="text-lg font-bold">{{ item.title }}</h3>
                        <p class="text-sm text-gray-500">{{ item.description }}</p>
                    </div>
                </template>
            </DndSort>
        </div>
        <div class="w-1/3 overflow-auto relative">
            <div class="absolute inset-0 overflow-auto">
                <pre>{{ tree }}</pre>
            </div>
        </div>
    </div>

    <div class="mt-3">
        <div>非响应式数据排序(Dom排序)</div>
        <DndSort v-model="planTree" @change="handleSort">
            <template #default="{ item }">
                <div class="item p-2 border border-gray-300 rounded-md">
                    <h3 class="text-lg font-bold">{{ item.title }}</h3>
                    <p class="text-sm text-gray-500">{{ item.description }}</p>
                </div>
            </template>
        </DndSort>
    </div>
</template>

<style lang="scss">
.dnd-root {
    margin-left: 20px;
}

.dnd-root .dragging {
    opacity: 0.5;
}

.dragging-over>.item {
    background-color: #86bbff !important;
}

.dnd-dragging {
    opacity: 0.5;
}

.dnd-item-handle {
    position: relative;
}

.dnd-item-handle::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.dnd-over .dnd-item-handle::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #4998ff60;
}
</style>