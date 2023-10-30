<template>
  <div class="login">
    <!-- 头部 NavBar -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            type="inp"
            maxlength="11"
            placeholder="请输入手机号码"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text" />
          <button @click="getCode">
            {{
              second === totalSecond ? '获取验证码' : second + '秒后重新发送'
            }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, CodeLogin } from '@/api/login'

import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 3, // 总秒数
      second: 3,
      timer: null, // 定时器ID
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      smsCode: ''// 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标识

      Toast('获取图形验证码成功')
    },
    // 校验手机号和图形验证码是否合法
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 如果没通过校验
        return
      }
      // 当前没有定时器开启，且目前totalSecond和second 一致才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求(预期:希望如果响应的status非200，最好抛出一个promise错误，await只会等待正确的promise   )
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        console.log(res)
        this.$toast('短信发送成功，请注意查收')
        // 开启倒计时
        this.timer = setInterval(() => {
          console.log('正在倒计时')
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器 id
            this.second = this.totalSecond // 秒数归位
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return false
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的手机验证码')
        return false
      }
      const res = await CodeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast('登录成功')
      this.$router.push('/')
    }
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
