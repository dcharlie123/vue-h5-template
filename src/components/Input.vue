<template>
    <div class="nv-input-box" :class="{disabled:disabled}">
        <span class="nv-placeholder" :class="small&&'small'">{{placeholder}}</span>
        <input
            class="nv-input"
            :value="value"
            :disabled="inputDisabled"
            type="text"
            @focus="focus"
            @blur="blur"
            @input="input($event)"
        />
        <nv-button
            class="nv-code-btn"
            :round="false"
            type="default"
            size="mini"
            v-if="type==='smsVerificationCode'"
            @click="getYzm"
            :disabled="yzmDisabled||!mobile"
        >{{yzmDisabled?second+'秒后重发':'获取验证码'}}</nv-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import NvButton from "@/components/Button.vue";
import { getVerifyCode } from "@/api/common/index";

export default {
    name: "Input",
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: ""
        },
        mobile: {
            type: String,
            default: ""
        },
        // 手机验证码发送渠道
        codeAction: {
            type: String,
            default: "default"
        },
        codeType: {
            type: String,
            default: "default"
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        inputDisabled() {
            return (
                this.disabled ||
                (this.type === "smsVerificationCode" && !this.yzmSucess)
            );
        }
    },
    data() {
        return {
            small: false, //提示文字是否变小
            yzmDisabled: false, //验证码按钮是否禁用
            second: 60, //倒计时秒数
            time: null, //计时器
            yzmSucess: false //验证码发送成功
        };
    },
    components: {
        "nv-button": NvButton
    },
    created() {},
    methods: {
        focus() {
            this.small = true;
        },
        blur() {
            if (!this.value) {
                this.small = false;
            }
        },
        input(e) {
            this.$emit("input", e.target.value);
        },
        getYzm() {
            let mobile = this.mobile,
                action = this.codeAction;
            if (mobile) {
                this.countdown();
                getVerifyCode({ mobile, action },this.codeType).then(
                    res => {
                        Toast(res.errmsg);
                        this.yzmSucess = true;
                    },
                    res => {
                        this.clearTime();
                    }
                );
            }
        },
        countdown() {
            this.yzmDisabled = true;
            this.time = setInterval(() => {
                this.second--;
                if (this.second === 0) {
                    this.clearTime();
                }
            }, 1000);
        },
        clearTime() {
            clearInterval(this.time);
            this.yzmDisabled = false;
            this.second = 60;
        }
    }
};
</script>

<style type="text/less" lang="less" scoped>
@import "../assets/css/common.less";
.nv-input-box {
    padding: 32px 10px 0;
    position: relative;
    &.disabled {
        opacity: 0.4;
    }
    .border-half-bottom(#31333d);
    .nv-placeholder {
        position: absolute;
        font-size: 30px;
        color: rgba(110, 113, 116, 1);
        z-index: -1;
        top: 56px;
        height: 40px;
        transition: font-size 0.3s, top 0.3s;
        &.small {
            font-size: 24px;
            top: 14px;
        }
    }
    .nv-input {
        background: none;
        outline: none;
        border: none;
        font-size: 30px;
        height: 40px;
        padding: 24px 0;
        color: @color-text-first;
        width: 100%;
    }
    .nv-code-btn {
        position: absolute;
        right: 0;
        top: 50px;
    }
}
</style>
