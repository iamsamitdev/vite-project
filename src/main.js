import { createApp } from 'vue'
import App from './App.vue'

// Vue Router
import router from './router'

// Vuex
import store from './store'

// Sweet Alert 2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Tailwind CSS
import '@/styles/tailwind.css'

createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .mount('#app')
