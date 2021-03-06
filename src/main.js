// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import JsonExcel from 'vue-json-excel'
import showdown from 'showdown'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.prototype.md2html = (md) => {
  let converter = new showdown.Converter()
  let text = md.toString()
  let html = converter.makeHtml(text)
  return html
}
Vue.prototype.noHtml = (html) => {
  let reg = /<\/?.+?\/?>/g
  return html.replace(reg, '').replace(/\\bullet /g, '')
}
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
