<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper koi-view" :class="{'visibility': pageView}">
      <div class="koi__banner">
        <img class="koi__banner--pic" src="./images/koi_bg.jpg"/>
        <h4 class="koi__banner--tit font-xb">11.11超值券获取攻略</h4>
        <p class="koi__banner--txt font-s">种子券收集时间:10.22～11.13</p>
      </div>
      <div class="koi-nav">
        <div class="koi-nav__item">
          <p>种子券收集</p>
          <span>10.22-11.13</span>
          <i class="koi-nav__item--circle"></i>
        </div>
        <div class="koi-nav__item">
          <p>翻倍锦鲤券合成</p>
          <span>11.7-11.13</span>
          <i class="koi-nav__item--circle"></i>
        </div>
        <div class="koi-nav__item">
          <p>翻倍锦鲤券使用</p>
          <span>11.7-11.13</span>
          <i class="koi-nav__item--circle"></i>
        </div>
        <div class="koi-nav__line"></div>
      </div>
      <div class="koi-des">
        <i class="koi-des__bg1"></i>
        <i class="koi-des__bg2"></i>
        <div class="koi-des__title">
          <span>锦</span>
          <span>鲤</span>
          <span>大</span>
          <span>礼</span>
          <span>包</span>
        </div>
        <div class="koi-des__txt">
          <p class="font-s">仅限1张 11.11日合成</p>
          <i class="koi-des__txt--line"></i>
        </div>
      </div>
      <div class="koi-discount">
        <i class="koi-discount--icon koi-discount--icon1"></i>
        <div class="koi-discount__wrapper">
          <div class="koi-discount__des">
            <img src="./images/koi_shop.png"/>
            <div class="koi-discount__txt">
              <h5>戴森吹风机<i>（兑换券）</i></h5>
              <p>种子券¥120以上有机会合成</p>
            </div>
          </div>
        </div>
        <i class="koi-discount--icon koi-discount--icon2"></i>
      </div>
      <div class="koi-discount__list">
        <div class="koi-discount__item">
          <i class="koi-discount--icon koi-discount--icon3"></i>
          <div class="koi-discount__cont--wrapper">
            <div class="koi-discount__cont">
              <div class="koi-discount__price">
                <i class="font-xb">¥</i>
                <p>200</p>
              </div>
              <div class="koi-discount__price--des">
                <span>满299元可用</span>
                <p>种子券¥100以上可合成</p>
              </div>
            </div>
          </div>
          <i class="koi-discount--icon koi-discount--icon4"></i>
        </div>
        <div class="koi-discount__item">
          <i class="koi-discount--icon koi-discount--icon3"></i>
          <div class="koi-discount__cont--wrapper">
            <div class="koi-discount__cont">
              <i class="koi-discount__cont--tag">免单券</i>
              <div class="koi-discount__price">
                <i class="font-xb">¥</i>
                <p>200</p>
              </div>
              <div class="koi-discount__price--des">
                <span>满299元可用</span>
                <p>种子券¥100以上可合成</p>
              </div>
            </div>
          </div>
          <i class="koi-discount--icon koi-discount--icon4"></i>
        </div>
        <div class="koi-discount__item">
          <i class="koi-discount--icon koi-discount--icon3"></i>
          <div class="koi-discount__cont--wrapper">
            <div class="koi-discount__cont">
              <div class="koi-discount__price">
                <i class="font-xb">¥</i>
                <p>200</p>
              </div>
              <div class="koi-discount__price--des">
                <span>满299元可用</span>
                <p>种子券¥100以上可合成</p>
              </div>
            </div>
          </div>
          <i class="koi-discount--icon koi-discount--icon4"></i>
        </div>
        <div class="koi-discount__item">
          <i class="koi-discount--icon koi-discount--icon3"></i>
          <div class="koi-discount__cont--wrapper">
            <div class="koi-discount__cont">
              <div class="koi-discount__price">
                <i class="font-xb">¥</i>
                <p>200</p>
              </div>
              <div class="koi-discount__price--des">
                <span>满299元可用</span>
                <p>种子券¥100以上可合成</p>
              </div>
            </div>
          </div>
          <i class="koi-discount--icon koi-discount--icon4"></i>
        </div>
        <div class="koi-discount__item">
          <i class="koi-discount--icon koi-discount--icon3"></i>
          <div class="koi-discount__cont--wrapper">
            <div class="koi-discount__cont">
              <div class="koi-discount__price">
                <i class="font-xb">¥</i>
                <p>200</p>
              </div>
              <div class="koi-discount__price--des">
                <span>满299元可用</span>
                <p>种子券¥100以上可合成</p>
              </div>
            </div>
          </div>
          <i class="koi-discount--icon koi-discount--icon4"></i>
        </div>
        <div class="koi-discount__item">
          <i class="koi-discount--icon koi-discount--icon3"></i>
          <div class="koi-discount__cont--wrapper">
            <div class="koi-discount__cont">
              <div class="koi-discount__price">
                <i class="font-xb">¥</i>
                <p>200</p>
              </div>
              <div class="koi-discount__price--des">
                <span>满299元可用</span>
                <p>种子券¥100以上可合成</p>
              </div>
            </div>
          </div>
          <i class="koi-discount--icon koi-discount--icon4"></i>
        </div>
      </div>
      <div class="koi-strategy">
        <div class="koi-strategy__tit">
          <span>种</span>
          <span>子</span>
          <span>券</span>
          <span>收</span>
          <span>集</span>
          <span>攻</span>
          <span>略</span>
        </div>
        <div class="koi-strategy__list">
          <div class="koi-strategy__item">
            <strong class="koi-strategy__tag">攻略1</strong>
            <div class="koi-strategy__discount">
              <h5><i>¥</i>20<span>种子券</span></h5>
              <p>分享一次 即可获得20张¥1种子券 </p>
            </div>
            <div class="koi-strategy__action">
              <span class="disabled font-b">去分享</span>
            </div>
          </div>
          <div class="koi-strategy__item">
            <strong class="koi-strategy__tag">攻略2</strong>
            <div class="koi-strategy__discount">
              <h5><i>¥</i>1<span>种子券</span></h5>
              <p>每天限领一次 </p>
            </div>
            <div class="koi-strategy__action">
              <span class="font-b">去分享</span>
            </div>
          </div>
        </div>
        <div class="koi-strategy-three">
          <strong class="koi-strategy__tag">攻略3</strong>
          <div class="koi-strategy-three__txt">
            <h5>3积分兑换3元种子券</h5>
            <span>(每日限兑换一次)</span>
            <p class="font">今日剩余 <i>320</i> 张</p>
          </div>
          <div class="koi-strategy-three__action">
            <span class="font-xb">兑换</span>
          </div>
        </div>
        <div class="koi-strategy-four">
          <strong class="koi-strategy__tag">攻略4</strong>
          <div class="koi-strategy-four__txt">
            <h5>下单返券</h5>
            <i>(外卖,团购订单除外）</i>
            <p>APP 内订单支付成功1次,返10元无门槛券</p>
          </div>
          <div class="koi-strategy-four__action">
            <span class="font-xb">去购物</span>
          </div>
        </div>
      </div>
      <div class="koi-seed">
        <div class="koi-seed__title">
          <span>我</span>
          <span>的</span>
          <span>种</span>
          <span>字</span>
          <span>券</span>
        </div>
        <div class="koi-seed__pic">
          <div class="koi-seed__item">
            <img src="./images/koi_discount_amount_01.png"/>
            <span>1</span>
          </div>
          <div class="koi-seed__item">
            <img src="./images/koi_discount_amount_02.png"/>
            <span>0</span>
          </div>
          <div class="koi-seed__item">
            <img src="./images/koi_discount_amount_03.png"/>
            <span>0</span>
          </div>
          <div class="koi-seed__item">
            <img src="./images/koi_discount_amount_04.png"/>
            <span>4</span>
          </div>
        </div>
        <div class="koi-seed__des">
          <span>已获得种子券 12 张</span>
          <strong>共计 62 元</strong>
        </div>
        <div class="koi-seed__action">
          <span>立即合成</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .koi-seed__action{
    padding-top: .32rem;
    display: flex;
    justify-content: center;
    span{
      width: 2.82rem;
      height: .65rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .38rem;
      color: #a30001;
      background: linear-gradient(to top,#F1AE5D,#F5C786);
      border-radius: .1rem;
    }
  }
  .koi-seed__des{
    margin-top: .36rem;
    width: 100%;
    height: .58rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: .02rem solid #e0936c;
    border-radius: .1rem;
    position: relative;
    background: #960508;
    padding: 0 .14rem;
    color: #fbfaf9;
    &:before,&:after{
      bottom: 98%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      margin-top: .02rem;
      position: absolute;
    }
    &:after{
      border-color: rgba(150, 5, 8, 0);
      border-bottom-color: #960508;
      border-width: .2rem;
      margin-left: -.2rem;
    }
    &:before{
      border-color: rgba(224, 147, 108, 0);
      border-bottom-color: #e0936c;
      border-width: .24rem;
      margin-left: -.24rem;
    }
  }
  .koi-seed{
    margin: .8rem .2rem .6rem;
    padding: .72rem .26rem .26rem;
    background: #960508;
    border: .06rem solid #850002;
    border-radius: .1rem;
    position: relative;
    &__pic{
      display: flex;
      justify-content: space-around;
    }
    &__item{
      position: relative;
      img{
        width: 1.42rem;
        height: 1.42rem;
      }
      span{
        display: block;
        width: .4rem;
        height: .4rem;
        background: #ffd6a4;
        border-radius: 50%;
        position: absolute;
        transform: translate(50%,-50%);
        right: 0;
        top: 0;
        font-size: .25rem;
        color: #804922;
        text-align: center;
        line-height: .4rem;
      }
    }
    &__title{
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-50%);
      span{
        width: .64rem;
        height: .64rem;
        font-size: .38rem;
        color: #b90a04;
        border-radius: 50%;
        box-shadow: .03rem .03rem .1rem .01rem rgb(96,30,23);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .05rem;
        background:linear-gradient(to left,#FFAB7C,#FED99F);
      }
    }
  }
  .koi-strategy-four {
    background: linear-gradient(to top,#fea744,#fecd87);
    margin-top: .26rem;
    padding: .4rem .2rem .24rem .45rem;
    border-radius: .1rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    &__action {
      display: flex;
      text-align: center;
      align-items: center;
      span {
        display: block;
        width: 2.06rem;
        height: .62rem;
        line-height: .62rem;
        color: #fff;
        background: #c60000;
        border-radius: .1rem;
        &.disabled {
          background: #D4D3D3;
          &:after {
            display: none;
          }
        }
        &:after {
          content: '';
          display: inline-block;
          margin-left: .13rem;
          width: .15rem;
          height: .23rem;
          background: url(./images/koi_index_sprite.png) no-repeat -1.18rem -3.13rem;
          background-size: 2.1rem auto;
        }
      }
    }
    &__txt {
      display: flex;
      flex-direction: column;
      position: relative;
      h5 {
        font-size: .34rem;
        color: #be0000;
        position: relative;
        top: -.1rem;
      }
      i{
        color: #be0000;
        display: block;
        width: 4rem;
        font-size:.41rem;
        transform-origin: 0 0;
        transform: scale(.5);
        position: absolute;
        left: 1.6rem;
        top: 0;
      }
      p {
        width: 9rem;
        color: #c50000;
        font-size: .41rem;
        transform-origin: 0 0;
        transform: scale(.5);
        position: absolute;
        left: 0;
        top: .4rem;
      }
    }
  }
  .koi-strategy-three{
    background: #ff1422;
    margin-top: .26rem;
    padding: .36rem .2rem .24rem .45rem;
    border-radius: .1rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    &__action{
      display: flex;
      text-align: center;
      align-items: center;
      span{
        display: block;
        width: 2.06rem;
        height: .62rem;
        line-height: .62rem;
        color: #c60000;
        background: #febf6e;
        border-radius: .1rem;
        &.disabled{
          background: #D4D3D3;
          &:after{
            display: none;
          }
        }
        &:after{
          content: '';
          display: inline-block;
          margin-left: .13rem;
          width: .15rem;
          height: .23rem;
          background: url(./images/koi_index_sprite.png) no-repeat -1.37rem -3.14rem;
          background-size: 2.1rem auto;
        }
      }
    }
    &__txt{
      display: flex;
      flex-direction: column;
      position: relative;
      h5{
        font-size: .34rem;
        color: #fbecec;
      }
      span{
        font-size: .32rem;
        position: absolute;
        left:0;
        top: .45rem;
        transform-origin: 0 0;
        transform: scale(.5);
        color: #fbecec;
      }
      p{
        padding-top: .2rem;
        color: #feca82;
        i{
          color: #fff;
        }
      }
    }
  }
  .koi-strategy__discount{
    padding: 0 .18rem .1rem;
    background: #f11425;
    height: 1.32rem;
    position: relative;
    h5{
      font-size: .78rem;
      color: #f3edbf;
      border-bottom: .02rem dashed #f3edbf;
      text-align: center;
      i{
        font-size: .34rem;
        padding-right: .08rem;
      }
      span{
        font-size: .3rem;
        padding-left: .08rem;
      }
    }
    p{
      position: absolute;
      left: .12rem;
      width: 6rem;
      text-align: center;
      color: #f3edbf;
      font-size: .36rem;
      transform: scale(.5) translateX(-50%);
      transform-origin: 50% 50%;
      bottom: -.06rem;
    }
  }
  .koi-strategy{
    margin: .68rem .2rem 0;
    padding: .54rem .2rem .36rem;
    border-radius: .2rem;
    border: .02rem solid #e5764a;
    position: relative;
    &__tag{
      position: absolute;
      left: .09rem;
      top: .06rem;
      transform: scale(.5);
      transform-origin: 0 0;
      font-size: .3rem;
      color: #faf0d2;
      width: 1rem;
      height: .44rem;
      background: #9e0307;
      border-radius: .2rem;
      z-index:10;
      text-align: center;
    }
    &__action{
      padding: .1rem .38rem;
      background: #fcc67b;
      text-align: center;
      span{
        display: block;
        width: 2.42rem;
        height: .62rem;
        line-height: .62rem;
        color: #fff;
        background: #c40000;
        border-radius: .1rem;
        &.disabled{
          background: #dd8862;
          &:after{
            display: none;
          }
        }
        &:after{
          content: '';
          display: inline-block;
          margin-left: .13rem;
          width: .15rem;
          height: .23rem;
          background: url(./images/koi_index_sprite.png) no-repeat -1.18rem -3.13rem;
          background-size: 2.1rem auto;
        }
      }
    }
    &__list{
      display: flex;
      justify-content: space-between;
    }
    &__item{
      width: 48.5%;
      position: relative;
    }
    &__tit{
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-50%);
      span{
        width: .64rem;
        height: .64rem;
        font-size: .38rem;
        color: #b90a04;
        border-radius: 50%;
        box-shadow: .03rem .03rem .1rem .01rem rgb(96,30,23);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .05rem;
        background:linear-gradient(to left,#FFAB7C,#FED99F);
      }
    }

  }
  .koi-discount__price--des{
    padding-left: .08rem;
    border-left: 2px dashed #bd0004;
    width: 100%;
    position: relative;
    display: flex;
    height: .6rem;
    margin-left: -.02rem;
    span{
      color: #bd0004;
      display: block;
      width: 1.5rem;
      font-size: .26rem;
      margin-top: -.06rem;
    }
    p{
      width: 3.3rem;
      height: .6rem;
      background: linear-gradient(to top, #BA0000,#D50000);
      border-radius: .6rem;
      text-align: center;
      line-height: .6rem;
      font-size: .3rem;
      transform: scale(.5);
      color: #fff;
      position: absolute;
      left:.05rem;
      top:.32rem;
      transform-origin: 0 0;
    }
  }
  .koi-discount{
    margin: 0 .3rem;
    display: flex;
    position: relative;
    &__price{
      color: #bd0004;
      display: flex;
      position: relative;
      left: -.08rem;
      padding-top: .05rem;
      i{
        position: relative;
        top: .3rem;
      }
      p{
        font-size: .65rem;
      }
    }
    &__list{
      margin: .23rem .2rem  0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &__item{
      display: flex;
      width: 49.5%;
      margin-bottom: .21rem;
    }
    &__cont--wrapper{
      display: flex;
      padding: .03rem 0 .02rem 0;
      background:linear-gradient(to top, #FFAD59,#F7D087);
      flex:1;
      height: 1.34rem;
      margin-left: -.01rem;
    }
    &__cont{
      display: flex;
      flex:1;
      border-top: .03rem solid #bd0004;
      border-bottom: .03rem solid #bd0004;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &--tag{
        font-size: .37rem;
        color: #bd0004;
        position: absolute;
        top: .08rem;
        left: .15rem;
        transform-origin: 0 0;
        transform: scale(.5);
      }
    }
    &__txt{
      height: 100%;
      margin-left: .1rem;
      border-left: .02rem dashed #bd0004;
      padding-left: .22rem;
      width: 3.68rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h5{
        font-size: .46rem;
        color: #BD0004;
        width: 3.6rem;
        i{
          font-size: .23rem;
        }
      }
      p{
        margin-top: .2rem;
        width: 100%;
        height: .58rem;
        background: linear-gradient(to top, #BA0000,#D50000);
        border-radius: .3rem;
        text-align: center;
        line-height: .58rem;
        color: #fff;
      }
    }
    &__wrapper{
      display: flex;
      padding: .07rem 0 .09rem 0;
      background:linear-gradient(to top, #FFAD59,#F7D087);
      flex:1;
      height: 2.61rem;
      margin-left: -.01rem;
    }
    &__des{
      display: flex;
      border-top: .03rem solid #bd0004;
      border-bottom: .03rem solid #bd0004;
      flex:1;
      padding: .29rem 0;
      align-items: center;
      img{
        margin-left: .1rem;
        width: 1.9rem;
        height: 2.28rem;
      }
    }
    &--icon{
      background: url(./images/koi_index_sprite.png) no-repeat;
      background-size: 2.1rem auto;
    }
    &--icon1{
      width: .52rem;
      height: 2.61rem;
      background-position:  -.03rem -.88rem;
    }
    &--icon2{
      width: .52rem;
      height: 2.61rem;
      background-position: -.59rem -.88rem;
      margin-left: -1px;
    }
    &--icon3{
      width: .25rem;
      height: 1.34rem;
      background-position: -1.15rem -1rem;
    }
    &--icon4{
      width: .25rem;
      height: 1.34rem;
      background-position: -1.43rem -1rem;
    }
  }
  .koi-des__txt{
    width: 3.58rem;
    height: .65rem;
    border-radius:26px 26px 0px 0px;
    border: .02rem solid #f9c97d;
    border-bottom: 0;
    margin:.3rem auto 0;
    display: flex;
    justify-content: center;
    padding: .12rem .15rem 0;
    position: relative;
    &--line{
      width: 3.3rem;
      height: 0;
      border-bottom: .01rem dashed #f9c97d;
      position: absolute;
      left: .1rem;
      bottom: .08rem;
    }
    p{
      color: #ffd199;
      &:before,&:after{
        content: '';
        width: .34rem;
        height: .23rem;
        background:url(./images/koi_index_sprite.png) no-repeat;
        background-size: 2.1rem auto;
        display: inline-block;
      }
      &:before{
        background-position: -1.22rem -2.44rem;
        margin-right: .05rem;
      }
      &:after{
        background-position: -1.22rem -2.8rem;
        margin-left: .05rem;
      }
    }
  }
  .koi-des{
    padding-top: .38rem;
    position: relative;
    &__bg1{
      background:url(./images/koi_index_sprite.png) no-repeat  0 -.03rem;
      background-size: 2.1rem auto;
      position: absolute;
      left:0;
      top: .46rem;
      width: 1.18rem;
      height: .82rem;

    }
    &__bg2{
      background:url(./images/koi_index_sprite.png) no-repeat -1.2rem -.01rem;
      background-size: 2.1rem auto;
      width: .9rem;
      height: .9rem;
      position: absolute;
      right: .75rem;
      top: .78rem;
    }
    &__title{
      display: flex;
      justify-content: center;
      span{
        width: .64rem;
        height: .64rem;
        font-size: .38rem;
        color: #b90a04;
        border-radius: 50%;
        box-shadow: .03rem .03rem .1rem .01rem rgb(96,30,23);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .05rem;
        background:linear-gradient(to left,#FFAB7C,#FED99F);
      }
    }
  }
  .koi-nav{
    margin: 0 .2rem;
    display: flex;
    border-radius: .1rem;
    position: relative;
    background: #5f0500;
    border: .02rem solid rgba(249,201,125,.45);
    &__item{
      flex: 1;
      height: 1.27rem;
      padding: .18rem .2rem;
      color: #F3EDBF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &--circle{
        width: .23rem;
        height: .23rem;
        background: #feb964;
        border-radius:50%;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        z-index: 20;
      }
    }
    &__line{
      width: 86%;
      height: .04rem;
      position: absolute;
      background: #feb964;
      left: .55rem;
      top: 50%;
      transform: translateY(-.01rem);
      z-index: 10;
    }
  }
  .koi-view{
    background: #bd0004;
  }
  .koi__banner{
    width: 100%;
    position: relative;
    &--pic{
      width: 100%;
      height: 6.4rem;
    }
    &--tit{
      width:3.82rem;
      height:.68rem;
      line-height: .68rem;
      background:linear-gradient(to left,rgba(237,17,0,1),rgba(239,3,7,1));
      box-shadow:0 .02rem .1rem .02rem rgba(96,30,23,0.26);
      border-radius:.34rem;
      color: #F3EDBF;
      text-align: center;
      position: absolute;
      left: 50%;
      top: .07rem;
      transform: translateX(-50%);
    }
    &--txt{
      position: absolute;
      left: 48%;
      top: 3.96rem;
      transform: translateX(-50%);
      color: #EBB282;
      text-align: center;
    }
  }
</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  import * as Model from '@/model/koi'

  export default {
    data () {
      return {
        title: '锦鲤券',
        pageView: true,
        isBorder: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back()
        } else {
          location.href = '/index.html'
        }
      },
      getKoiIndex () {
        Model.getKoiIndex({
          type: 'GET'
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {

          } else {

          }
        })
      }
    },
    created () {

    }
  }

</script>
