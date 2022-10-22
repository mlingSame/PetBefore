import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import api from './utils/api.js';
Vue.use(uView);
Vue.prototype.api = api;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif