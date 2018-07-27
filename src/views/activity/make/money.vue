<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <Banner :bannerList="yiqizhuan_banner"></Banner>
      <div class="make-money-list clearfix">
        <div class="make-money-item" v-if="welfare_activity.length" @click="checkTweetAction('welfare_activity')">
          <img :src="welfare_activity[0].imageUrl | imgScale(100)">
          <p>{{welfare_activity[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="creative_material.length" @click="checkTweetAction('creative_material')">
          <img :src="creative_material[0].imageUrl | imgScale(100)">
          <p>{{creative_material[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="apply_for_cash.length" @click="checkTweetAction('apply_for_cash')">
          <img :src="apply_for_cash[0].imageUrl | imgScale(100)">
          <p>{{apply_for_cash[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="make_money_list.length" @click="pageAction(make_money_list[0].linkUrl)">
          <img :src="make_money_list[0].imageUrl | imgScale(100)">
          <p>{{make_money_list[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="distribution_commodity.length" @click="pageAction(distribution_commodity[0].linkUrl)">
          <img :src="distribution_commodity[0].imageUrl | imgScale(100)">
          <p>{{distribution_commodity[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="invite_friend.length" @click="pageAction(invite_friend[0].linkUrl)">
          <img :src="invite_friend[0].imageUrl | imgScale(100)">
          <p>{{invite_friend[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="distributor_core.length" @click="pageAction(distributor_core[0].linkUrl)">
          <img :src="distributor_core[0].imageUrl | imgScale(100)">
          <p>{{distributor_core[0].name}}</p>
        </div>
        <div class="make-money-item" v-if="my_yifentuan.length" @click="pageAction(my_yifentuan[0].linkUrl)">
          <img :src="my_yifentuan[0].imageUrl | imgScale(100)">
          <p>{{my_yifentuan[0].name}}</p>
        </div>
      </div>
      <div class="make-notice">
        <img src="./images/notice.png"/>
        <NoticeScroll :list="noticeText" :categoryLink="categoryLink"></NoticeScroll>
      </div>
      <div class="make-banner" v-if="wonderful_activity.length" @click="pageAction(wonderful_activity[0].linkUrl)">
        <img class="pic-lazyLoad" :src="wonderful_activity[0].imageUrl | imgScale(750)"/>
        <TextScroll :list="userBroadcast"></TextScroll>
      </div>
      <div class="make-banner" v-if="wonderful_activity01.length" @click="pageAction(wonderful_activity01[0].linkUrl)">
        <img class="pic-lazyLoad" :src="wonderful_activity01[0].imageUrl | imgScale(750)"/>
      </div>
      <div class="make-banner" v-if="wonderful_activity02.length" @click="pageAction(wonderful_activity02[0].linkUrl)">
        <img class="pic-lazyLoad" :src="wonderful_activity02[0].imageUrl | imgScale(750)"/>
      </div>
      <div class="make-banner" v-if="wonderful_activity03.length" @click="pageAction(wonderful_activity03[0].linkUrl)">
        <img class="pic-lazyLoad" :src="wonderful_activity03[0].imageUrl | imgScale(750)"/>
      </div>
      <div class="make-banner" v-if="wonderful_activity04.length" @click="pageAction(wonderful_activity04[0].linkUrl)">
        <img class="pic-lazyLoad" :src="wonderful_activity04[0].imageUrl | imgScale(750)"/>
      </div>
      <div class="make-pageRight">
        <ul class="make-pageRight-list">
          <li v-if="apply_for_distributor.length" @click="applyTweet">
            <img :src="apply_for_distributor[0].imageUrl"/>
          </li>
          <li v-if="distributor_common_problem.length" @click="pageAction(distributor_common_problem[0].linkUrl)">
            <img :src="distributor_common_problem[0].imageUrl"/>
          </li>
          <li v-if="distributor_right.length" @click="pageAction(distributor_right[0].linkUrl)">
            <img :src="distributor_right[0].imageUrl"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import Banner from '@/components/common/banner'

  import common from '@/widget/common'

  import NoticeScroll from '@/components/make/noticeScroll'

  import TextScroll from '@/components/make/textScroll'

  import app from '@/widget/app'

  import utils from'@/widget/utils'

  import * as Model from '@/model/make'

  export default {
    data () {
      return {
        title: '伊起赚专区',
        isBorder: true,
        pageView: false,
        yiqizhuan_banner: [],

        welfare_activity: [],
        creative_material: [],
        apply_for_cash: [],
        make_money_list: [],
        distribution_commodity: [],
        invite_friend: [],
        distributor_core: [],
        my_yifentuan: [],
        distributor_right: [],
        distributor_common_problem: [],
        apply_for_distributor: [],

        userInfo: {},
        noticeText: [],
        categoryLink: '',
        userBroadcast: [],

        wonderful_activity: [],
        wonderful_activity01: [],
        wonderful_activity02: [],
        wonderful_activity03: [],
        wonderful_activity04: []
      }
    },
    components: {
      AppHeader,
      Banner,
      NoticeScroll,
      TextScroll
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back('refresh')
        } else {
          this.$router.back()
        }
      },
      /**
       * 获取用户基本信息
       */
      getUserInfo () {
        Model.getUserInfo({
          type: 'GET'
        }).then((result) => {

          const data = result.data

          if (result.code == 0 && data) {
            const {
              isDistributor,
              distributorType
            } = data
            this.userInfo = {
              isDistributor,
              distributorType
            }
          } else {
            this.$toast(result.message)
          }
        })
      },
      applyTweet () {
        const {
          apply_for_distributor
        } = this
        const {
          isDistributor,
          distributorType
        } = this.userInfo  // 如果是分销商或者代言人

        if (isDistributor == 1 || distributorType == 3) {
          location.href = '/placeChannel/index.html'
        } else {
          location.href = apply_for_distributor[0].linkUrl
        }
      },
      /**
       * 推客跳转
       */
      checkTweetAction (parmas) {
        app.loginAction()
        const {
          isDistributor,
          distributorType
        } = this.userInfo  // 如果是分销商或者代言人

        if (isDistributor == 1 || distributorType == 3) {
          location.href = this[parmas][0].linkUrl
        } else {
          this.$showModal({
            content: '您还不是推客！',
            cancelText: '取消',
            confirmText: '申请推客',
            success (){
              location.href = '/applyToTuike.html'
            }
          })
        }
      },
      /**
       * 获取banner/menu
       */
      getDolphinList () {
        const ADCODE = [
          'yiqizhuan_banner', //广告轮播
          'welfare_activity', //广告福利活动
          'creative_material', //创意素材
          'apply_for_cash', //提取现钱
          'make_money_list', //赚钱排行榜
          'distribution_commodity', //获取广告分销商品
          'invite_friend', //获取广告邀请好友
          'distributor_core', //获取广告推客中心
          'my_yifentuan', //获取广告我的伊粉团
          'distributor_right', //获取广告推客权益
          'distributor_common_problem', //获取广告获取帮助
          'apply_for_distributor', //获取广告申请推客
        ]
        return common.getDolphinList({
          pageCode : 'H5_YIQIZHUAN_ARER_PAGE',
          adCode : ADCODE.join(',')
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const {
              yiqizhuan_banner,
              welfare_activity,
              creative_material,
              apply_for_cash,
              make_money_list,
              distribution_commodity,
              invite_friend,
              distributor_core,
              my_yifentuan,
              distributor_right,
              distributor_common_problem,
              apply_for_distributor
            } = data
            yiqizhuan_banner.forEach((item) => {
              item.imageUrl = utils.imgScale(item.imageUrl,85)
            })
            this.yiqizhuan_banner = yiqizhuan_banner
            this.welfare_activity = welfare_activity
            this.creative_material = creative_material
            this.apply_for_cash = apply_for_cash
            this.make_money_list = make_money_list
            this.distribution_commodity = distribution_commodity
            this.invite_friend = invite_friend
            this.distributor_core = distributor_core
            this.my_yifentuan = my_yifentuan
            this.distributor_right = distributor_right
            this.distributor_common_problem = distributor_common_problem
            this.apply_for_distributor = apply_for_distributor
          } else {
            this.$toast(result.message)
          }
          return result
        })
      },
      /**
       * 获取广告精彩活动
       */
      getWonderFulActivity () {
        const ADCODE_ACTIVES = [
          'wonderful_activity', //获取广告精彩活动
          'wonderful_activity01', //获取广告精彩活动
          'wonderful_activity02', //获取广告精彩活动
          'wonderful_activity03', //获取广告精彩活动
          'wonderful_activity04', //获取广告精彩活动
        ]
        return common.getDolphinList({
          pageCode : 'H5_YIQIZHUAN_ARER_PAGE',
          adCode : ADCODE_ACTIVES.join(',')
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const {
              wonderful_activity,
              wonderful_activity01,
              wonderful_activity02,
              wonderful_activity03,
              wonderful_activity04
            } = data

            this.wonderful_activity = wonderful_activity
            this.wonderful_activity01 = wonderful_activity01
            this.wonderful_activity02 = wonderful_activity02
            this.wonderful_activity03 = wonderful_activity03
            this.wonderful_activity04 = wonderful_activity04

          } else {
            this.$toast(result.message)
          }
          return result
        })
      },
      /**
       * 滚动头条文字
       */
      getHeadLineList () {
        Model.getHeadLineList({
          type: 'GET',
          data: {
            categoryType : 2,
            currentPage : 1,
            itemsPerPage : 8,
            code : 'yiqizhuanheadline'
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            if (data.pageResult && data.pageResult.listObj) {
              this.categoryLink = data.categoryLink
              this.noticeText = utils.divisionArr(data.pageResult.listObj)
            }
          } else {
            this.$toast(result.message)
          }
        })
      },
      getUserBroadcast () {

        Model.getUserBroadcast({
          type: 'POST'
        }).then((result) => {

          const data = result.data

          if (result.code == 0 && data) {
            this.userBroadcast = data
          } else {
            this.$toast(result.message)
          }

        })

      },
      pageAction (url) {
        if (url) {
          location.href = url
        }
      }
    },
    created () {
      this.$showLoading()
      this.getUserInfo()
      this.getHeadLineList()
      this.getUserBroadcast()
      Promise.all([
        this.getDolphinList(),
        this.getWonderFulActivity()
      ]).then((result) => {
        let isSendSuccess = result.every((item) => {
          return item.code == 0
        })
        if (isSendSuccess) {
          this.pageView = true
          this.$hideLoading()
        }
      })
    }
  }

</script>

<style lang="scss">
  .make-pageRight{
    position: fixed;
    right:0;
    bottom: 1rem;
    z-index:100;
    li{
      border-radius: 50%;
      background: #f89045;
      margin-bottom: .14rem;
      img{
        width: .8rem;
        height: .8rem;
      }
    }
  }
  .make-banner{
    margin-bottom: .1rem;
    position: relative;
    &:last-child{
      margin-bottom: 0;
    }
    img{
      width: 100%;
      height: 2.5rem;
    }
  }
  .make-notice{
    height: 1.2rem;
    display: flex;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    background: #fff;
    overflow: hidden;
    img{
      width: .8rem;
      padding-right: .3rem;
      border-right: .01rem solid #e5e5e5;
    }
  }
  .make-money-list{
    background: #fff;
    padding-bottom: .4rem;
  }
  .make-money-item{
    float:left;
    width: 25%;
    text-align: center;
    img{
      width: .72rem;
      height: .72rem;
      margin: .3rem auto .12rem;
    }
    p{
      color: #000;
    }
  }
</style>
