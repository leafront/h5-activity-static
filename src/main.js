
import Vue from 'vue'
import Application from './App'
import router from './router'
import store from './store'
import utils from '@/widget/utils'
import filter from '@/filters'
import Toast from '@/components/toast'
import loading from '@/components/loading'
import pageLoading from '@/components/pageLoading'
import showModal from '@/components/showModal'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(showModal)
Vue.use(loading)
Vue.use(pageLoading)
Vue.use(Toast)

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

router.beforeEach((to, from, next) => {

  document.title = to.meta.title
  const bgColor = to.meta.bgColor
  if (bgColor) {
    document.getElementById('app').backgroundColor = bgColor
  } else {
    document.body.style.backgroundColor = '#f5f5f5'
  }
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    process.env.NODE_ENV != 'develop'
  ) {
    //判断用户已经登录
    if (utils.loggedIn()) {
      next()
    } else {
      if (utils.isApp()) {
        utils.login()
      } else {
        const from = utils.getRelatedUrl()
        location.href = `/login.html?from=` + encodeURIComponent(from)
      }
    }
  } else {
    next()
  }
})


new Vue({
  el: '#app',
  router,
	store,
  components: { Application },
  template: '<Application/>'
})
