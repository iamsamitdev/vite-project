import { createApp } from 'vue'
import App from './App.vue'

// Vue Router
import router from './router'

// Vuex
import store from './store'

// Sweet Alert 2
import VueSweetalert2 from 'vue-sweetalert2'

// Tailwind CSS
import '@/styles/tailwind.css'

createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .mount('#app')
