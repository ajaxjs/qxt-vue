<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    position: {
        type: String,
        default: 'auto',
    }
})
const modelValue = defineModel({
    type: Boolean,
    default: false,
})

const wrapClass = computed(() => {
    const { position } = props;
    const pos = {}
    return [
        'fixed left-0 top-0 right-0 bottom-0 flex',
        `pos-${position}`,
        pos[position as keyof typeof pos] || 'items-end md:items-center justify-center',
    ];
})

function close(e: MouseEvent) {
    e.stopPropagation();
    modelValue.value = false;
}
</script>

<template>
    <template v-if="position === 'static'">
        <slot></slot>
    </template>
    <template v-else>
        <Transition name="fade" appear>
            <div v-if="modelValue" class="picker-wrap" :class="wrapClass">
                <Transition name="slide" appear>
                <div v-if="modelValue" class="picker-box w-md max-w-full shadow-md border border-gray-200 z-10">
                    <slot></slot>
                </div>
                </Transition>
                <div class="picker-mask absolute left-0 top-0 right-0 bottom-0 bg-black opacity-50 backdrop-blur-sm"
                    @click="close"></div>
            </div>
        </Transition>
    </template>
</template>

<style lang="scss" scoped>
.picker-wrap,
.picker-box {
    transition: all 0.2s ease;
}

.fade-enter-active,
.fade-leave-active {
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


.slide-enter-active,
.slide-leave-active {
    transform: translateY(0);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(50%);
}
</style>