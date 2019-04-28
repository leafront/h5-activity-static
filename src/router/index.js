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
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '找不到页面',
        bgColor: '#61b8ff'
      }
    }, {
      path: '/activity/redpack/invite',
      name: 'redPackInvite',
      component: () => import('@/views/redpack/invite.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/redpack/receive',
      name: 'redPackReceive',
      component: () => import('@/views/redpack/receive.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/redpack/start',
      name: 'redPackStart',
      component: () => import('@/views/redpack/start.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/redpack/finished',
      name: 'redPakFinished',
      component: () => import('@/views/redpack/finished.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/redpack/success',
      name: 'redPackSuccess',
      component: () => import('@/views/redpack/success.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/redpack/stop',
      name: 'redPackStop',
      component: () => import('@/views/redpack/stop.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/redpack/invalid',
      name: 'redPackInvalid',
      component: () => import('@/views/redpack/invalid.vue'),
      meta: {
        title: '拆红包'
      }
    }, {
      path: '/activity/make/money',
      name: 'makeMoney',
      component: () => import('@/views/make/money.vue'),
      meta: {
        title: '伊起赚'
      }
    }, {
      path: '/activity/coupon/list',
      name: 'couponList',
      component: () => import('@/views/coupon/list.vue'),
      meta: {
        title: '领券专区'
      }
    }, {
      path: '/activity/inviteFriends/invitation',
      name: 'invitation',
      component: () => import('@/views/inviteFriends/invitation.vue'),
      meta: {
        title: '邀请好友',
        requireLogin: true
      }
    }, {
      path: '/activity/inviteFriends/invitedsuccess',
      name: 'invitedsuccess',
      component: () => import('@/views/inviteFriends/invitedsuccess.vue'),
      meta: {
        title: '邀请好友',
        requireLogin: true
      }
    }, {
			path: '/activity/bank/recharge',
			name: 'bankRecharge',
			component: () => import('@/views/bank/recharge.vue'),
			meta: {
				title: '悠点卡',
				requireLogin: true
			}
		}, {
			path: '/activity/bank/pay',
			name: 'bankPay',
			component: () => import('@/views/bank/pay.vue'),
			meta: {
				title: '收银台',
				requireLogin: true
			}
		}, {
			path: '/activity/bank/success',
			name: 'bankSuccess',
			component: () => import('@/views/bank/success.vue'),
			meta: {
				title: '交易结果',
				requireLogin: true
			}
		}, {
      path: '/activity/school/start',
      name: 'schoolStart',
      component: () => import('@/views/school/start.vue'),
      meta: {
        title: '开学季'
      }
    }, {
      path: '/activity/koi/index',
      name: 'koiIndex',
      component: () => import('@/views/koi/index.vue'),
      meta: {
        title: '翻倍锦鲤券',
        bgColor: '#bd0004'
      }
    }, {
      path: '/activity/koi/end',
      name: 'koiEnd',
      component: () => import('@/views/koi/end.vue'),
      meta: {
        bgColor: '#bd0004',
        title: '翻倍锦鲤券'
      }
    },{
      path: '/activity/koi/merge',
      name: 'koiMerge',
      component: () => import('@/views/koi/koi_merge.vue'),
      meta: {
        title: '锦鲤券',
        bgColor: '#bd0004',
        requireLogin: true
      }
    },{
      path: '/activity/receiveydka/ydka',
      name: 'ydka',
      component: () => import('@/views/receiveydka/ydka.vue'),
      meta: {
        title: '伊点卡',
        bgColor: '#ff9a37',

      }
    }, {
      path: '/activity/sign/index',
      name: 'sign',
      component: () => import('@/views/sign/index.vue'),
      meta: {
        title: '每日签到',
        bgColor: '#effbff',
        requireLogin: false
      }
    }, {
      path: '/activity/sign/award',
      name: 'award',
      component: () => import('@/views/sign/award.vue'),
      meta: {
        title: '我的奖品',
        bgColor: '#fff',
        requireLogin: true
      }
    }, {
      path: '/activity/sign/detail',
      name: 'detail',
      component: () => import('@/views/sign/detail.vue'),
      meta: {
        title: '奖品详情',
        bgColor: '#fff',
        requireLogin: true
      }
    }, {
      path: '/activity/bulk/incentive',
      name: 'incentive',
      component: () => import('@/views/bulk/incentive.vue'),
      meta: {
        title: '奖励金',
        requireLogin: true
      }
  },{
      path: '/activity/peopleGroups/createGroups',
      name: 'createGroups',
      component: () => import('@/views/peopleGroups/createGroups.vue'),
      meta: {
        title: '全民团购',
        bgColor: '#F5F5F5',
        requireLogin: true

      }
    },{
      path: '/activity/peopleGroups/detailGroups',
      name: 'detailGroups',
      component: () => import('@/views/peopleGroups/detailGroups.vue'),
      meta: {
        title: '商品详情',
        bgColor: '#fff',
      }
    }, {
      path: '/activity/queen/merge',
      name: 'queenMerge',
      component: () => import('@/views/queen/merge'),
      meta: {
        title: '翻倍锦鲤券',
        bgColor: '#bd0004'
      }
    },{
      path: '/activity/queen/index',
      name: 'queenIndex',
      component: () => import('@/views/queen/index'),
      meta: {
        title: '翻倍锦鲤券',
        bgColor: '#bd0004'
      }
    }, {
      path: '/activity/queen/end',
      name: 'queenEnd',
      component: () => import('@/views/queen/end'),
      meta: {
        title: '翻倍锦鲤券',
        bgColor: '#bd0004'
      }
    }
  ]
})
