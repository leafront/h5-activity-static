<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <Banner :bannerList="bannerList"></Banner>
      <div class="coupon-list">
        <div class="coupon-item" :class="{'disabled': item.overFlg == 1}" :key="index" v-for="(item,index) in list">
          <div class="coupon-item-info">
            <div class="coupon-item-info-txt">
              <p>¥<strong>{{item.couponAmount}}</strong></p>
              <span>优惠券</span>
            </div>
            <div class="coupon-item-des">
              <h4 class="c3">{{item.themeTitle}}</h4>
              <p class="c9">{{item.themeDesc||'暂无说明'}}</p>
            </div>
          </div>
          <div class="coupon-item-status">
            <span class="font-s" @click="receiveCoupon(item.couponThemeId)" v-if="item.overFlg == 0 && item.userOverFlg == 0 && item.userDayOverFlg == 0">领取</span>
            <span class="font-s" v-else-if="item.overFlg == 1">已领完</span>
            <span class="font-s coupon-button-receive" v-else-if="item.overFlg == 0 && (item.userOverFlg == 1 || item.userDayOverFlg == 1)">已领取</span>
          </div>
        </div>
      </div>
      <PageLoading :showLoading="showLoading"></PageLoading>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import Banner from '@/components/common/banner'

  import utils from '@/widget/utils'

  import * as Model from '@/model/coupon'

  import common from '@/widget/common'

  import app from '@/widget/app'

  import PageLoading from '@/components/common/pageLoading'

  import '@/widget/requestAnimationFrame'

  export default {
    data () {
      return {
        title: '领券专区',
        isBorder: true,
        pageView: false,
        bannerList: [],
        currentPage: 1,
        list: [],
        showLoading: false,
        isScrollLoad: false,
        totalPage: 1,
        timer: null
      }
    },
    components: {
      AppHeader,
      Banner,
      PageLoading
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back('refresh')
        } else {
          this.$router.back()
        }
      },
      getBannerList () {
        return Model.getDolphinList({
          type: 'GET',
          data: {
            pageCode: 'H5_COUPON_ZONE_PAGE',
            adCode: 'coupons_banner',
            areaCode: common.getAreaCode().areaCode
          }
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            const coupons_banner = data.coupons_banner
            coupons_banner.forEach((item) => {
              item.imageUrl = utils.imgScale(item.imageUrl,85)
            })
            this.bannerList = coupons_banner
          } else {
            this.$toast(result.message)
          }
          return result
        })
      },
      getCouponList (type) {
        const {
          currentPage
        } = this
        return Model.getCouponList({
          type: 'GET',
          data: {
            pageNo: currentPage,
            pageSize: 10
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data)  {

            if (currentPage > 1) {
              setTimeout(() => {
                this.showLoading = false
                this.isScrollLoad = false
              }, 1000)
            }
            this.totalPage = data.total
            if (type == 1) {
              this.list = this.list.concat(data.listObj || [])
            } else {
              this.list = data.listObj
            }
          } else {
            if (currentPage > 1) {
              setTimeout(() => {
                this.isScrollLoad = false
              }, 1000)
            }
            this.$toast(result.message)
          }
          return result
        })
      },
       /**
       * 滚动加载团列表
       * @param event
       */
      scrollLoadList () {
        const pageViewHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const pageHeight = document.documentElement.offsetHeight
        const realFunc = () => {
          if (pageViewHeight + scrollTop >= pageHeight && this.list.length < this.totalPage) {
            this.showLoading = true
            this.currentPage += 1
            this.getCouponList(1)
          } 
          this.isScrollLoad = false
        }
        if (!this.isScrollLoad) {
          this.isScrollLoad = true
          this.timer = requestAnimationFrame(realFunc)
        }
      },
      /**
       * 领取优惠券
       * @param {Number} id
       */
      receiveCoupon (id) {

        app.loginAction()

        Model.receiveCoupon({
          type: 'POST',
          data: {
            couponThemeId: id
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.currentPage = 1
            this.getCouponList()
            this.$toast('领取成功')
          } else {
            this.$toast(result.message)
          }
        })
      }
    },
    created () {
      this.$showLoading()
      Promise.all([
        this.getBannerList(),
        this.getCouponList(1)
      ]).then((result) => {
        if (result) {
          let isSendSuccess = result.every((item) => {
            return item.code == 0
          })
          if (isSendSuccess) {
            this.$hideLoading()
            this.pageView = true
          }
        }
      })
      window.addEventListener('scroll',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)

    }
  }

</script>

<style lang="scss">
  .coupon-list{
    margin-top: .2rem;
    background: #fff;
    width:100%;
  }
  .coupon-item{
    padding: .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: .01rem solid #e0e0e0;
    &.disabled{
      .coupon-item-info{
        background-image:url(./images/coupon-disable.png);
      }
      .coupon-item-status{
        span{
          background: #b2b2b2;
        }
      }
    }
  }
  .coupon-item-status{
    span{
      display: block;
      width: 1.2rem;
      height: .6rem;
      line-height: .6rem;
      color:#fff;
      text-align: center;
      background: linear-gradient(to bottom,#ff7c20,#ff7900);
      border-radius: .06rem;
      &.coupon-button-receive{
        border:.01rem solid #ddd;
        color: #333;
        background:#fff;
      }
    }
  }
  .coupon-item-des{
    padding-right: .2rem;
    padding-left: .4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex:1;
    p{
      line-height: .4rem;
      display: flex;
      max-height: .8rem;
      line-clamp: 2;
      flex-direction: column;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .coupon-item-info{
    width: 5.25rem;
    height: 1.6rem;
    background-image:url(./images/coupon-can.png);
    background-repeat: no-repeat;
    background-size: 5.25rem auto;
    display: flex;
  }
  .coupon-item-info-txt{
    width: 1.68rem;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-direction: column;
    p{
      strong{
        font-size: .48rem;
      }
    }
  }
</style>

