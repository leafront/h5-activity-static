import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

const PageError = r => require.ensure([], () => r(require('@/views/activity/error/404.vue')),'PageError')

const redPackInvite = r => require.ensure([], () => r(require('@/views/activity/redpack/invite.vue')),'redPackInvite')

const redPackInvalid = r => require.ensure([], () => r(require('@/views/activity/redpack/invalid.vue')),'redPackInvalid')

const redPackStart = r => require.ensure([], () => r(require('@/views/activity/redpack/start.vue')),'redPackStart')

const redPackReceive = r => require.ensure([], () => r(require('@/views/activity/redpack/receive.vue')),'redPackReceive')

const redPakFinished =  r => require.ensure([], () => r(require('@/views/activity/redpack/finished.vue')),'redPakFinished')

const redPackSuccess = r => require.ensure([], () =>  r(require('@/views/activity/redpack/success.vue')),'redPackSuccess')

const redPackStop = r => require.ensure([], () =>  r(require('@/views/activity/redpack/stop.vue')),'redPackStop')

const makeMoney = r => require.ensure([], () =>  r(require('@/views/activity/make/money.vue')),'makeMoney')

const couponList = r => require.ensure([], () =>  r(require('@/views/activity/coupon/list.vue')),'couponList')

const groupList = r => require.ensure([], () =>  r(require('@/views/activity/group/list.vue')),'groupList')

const invitation = r => require.ensure([], () =>  r(require('@/views/activity/inviteFriends/invitation.vue')),'invitation')

const invitedsuccess = r => require.ensure([], () =>  r(require('@/views/activity/inviteFriends/invitedsuccess.vue')),'invitedsuccess')

const bankRecharge = r => require.ensure([], () =>  r(require('@/views/activity/bank/recharge.vue')),'bankRecharge')

const bankPay = r => require.ensure([], () =>  r(require('@/views/activity/bank/pay.vue')),'bankPay')

const bankSuccess = r => require.ensure([], () =>  r(require('@/views/activity/bank/success.vue')),'bankSuccess')

const schoolStart = r => require.ensure([], () =>  r(require('@/views/activity/school/start.vue')),'schoolStart')

export default new Router({
  mode:'history',
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: PageError,
      meta: {
        title: '找不到页面'
      }
    },{
      path: '/activity/redpack/invite',
      name: 'redPackInvite',
      component: redPackInvite,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/receive',
      name: 'redPackReceive',
      component: redPackReceive,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/start',
      name: 'redPackStart',
      component: redPackStart,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/finished',
      name: 'redPakFinished',
      component: redPakFinished,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/success',
      name: 'redPackSuccess',
      component: redPackSuccess,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/stop',
      name: 'redPackStop',
      component: redPackStop,
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/invalid',
      name: 'redPackInvalid',
      component: redPackInvalid,
      meta: {
        title: '拆红包'
      }
    },
    {
      path: '/activity/make/money',
      name: 'makeMoney',
      component: makeMoney,
      meta: {
        title: '伊起赚专区'
      }
    },{
      path: '/activity/coupon/list',
      name: 'couponList',
      component: couponList,
      meta: {
        title: '领券专区'
      }
    }, {
      path: '/activity/group/list',
      name: 'groupList',
      component: groupList,
      meta: {
        title: '伊起拼'
      }
    },{
      path: '/activity/inviteFriends/invitation',
      name: 'invitation',
      component: invitation,
      meta: {
        title: 'invitation'
      }
    }, {
      path: '/activity/bank/recharge',
      name: 'bankRecharge',
      component: bankRecharge,
      meta: {
        title: '悠点卡',
        requireLogin: true
      }
    }, {
      path: '/activity/bank/pay',
      name: 'bankPay',
      component: bankPay,
      meta: {
        title: '收银台',
        requireLogin: true
      }
    }, {
      path: '/activity/bank/success',
      name: 'bankSuccess',
      component: bankSuccess,
      meta: {
        title: '交易结果',
        requireLogin: true
      }
    }, {
      path: '/activity/school/start',
      name: 'schoolStart',
      component: schoolStart,
      meta: {
        title: '开学季'
      }
    },
    {
      path: '/activity/inviteFriends/invitedsuccess',
      name: 'invitedsuccess',
      component: invitedsuccess,
      meta: {
        title: 'invitedsuccess',
        requireLogin: true
      }
    }
  ]
})
