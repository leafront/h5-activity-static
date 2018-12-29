<template>
  <div style="position: absolute; top: 1.2rem; left: 6rem">
	    <span class="weui-switch" :class="{'weui-switch-on' : isChecked}" :value="value" @click="toggle">
			<div v-if="isChecked && direction.length > 0" class="selected">
				{{direction[0]}}
			</div>
			<div v-if="!isChecked && direction.length > 0" class="unselected">
				{{direction[1]}}
			</div>
	    </span>
  </div>
</template>


<script>
  export default {
    name: 'vswitch',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isChecked: this.value
      }
    },
    computed: {
      direction() {
        if (this.text) {
          return this.text.split('|')
        } else {
          return []
        }
      }
    },
    watch: {
      value(val) {
        this.isChecked = val
      },
      isChecked(val) {
        this.$emit('change', val);
      }
    },
    methods: {
      toggle() {
        this.isChecked = !this.isChecked;
        this.$emit('changeSwitch', this.isChecked);
      }
    }
  }
</script>


<style scoped lang="scss">
  .weui-switch {
    display: block;
    position: relative;
    width: 1.36rem;
    height: 0.36rem;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: .2rem;
    box-sizing: border-box;
    /*background-color: #DFDFDF;*/
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }

  .weui-switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 1.36rem;
    height: 0.36rem;
    border-radius: .2rem;
    background-color: #FDFDFD;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }

  .weui-switch:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.36rem;
    height: 0.36rem;
    border-radius: .2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }

  .weui-switch-on {
    border-color: #6F6F6F;
    /*background-color: #1AAD19;*/
  }

  .weui-switch-on:before {
    /*border-color: #1AAD19;*/
    background: #F8E71C;
  }

  .weui-switch-on:after {
    background: #ffffff;
    transform: translateX(1rem);
  }

  .selected {
    position: absolute;
    color: #000;
    user-select: none;
    width: .8rem;
    height: 0.28rem;
    font-size: 0.2rem;
    line-height: 0.28rem;
    font-weight: 400;
    left: .1rem;
    line-height: .35rem;
  }

  .unselected {
    position: absolute;
    left: .4rem;
    color: #000;
    text-align: right;
    user-select: none;
    width: .8rem;
    height: 0.28rem;
    font-size: 0.2rem;
    line-height: 0.35rem;
    font-weight: 400;
  }
</style>

