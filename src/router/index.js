import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
import Home from '@/view/home'
import Problem from '@/view/problem'
import Contest from '@/view/contest'
import Status from '@/view/status'
import ProblemInfo from '@/view/problem_info'
import ContestInfo from '@/view/contest_info'
import UserInfo from '@/view/user_info'
import Test from '@/view/test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      const position = {}
      if (to.hash) {
        position.selector = to.hash
        position.behavior = 'smooth'
        console.log("router to hash: ", to.hash)
        if (document.querySelector(to.hash)) {
          console.log("document query selector:", to.hash)
          return position
        }
        return false
      }
    }
  },
  routes: [{
    path: '/test',
    name: 'Test',
    component: Test,
  }, {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: Home,
    }, {
      path: '/problem',
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
    }, {
      path: '/user/info',
      name: 'userInfo',
      component: UserInfo,
    }]
  }]
})
