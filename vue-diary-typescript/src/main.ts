import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "@/router/router.ts";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')