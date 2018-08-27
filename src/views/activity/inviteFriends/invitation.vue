<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper visibility">
    <div class="invitation_c">
      <div class="head_img">
        <img src="./images/1.png" alt="">
      </div>
      <div class="section_f">
        <div class="f_h">
          <img src="./images/2.png" alt="">
          <p class="header_t">新人专享88元优惠</p>

        </div>
        <div class="f_b">
          <p class="b_text1 ">每邀请1人 获赠一张5元优惠券</p>
          <ProgressBar></ProgressBar>
          <p class="b_text2">再邀请 3 人，可额外获得 20元优惠券</p>
          <p class="b_text3 first_t">立即邀请</p>
          <p class="b_text4 first_t">生成我的邀请码</p>
        </div>
      </div>
<!-- 第二部分 -->
      <div class="section_f">
        <div class="f_h">
          <img src="./images/2.png" alt="">
          <p class="header_t">当月战绩</p>
        </div>
        <div class="f_b f_ele">
          <div class="l_cont">
            <p class="text_p color_p">30元</p>
            <p class="text_p">优惠券收益</p>
          </div>
          <div class="l_cont r_cont">
            <p class="  text_p color_p">8人</p>
            <p class="text_p">成功邀请</p>
          </div>
        </div>
      </div>

<!-- 第三部分 -->
      <div class="section_f">
        <div class="f_h">
          <img src="./images/2.png" alt="">
          <p class="header_t">当月邀请TOP榜</p>
        </div>

        <div class="f_b third_b">
          <div class="f_b_img">
            <img src="./images/3.png" alt="">
          </div>
          <div class="winner_title">
            <div class="l_title">
              用户账号
            </div>
            <div class="l_title r_title">
              活动月邀请
            </div>

          </div>
          <div class="winner_c">
            <div class="wc_l">
              <div class="l_wc_img">
                <img src="./images/5.png" alt="">
              </div>
              <div class="winner_ih">
                1111111111111
              </div>
            </div>

            <div class="join_nu">
              188人
            </div>
          </div>

          <div class="winner_c">
            <div class="wc_l">
              <div class="l_wc_img">
                <img src="./images/5.png" alt="">
              </div>
              <div class="winner_ih">
                1111111111111
              </div>
            </div>

            <div class="join_nu">
              188人
            </div>
          </div>

          <!-- 数字 -->
          <div class="winner_c">
            <div class="wc_l">
              <div class="l_wc_num">
               2
              </div>
              <div class="winner_ih">
                1111111111111
              </div>
            </div>

            <div class="join_nu">
              188人
            </div>
          </div>

          <div class="winner_c">
            <div class="wc_l">
              <div class="l_wc_num">
               2
              </div>
              <div class="winner_ih">
                1111111111111
              </div>
            </div>

            <div class="join_nu">
              188人
            </div>
          </div>

        </div>

      </div>
      <div class="bottom_li">
        — Hi ! 你碰到我的底线了 —

      </div>

    </div>

  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'
import ProgressBar from '@/components/invitation/progress'

import * as Model from '@/model/worldcup'

import utils from '@/widget/utils'

export default {
  data() {
    return {
      title: "邀请好友"
    }
  },
  components: {
    AppHeader,
    ProgressBar
  },
  methods: {
    /**
     * 获取个人获得的奖品列表
     */

    /**
     * 切换规则弹层信息
     * params {Boolean} val
     */

    /**
     * 获取滚动奖品文字内容
     */


  },
  created() {

  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
.invitation_c {
    background: #FF6D00;
    padding-bottom: .45rem;

}
.section_f{
  margin-bottom: .35rem;
}

.f_b {

    background: #FFFFFF;
    width: 90%;
    margin: auto;
    border-radius: 0.3rem;
    padding-bottom: 0.5rem;
}
.f_ele , .winner_title , .winner_c{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: .8rem;
}
.winner_c{
  padding-top: .1rem;
  padding-bottom: .1rem;
}
 .text_p{
  width: max-content;
  font-size: .3rem;
  margin: 0   auto .3rem;
  line-height: 1.5;
}
.color_p{
  color: #FF7C00;
  font-size: .4rem;
}
.r_cont{
  border-left: solid 2px #EAEAEA;
}
.l_cont , .l_title , .wc_l  , .join_nu{
  flex: 1 1 auto;
}

.b_text1 {
    width: max-content;
    font-size: 0.25rem;
    margin: auto;
    padding-top: 0.7rem;
    color: #FF6D00;
}
.b_text2 {

    width: max-content;
    font-size: 0.25rem;
    margin: 1rem auto auto;
}
.b_text3 {

    color: white;

    background: linear-gradient(to right , #FCBF2D,#FCB72C,#FCA129,#FC7E24,#FC7923);
    border-radius: 0.5rem;
    margin-top: 0.5rem;
}

.b_text4 {
    color: #FF7C00;
    border: solid 2px #FF7C00;
    padding: 0.1rem 1rem;

}
.third_b{
  padding-top: .7rem;
}
.f_b_img{
  width: 90%;
  margin: auto;
}
</style>
