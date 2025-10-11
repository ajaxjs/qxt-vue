<script setup lang="ts">
import { computed, ref } from 'vue'
import { Field, Form } from '@/components/qxt-vue/form'
import { Checkbox } from '@/components/ui/checkbox'

const inline1 = ref(true)
const fields = computed(() => {
    return [
        {
            name: 'username',
            label: '用户名',
            type: 'text',
            placeholder: '请输入用户名',
            caption: '用户名不能超过10个字符',
        },
        {
            name: 'password',
            label: '密码',
            type: 'password',
            placeholder: '请输入密码',
            caption: '密码不能少于6个字符',
        },
        {
            name: 'born',
            label: '生日',
            type: 'datetime',
            placeholder: '请选择生日',
        },
        {
            name: 'sex',
            label: '性别',
            type: 'radio',
            placeholder: '请选择性别',
            options: [
                {
                    label: '男',
                    value: 'male',
                },
                {
                    label: '女',
                    value: 'female',
                },
            ],
        },
        {
            name: 'email',
            label: '邮箱',
            type: 'email',
            placeholder: '请输入邮箱',
            caption: '请输入正确的邮箱格式',
        },
        {
            name: 'date',
            label: '日期',
            type: 'date',
            placeholder: '请选择日期',
        },
        {
            name: 'select',
            label: '选择',
            type: 'select',
            placeholder: '请选择电影票',
            options: new Array(10).fill(0).map((_, i) => ({
                label: `电影票${i + 1}`,
                value: `ticket${i + 1}`,
            })),
        },
        {
            name: 'hobby',
            label: '爱好',
            type: 'checkbox',
            placeholder: '请选择爱好',
            options: [
                {
                    label: '篮球',
                    value: 'basketball',
                },
                {
                    label: '足球',
                    value: 'football',
                },
            ],
        },
        {
            name: 'intro',
            label: '简介',
            type: 'textarea',
            placeholder: '请输入简介',
            caption: '请输入正确的简介格式',
        },
        {
            name: 'remember',
            label: '记住表单',
            type: 'switch',
            switchIcon: 'checkbox',
            caption: '请输入正确的简介格式',
        },
    ].map(vo => ({
        ...vo,
        inline: inline1.value,
    }))
})

const inline2 = ref(false)
const field2 = [
    {
        name: 'username1',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        caption: '用户名不能超过10个字符',
    },
    {
        name: 'password1',
        label: '密码',
        type: 'password',
        placeholder: '请输入密码',
        caption: '密码不能少于6个字符',
    }
]

const formValue = ref<any>({})
</script>

<template>
    <CardBox title="Field" body-class="space-y-4">
        <div>
            <label>
                <Checkbox v-model="inline1" />
                内联
            </label>
        </div>
        <Field v-model="formValue[vo.name]" v-for="vo in fields" :key="vo.name" v-bind="vo" />
        <div class="bg-gray-100 p-4 rounded-md">
            {{ formValue }}
        </div>
    </CardBox>
    <CardBox title="Form" body-class="space-y-4">
        <div>
            <label>
                <Checkbox v-model="inline2" />
                内联
            </label>
        </div>
        <Form v-model="formValue" :fields="field2" :inline="inline2" />
    </CardBox>
</template>

<style lang="scss" scoped></style>