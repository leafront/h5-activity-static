import Vue from 'vue'

import Router from 'vue-router'

import config from '@/config/index'

Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior(to,from,savePosition){
    if (savePosition) {
      return savePosition
    } else{
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: () => import('@/views/activity/error/404.vue'),
      meta: {
        title: '找不到页面',
        bgColor: '#61b8ff'
      }
    },{
      path: '/activity/redpack/invite',
      name: 'redPackInvite',
      component: () => import('@/views/activity/redpack/invite.vue'),
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/receive',
      name: 'redPackReceive',
      component: () => import('@/views/activity/redpack/receive.vue'),
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/start',
      name: 'redPackStart',
      component: () => import('@/views/activity/redpack/start.vue'),
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/finished',
      name: 'redPakFinished',
      component: () => import('@/views/activity/redpack/finished.vue'),
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/success',
      name: 'redPackSuccess',
      component: () => import('@/views/activity/redpack/success.vue'),
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/stop',
      name: 'redPackStop',
      component: () => import('@/views/activity/redpack/stop.vue'),
      meta: {
        title: '拆红包'
      }
    },{
      path: '/activity/redpack/invalid',
      name: 'redPackInvalid',
      component: () => import('@/views/activity/redpack/invalid.vue'),
      meta: {
        title: '拆红包'
      }
    },
    {
      path: '/activity/make/money',
      name: 'makeMoney',
      component: () => import('@/views/activity/make/money.vue'),
      meta: {
        title: '伊起赚专区'
      }
    },{
      path: '/activity/coupon/list',
      name: 'couponList',
      component: () => import('@/views/activity/coupon/list.vue'),
      meta: {
        title: '领券专区'
      }
    }, {
      path: '/activity/group/list',
      name: 'groupList',
      component: () => import('@/views/activity/group/list.vue'),
      meta: {
        title: '伊起拼'
      }
    },{
      path: '/activity/inviteFriends/invitation',
      name: 'invitation',
      component: () => import('@/views/activity/inviteFriends/invitation.vue'),
      meta: {
        title: '邀请好友',
        requireLogin: true
      }
    }, {
      path: '/activity/inviteFriends/invitedsuccess',
      name: 'invitedsuccess',
      component: () => import('@/views/activity/inviteFriends/invitedsuccess.vue'),
      meta: {
        title: '邀请好友',
        requireLogin: true
      }
    }, {
			path: '/activity/bank/recharge',
			name: 'bankRecharge',
			component: () => import('@/views/activity/bank/recharge.vue'),
			meta: {
				title: '悠点卡',
				requireLogin: true
			}
		}, {
			path: '/activity/bank/pay',
			name: 'bankPay',
			component: () => import('@/views/activity/bank/pay.vue'),
			meta: {
				title: '收银台',
				requireLogin: true
			}
		}, {
			path: '/activity/bank/success',
			name: 'bankSuccess',
			component: () => import('@/views/activity/bank/success.vue'),
			meta: {
				title: '交易结果',
				requireLogin: true
			}
		}, {
      path: '/activity/school/start',
      name: 'schoolStart',
      component: () => import('@/views/activity/school/start.vue'),
      meta: {
        title: '开学季'
      }
    }, {
      path: '/activity/koi/index',
      name: 'koiIndex',
      component: () => import('@/views/activity/koi/index.vue'),
      meta: {
        title: '翻倍锦鲤券',
        bgColor: '#bd0004',
        shareConfig: {
          link: config.hostPath + '/activity/koi/index',
          title: '官宣 锦鲤和双十一更配哦',
          desc: '多张小劵合成翻倍大额劵，一笔订单减更多，免单劵、¥200劵、等各种超值劵等你来合',
          imgUrl: config.staticPath + '/activity-static/images/koi_share_icon.png',
          channel: [
           "WechatMoments",
           "Wechat",
           "QQ",
           "QZone"
          ]
        }
      }
    }, {
      path: '/activity/koi/end',
      name: 'koiEnd',
      component: () => import('@/views/activity/koi/end.vue'),
      meta: {
        bgColor: '#bd0004',
        title: '翻倍锦鲤券'
      }
    },{
      path: '/activity/koi/merge',
      name: 'koiMerge',
      component: () => import('@/views/activity/koi/koi_merge.vue'),
      meta: {
        title: '锦鲤券',
        bgColor: '#bd0004',
        requireLogin: true
      }
    }

  ]
})
