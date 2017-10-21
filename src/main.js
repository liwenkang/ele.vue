// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import goods from './components/goods/goods'

Vue.use(VueRouter)

const routes = [{
  path: '/goods',
  components: goods
}]

let router = new VueRouter({
  routes
})

/* eslint-disable */
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
