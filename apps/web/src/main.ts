import './assets/global.css'
import './wondervue.css'
import 'primeicons/primeicons.css'
import './registerServiceWorker'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

createApp(App)
  .use(createPinia())
  .use(ToastService)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .use(router)
  .mount('#app')
