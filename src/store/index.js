/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-23 11:32:57
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-23 11:32:57
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 1
    }
})

export default store