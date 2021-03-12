import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Home from '@/view/home'
import Problem from '@/view/problem'
import Contest from '@/view/contest'
import Status from '@/view/status'
import ProblemInfo from '@/view/problem_info'
import ContestInfo from '@/view/contest_info'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: Home,
    }, {
      path: 'problem',
      name: 'problem',
      component: Problem,
    }, {
      path: '/problem/:problem_id',
      name: 'problemInfo',
      component: ProblemInfo,
      props: true
    }, {
      path: 'contest',
      name: 'contest',
      component: Contest,
    }, {
      path: '/contest/:contest_id',
      name: 'contestInfo',
      component: ContestInfo,
      props: true
    }, {
      path: 'status',
      name: 'status',
      component: Status,
    }]
  }]
})
