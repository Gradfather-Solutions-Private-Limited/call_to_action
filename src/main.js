import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar,Notify,Loading } from 'quasar'
import router from './router/index'
import './lib/utils/configaxios.js'
import './lib/utils/Axios.js'
import Breadcrumb from './components/Breadcrumb.vue'
import store from './store/index'


import "./assets/styles/bootstrap.min.css"
import "./assets/styles/mystyles.css"   
import "./assets/styles/leftnavi.css"  
import "./assets/styles/buttons.css"   
import Form from './core/Form';
import Pagination from 'v-pagination-3';
// Import icon libraries

import 'vue-universal-modal/dist/index.css';

import VueUniversalModal from 'vue-universal-modal';

// Import Quasar css

window.Form = Form;

const app = createApp(App)
app.$http = window.axios;
app.use(VueUniversalModal, {
  teleportTarget: '#modals',
});
app.use(router)
app.use('Breadcrumb',Breadcrumb)
app.use(store)
app.use(Pagination)
app.mount('#app')