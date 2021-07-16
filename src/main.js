import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'vant/lib/index.css';
import Vant from 'vant';
import { Lazyload } from 'vant';
const app = createApp(App)
app.use(router)
app.use(Vant)
app.use(Lazyload, {
    loading: "./src/assets/images/Welcome.jpg"
})
app.mount('#app')
