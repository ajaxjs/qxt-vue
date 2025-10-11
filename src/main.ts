import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import CardBox from './components/CardBox.vue'


const app = createApp(App).use(router)
// 全局组件
app.component('CardBox', CardBox)

app.mount('#app')
