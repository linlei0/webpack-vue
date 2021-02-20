/*
 * @Descripttion: 
 * @version: 
 * @Author: linlei
 * @Date: 2020-12-16 15:01:23
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-31 16:01:05
 */
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import './style/index.less'

const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")






