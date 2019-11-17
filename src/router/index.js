import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/logon'
import home from '@/components/home'
import mainleft from '@/components/mainleft'
import about from '@/components/about'
import Userlist from '@/components/Userlist'
import jslist from '@/components/jslist'
import params from '@/components/params'
import Jurisdiction from '@/components/Jurisdiction'
import Goodslist from '@/components/Goodslist'
import goodslistxq from '@/components/goodslistxq'
import goodsxx from '@/components/goodsxx'
import canshu from '@/components/canshu'
import shuxing from '@/components/shuxing'
import goodsimages from '@/components/goodsimages'
import order from '@/components/order'
import Commodity from '@/components/Commodity'
import information from '@/components/information'
import categories from '@/components/categories'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/about',
      children: [
        {
          path: "/mainleft",
          component: mainleft
        },
        {
          path: "/about",
          component: about,
        },
        {
          path: "/Userlist",
          component: Userlist
        },
        {
          path: "/jslist",
          component: jslist
        },
        {
          path: "/params",
          component: params
        },
        {
          path: "/Jurisdiction",
          component: Jurisdiction
        },
        {
          path: "/Goodslist",
          component: Goodslist
        },
        {
          path: "/information",
          component: information
        },
        {
          path: "/categories",
          component: categories
        },
        {
          path: "/order",
          component: order
        },
        {
          path: "/goodslistxq",
          component: goodslistxq,
          redirect:"/goodsxx",
          children: [
            {
              path: "/goodsxx",
              component: goodsxx,
            },
            {
              path: "/canshu",
              component: canshu,
            },
            {
              path: "/shuxing",
              component: shuxing,
            },
            {
              path: "/goodsimages",
              component: goodsimages,
            },
            {
              path: "/Commodity",
              component: Commodity,
            },
          ]
        },
      ]
    },
  ]
})
