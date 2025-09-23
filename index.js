import { components } from 'reka-ui/constant'
import Avatar from './Avatar.vue'
import pkg from './package.json'

const components = { Avatar }

export default {
    version: pkg.version,
    components,
    // 直接导出
    ...components
}