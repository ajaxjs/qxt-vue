<script lang="ts">
export default {
    inheritAttrs: false // 在这里设置
}
</script>
<script setup lang="ts">
//import { ref, computed, useAttrs } from 'vue';

const visible = defineModel({
    type: Boolean,
    default: false,
})

const props = defineProps({
    position: {
        type: String,
        default: 'center',
        validator: (val: string) => ['center', 'top', 'bottom', 'left', 'right'].includes(val),
    },
})
const pos: any = {
    center: {
        pos: 'items-center justify-center',
        ani: 'zoom',
    },
    top: {
        pos: 'items-start justify-center',
        ani: 'slide-down'
    },
    bottom: {
        pos: 'items-end justify-center',
        ani: 'slide-up'
    },
    left: {
        pos: 'items-center justify-start',
        ani: 'slide-left'
    },
    right: {
        pos: 'items-center justify-end',
        ani: 'slide-right'
    },
}

function show() {
    visible.value = true;
}

function hide() {
    visible.value = false;
}


defineExpose({
    show,
    hide,
})
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="visible" class="flex fixed left-0 top-0 right-0 bottom-0 pointer-events-none"
                :class="pos[position]['pos']">
                <div v-bind="$attrs" class="model-body z-10 bg-white pointer-events-auto"
                    :class="pos[props.position]['ani']">
                    <slot></slot>
                </div>
                <div class="mask absolute left-0 top-0 right-0 bottom-0 bg-black opacity-50 z-0  pointer-events-auto"
                    @click="hide"></div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.model-body {
    transition: all 0.3s ease;
    animation-direction: alternate-reverse;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.zoom {
    animation: zoom 0.3s ease;
}

@keyframes zoom {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

.slide-up {
    animation: slide-up 0.3s ease;
}

@keyframes slide-up {
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0);
    }
}

.slide-down {
    animation: slide-down 0.3s ease;
}

@keyframes slide-down {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

.slide-left {
    animation: slide-left 0.3s ease;
}

@keyframes slide-left {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0);
    }
}

.slide-right {
    animation: slide-right 0.3s ease;
}

@keyframes slide-right {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(0);
    }
}
</style>