<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <ul v-for="(item, index) in awards">
        <li><img :src="item.imgSquare"></li>
        <li>
          <p>{{item.name}}</p>
          <p>{{item.range}}</p>
          <p>{{item.endTime}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'
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
            console.log(`data${this.awardDetail}`);
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .poster {
    height: 2.3rem;
  }
  .poster img{
    height: 2.3rem;
  }
  .title {
    padding: .24rem .3rem;
    font-size:0.32rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:0.4rem;
    border-bottom: .01rem solid rgba(234,234,234,1);
  }
  .sut-title {
    margin: .24rem .3rem;
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.4rem;
  }
  .sut-title div p {
    display: inline-flex;
    width: 5.5rem;
  }

</style>
