import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import store from './store/index';

Vue.use(VueKonva)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
