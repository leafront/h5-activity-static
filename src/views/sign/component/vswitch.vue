<template>
    <div style="position: absolute; top: 1.2rem; left: 5.8rem" v-if="direction.length > 0">
	<span class="weui-switch" :class="{'weui-switch-on' : isChecked}" @click="toggle">
		<div v-show="isChecked" class="selected">
			{{direction[0]}}
		</div>
		<div v-show="!isChecked" class="unselected">
			{{direction[1]}}
		</div>
	</span>
    </div>
</template>


<script>
    export default {
        name: 'vswitch',
        props: {
            initSwitch: {
                type: Boolean,
                default: false
            },
            isCancel: {
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
                isChecked: false,
            }
        },
        computed: {
            direction() {
                this.isChecked = this.initSwitch;
                if (this.text) {
                    return this.text.split('|')
                } else {
                    return []
                }
            }
        },
        watch: {
            isChecked(val) {
                this.$emit('change', val);
            },
            isCancel(val) {
                if (val) {
                    this.isChecked = false
                }
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
        width: 1.5rem;
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
        width: 1.5rem;
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
        background: #DDDDDD;
    }

    .weui-switch-on:after {
        background: #ffffff;
        transform: translateX(1.15rem);
    }

    .selected {
        position: absolute;
        color: #000;
        user-select: none;
        width: 1rem;
        height: 0.28rem;
        font-size: 0.2rem;
        font-weight: 400;
        left: .1rem;
        line-height: .35rem;
		text-align: center;
    }

    .unselected {
        position: absolute;
        left: .4rem;
        color: #000;
        text-align: right;
        user-select: none;
        width: 1rem;
        height: 0.28rem;
        font-size: 0.2rem;
        line-height: 0.35rem;
        font-weight: 400;
		text-align: center;
	}
</style>

