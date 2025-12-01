<script setup lang="ts">
import { ref } from 'vue';
import DndRoot from '@/components/qxt-vue/dnd-sortable/DndRoot.vue';
import DndItem from '@/components/qxt-vue/dnd-sortable/DndItem.vue';

// 动画控制状态
const animationEnabled = ref(true);

// DndRoot组件引用
const dndRoot1 = ref();
const dndRoot2 = ref();
const dndRoot3 = ref();

// 切换动画状态
const toggleAnimation = (value: boolean) => {
    animationEnabled.value = value;
    // 同步更新所有DndRoot实例的动画状态
    if (dndRoot1.value) dndRoot1.value.toggleAnimation(value);
    if (dndRoot2.value) dndRoot2.value.toggleAnimation(value);
    if (dndRoot3.value) dndRoot3.value.toggleAnimation(value);
};

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
</script>

<template>
    <div class="dnd-demo">
        <h1 class="demo-title">拖拽排序功能演示</h1>

        <div class="demo-controls">
            <div class="switch-container">
                <label class="switch">
                    <input type="checkbox" v-model="animationEnabled" @change="toggleAnimation(animationEnabled)">
                    <span class="slider"></span>
                </label>
                <span>启用排序动画</span>
            </div>
        </div>

        <div class="demo-description">
            <p>以下是两个可以相互拖拽的容器（使用相同的 dnd-id）：</p>
        </div>

        <div class="containers-wrapper">
            <!-- 第一个容器 -->
            <div class="container-section">
                <h2 class="container-title">容器 1 (dnd-id: "group-1")</h2>
                <DndRoot dndId="group-1" v-model:list="list1" class="demo-root" ref="dndRoot1">
                    <template #default>
                        <DndItem v-for="(item, index) in list1" :key="item.id" :item="item" :index="index">
                            <div class="item-content">
                                <div class="item-title">{{ item.title }}</div>
                                <div class="item-description">{{ item.description }}</div>
                            </div>
                        </DndItem>
                    </template>
                </DndRoot>
            </div>

            <!-- 第二个容器 - 与第一个容器使用相同的dnd-id，可以相互拖拽 -->
            <div class="container-section">
                <h2 class="container-title">容器 2 (dnd-id: "group-1")</h2>
                <DndRoot dndId="group-1" v-model:list="list2" class="demo-root" ref="dndRoot2">
                    <template #default>
                        <DndItem v-for="(item, index) in list2" :key="item.id" :item="item" :index="index">
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
        <div class="container-section">
            <h2 class="container-title">容器 3 (dnd-id: "group-2") - 不能与上面的容器相互拖拽</h2>
            <DndRoot dndId="group-2" v-model:list="list3" class="demo-root" ref="dndRoot3">
                <template #default>
                    <DndItem v-for="(item, index) in list3" :key="item.id" :item="item" :index="index">
                        <div class="item-content special">
                            <div class="item-title">{{ item.title }}</div>
                            <div class="item-description">{{ item.description }}</div>
                        </div>
                    </DndItem>
                </template>
            </DndRoot>
        </div>

        <!-- 数据展示区域 -->
        <div class="data-display">
            <h3>数据状态</h3>
            <div class="data-panel">
                <div class="data-section">
                    <h4>容器 1 数据:</h4>
                    <pre>{{ list1 }}</pre>
                </div>
                <div class="data-section">
                    <h4>容器 2 数据:</h4>
                    <pre>{{ list2 }}</pre>
                </div>
                <div class="data-section">
                    <h4>容器 3 数据:</h4>
                    <pre>{{ list3 }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.dnd-root{
    padding: 4px;
}
.item-content {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 4px;
    background-color: #fff;
}
</style>

<style lang="scss" scoped>
.dnd-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.demo-title {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
}

.demo-description {
    margin-bottom: 30px;
    text-align: center;
    color: #666;
}

.demo-controls {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.switch-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #409eff;
}

input:checked+.slider:before {
    transform: translateX(26px);
}

.containers-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.container-section {
    flex: 1;
    min-width: 300px;
}

.container-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #409eff;
}

.demo-root {
    min-height: 200px;
    background-color: #f5f5f5;
}

.item-content {
    padding: 10px;
}

.item-content.special {
    background-color: #fff3e0;
    border-left: 4px solid #ff9800;
}

.item-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.item-description {
    font-size: 14px;
    color: #666;
}

.data-display {
    margin-top: 40px;
    padding: 20px;
    background-color: #f0f2f5;
    border-radius: 6px;
}

.data-display h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
}

.data-panel {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.data-section {
    flex: 1;
    min-width: 250px;
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-section h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #409eff;
}

.data-section pre {
    margin: 0;
    padding: 10px;
    background-color: #f6f8fa;
    border-radius: 4px;
    font-size: 13px;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}

@media (max-width: 768px) {
    .containers-wrapper {
        flex-direction: column;
    }

    .data-panel {
        flex-direction: column;
    }
}
</style>