import Vue from 'vue'

import Router from 'vue-router'


const PageError = r => require.ensure([], () => r(require('@/views/activity/error/404.vue')),'PageError')

const Test = r => require.ensure([], () => r(require('@/views/activity/test/index.vue')),'SnackFood')

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: PageError,
    },{
      path: '/activity/test',
      name: 'Test',
      component: Test
    }
  ]
})
