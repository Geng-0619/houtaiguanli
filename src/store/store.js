import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        rids:[],
        acc:[],
        goods_cat:[],
        goods_name:"",
        goods_price:"",
        goods_weight:"",
        goods_number:"",
        pics:[],
        goods_introduce:""
    },
    mutations: {
        
    }
})
export default store;