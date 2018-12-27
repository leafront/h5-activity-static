<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <ul class="entry" v-for="(item, index) in awards" @click="openDeatil(item.id)">
        <li class="imgSquare"><img :src="item.imgSquare"></li>
        <li class="desc">
          <p class="first">{{item.name}}</p>
          <p class="second">{{item.range}}</p>
          <p class="third">有效期至{{item.endTime | dateFormat('yyyy-MM-dd')}}</p>
        </li>
      </ul>
      <!--签到未抽奖-->
      <div class="no-awards">
        <img src="./images/sign_no_bg.png" />
        <p>还没有奖品哦~</p>
        <p>赶快签到抽奖吧~</p>
        <img class="sign_award_draw" src="./images/sign_award_draw.png" />
      </div>
    </div>




  </div>
</template>

<script type="text/javascript">
  import AppHeader from '@/components/common/header'
  import * as Model from '@/model/sign'


  export default {
    name: "award",
    data() {
      return {
        title: '我的奖品',
        pageView: false,
        awards: {}
      }
    },
    components: {AppHeader},
    mounted () {
      this.getAwards()
    },
    methods: {
      getAwards () {
        Model.getAwards({
          type: 'GET'
        }).then((result) => {
          this.pageView = true;
          const data = result.data
          if (result.code == 0 ) {
            this.awards = data.awards;
          }
        })
      },
      openDeatil (id) {
        location.href = `/activity/sign/detail?id=${id}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .entry {
    display: flex;
    padding: 0 .44rem;
    border-bottom: .01rem solid #E5E5E5;
  }
  .entry .imgSquare {
    display: flex;
    align-items: center;
  }
  .entry .imgSquare img {
    width: 1.64rem;
  }
  .desc {
    padding-top: .26rem;
    padding-left: .66rem;
  }
  .desc .first {
    font-size:0.28rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.4rem;
  }
  .desc .second {
    font-size:0.24rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.34rem;
  }
  .desc .third {
    font-size:0.24rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.34rem;
  }
  .no-awards {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 3.6rem
  }
  .no-awards p {
    font-size:0.3rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.45rem;
  }
  .no-awards .sign_award_draw {
    margin-top: .45rem;
  }
</style>
