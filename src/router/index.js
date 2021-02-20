/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-23 11:15:41
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-23 11:31:42
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        component: ()=>import('../view/index.vue')
    },
    {
        path: "/about",
        component: ()=>import('../view/about.vue') 
    }
]


const router = new VueRouter({
    routes // routes: routes 的简写
})

export default router