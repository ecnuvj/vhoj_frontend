import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Home from '@/view/home'
import Problem from '@/view/problem'
import Contest from '@/view/contest'
import Status from '@/view/status'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: Home,
    }, {
      path: 'problem',
      name: 'problem',
      component: Problem,
    }, {
      path: 'contest',
      name: 'contest',
      component: Contest,
    }, {
      path: 'status',
      name: 'status',
      component: Status,
    }]
  }]
})
