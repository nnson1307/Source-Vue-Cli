import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
window.router = router

//Config axios
import axios from 'axios'
window.axios = axios

axios.defaults.baseURL = 'http://research-vue.local'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

//Sweetalert
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//Config cookie
import $cookies from 'vue-cookies'
window.$cookies = $cookies


window.Swal = swal;

const app = createApp(App)

app.use(router, axios, swal, $cookies)

app.mount('#app')
