<template >
<div class="f">
  <div class="progress">
    <div class="progress_color positioning">
    </div>
    <div class="flag_c positioning" v-show = "flagView">
      <div class="flag_img">
        <img src="./img/5.png" alt="">
      </div>
      <div class="flag_t">
        1人
      </div>
    </div>

    <div class="in_content positioning">
      <div class="im_text">
        <p class="t_size">10 <span>￥</span></p>
        <p class="t_size">满减券</p>
        <p class="t_size">3大爷</p>
      </div>
      <div class="p_circle " v-bind:class="{ ac_color: isActive }" >
        <span></span>
      </div>
      <div class="p_num">
        <span>2人</span>
      </div>
    </div>

    <div class="in_content positioning">
      <div class="im_text">
        <p class="t_size">10 <span>￥</span></p>
        <p class="t_size">满减券</p>
        <p class="t_size">3大爷</p>
      </div>
      <div class="p_circle " v-bind:class="{ ac_color1: isActive1 }">
        <span></span>
      </div>
      <div class="p_num">
        <span>2人</span>
      </div>
    </div>

    <div class="in_content positioning">
      <div class="im_text">
        <p class="t_size">10 <span>￥</span></p>
        <p class="t_size">满减券</p>
        <p class="t_size">3大爷</p>
      </div>
      <div class="p_circle " v-bind:class="{ ac_color2: isActive2 }">
        <span></span>
      </div>
      <div class="p_num">
        <span>2人</span>
      </div>
    </div>




  </div>
</div>
</template>

<script>
export default {
  props: {
    dynamicProgress: Object
  },
  components: {

  },
  data() {
    return {
     isActive : false,
     isActive1 : false,
     isActive2 : false,
     flagView: false
    }
  },
  methods: {
    dynamicPro() {
      console.log(123);
      var activityNumber = 7;
      var totaNumber = 16;
      var firstNumber = 4;
      var secondNumber = 8;
      var first_location = Math.round(firstNumber / totaNumber * 0.85 * 10000) / 100;
      var section_location = Math.round(secondNumber / totaNumber * 0.85 * 10000) / 100;
      var last_location = 85;
      var activity_location = Math.round(activityNumber / totaNumber * 0.85 * 10000) / 100;
      var e_progress_color = document.getElementsByClassName("progress_color"),
        e_in_content = document.getElementsByClassName("in_content"),
        e_flag_c = document.getElementsByClassName("flag_c");
      // barWidth = document.getElementsByClassName("progress")[0].scrollWidth;


      e_progress_color[0].style.width = activity_location + '%';
      e_flag_c[0].style.left = activity_location + '%';

      e_in_content[0].style.left = first_location + '%';
      e_in_content[1].style.left = section_location + '%';
      e_in_content[2].style.left = last_location + '%';


      if (activityNumber > totaNumber) {
        console.log(1);
        this.isActive = true;
        this.isActive1 = true;
        this.isActive2 = true;
        this.flagView = true;
        e_progress_color[0].style.width = "98%";
        e_flag_c[0].style.left = "98%";
      } else if (activityNumber == totaNumber) {
        console.log(2);
        this.isActive = true;
        this.isActive1 = true;
        this.isActive2 = true;
        this.flagView = false;
      }else if (secondNumber <= activityNumber && activityNumber < totaNumber) {
        console.log(3);

         if(secondNumber == activityNumber){
           this.isActive = true;
           this.isActive1 = true;
           this.isActive2 = false;
           this.flagView = false;
         }else {
           this.isActive = true;
           this.isActive1 = true;
           this.isActive2 = false;
           this.flagView = true;
         }
      }else if (firstNumber <= activityNumber && activityNumber < secondNumber) {
        console.log(4);
        if(firstNumber == activityNumber){
          this.isActive = true;
          this.isActive1 = false;
          this.isActive2 = false;
          this.flagView = false;
        }else {
          this.isActive = true;
          this.isActive1 = false;
          this.isActive2 = false;
          this.flagView = true;
        }
      } else if (activityNumber < firstNumber) {
        console.log(5);
        console.log('nima');
        this.isActive = false;
        this.isActive1 = false;
        this.isActive2 = false;
        this.flagView = true;
      }

    }

  },
  created() {
    // this.dynamicPro()

    setTimeout(() => {
      this.dynamicPro()
    }, 0)

  }
}
</script>

<style lang="scss">
img {
    display: block;
    width: 100%;
}

.f {
    width: 100%;

    background: #ffff;
}

.progress {
    background: #EAEAEA;
    position: relative;
    width: 85%;
    height: 0.2rem;
    margin: 2.5rem auto 0;
    border-radius: 1rem;
}

.positioning {
    position: absolute;

}

.progress_color {
    width: 70%;
    height: 100%;
    background:linear-gradient(to right,#FCBF2D,#FCB72C,#FCA129,#FC7E24,#FC7923);
    border-radius: 1rem;

}
// 对勾
.p_circle {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    background: #EAEAEA;
    margin: 0.2rem 0;
    position: relative
}
.p_circle span {
  width: .24rem;
height: .12rem;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-.1rem,-.06rem) rotate(-45deg);
    -ms-transform: translate(-.11rem,-.08rem) rotate(-45deg);
    transform: translate(-.11rem,-.08rem) rotate(-45deg)
}
.p_circle span:before {
    width: 3px;
    height: .12rem;
    left: 0
}

.p_circle span:after,.p_circle span:before {
    content: "";
    position: absolute;
    background: #EAEAEA;
    border-radius: .02rem
}

.p_circle span:after {
    width: .2rem;
    height: 3px;
    bottom: 0
}
.ac_color,.ac_color1, .ac_color2{
    background:linear-gradient(to right,#FCBF2D,#FCB72C,#FCA129,#FC7E24,#FC7923);
}
// 对勾结束
.flag_c,
.in_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transform: translate(-50%);
    // width: 1rem;
    // top: -1.8rem;
    // background-image: url("./img/1.png");
    // background-size: 100% 60%;
    // background-repeat: no-repeat;

}

.in_content {
    width: 1rem;
    top: -1.8rem;

}
.flag_c {
    height: 1.2rem;
    top: -.43rem;
    font-size: 0.2rem;
    color: #FF7C00;
}

.flag_img {
    width: 0.3rem;
}
.im_text {
    width: 1rem;
    height: 1.5rem;
    text-align: center;
    color: white;
    background-image: url("./img/1.png");
    background-size: 100%;
    background-repeat: no-repeat;

}
.im_text .t_size {
    line-height: 1;
    padding: 0.01rem 0;
    font-size: 0.2rem;
    margin: 0;

}
span {
    font-size: 0.2rem;
}

.im_text p:first-child {
    margin-top: 0.1rem;
    font-size: 0.45rem;
}
</style>
