import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from "./router/router";
import store from './store'
import io from 'socket.io-client'; 
import VueMoment from 'vue-moment'

const socket = io('http://j4c108.p.ssafy.io:8080');
// const socket = io('http://localhost:12001'); 

Vue.prototype.$socket = socket;

Vue.use(VueMoment)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
