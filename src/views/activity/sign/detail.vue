<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="poster"><img :src="awardDetail.imgSquareness"></div>
      <div class="title">奖品简介</div>
      <div class="sut-title">
        <div>名称：<p>{{awardDetail.name}}</p> </div>
        <div>面值：<p>{{awardDetail.value}}</p> </div>
        <div>使用门槛：<p>{{awardDetail.level}}</p> </div>
        <div>适用范围：<p>{{awardDetail.range}}</p> </div>
        <div>有效期至：<p>{{awardDetail.endTime | dateFormat('yyyy-MM-dd')}}</p> </div>
      </div>
      <div class="title">注意事项</div>
      <div class="sut-title">
        <p>{{awardDetail.description}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'
  import * as Model from '@/model/sign'


  export default {
    name: "detail",
    data() {
      return {
        title: '奖品详情',
        pageView: false,
        awardDetail: {}
      }
    },
    components: {AppHeader},
    created () {
      // console.log(location.href);
    },
    mounted () {
      let id = this.getQueryString('id')

      this.getAwardDeatil(id)
    },
    methods: {
      getAwardDeatil (pid) {
        Model.getAwardDeatil(pid,{
          type: 'GET'
        }).then((result) => {
          this.pageView = true;
          const data = result.data
          if (result.code == 0 ) {
            this.awardDetail = data;
          }
        })
      },
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
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
