export default {
  // 此处编写的是vue组件实例的配置项，通过一定的语法，可以直接混入到组件内
  // data methods,computed, 生命周期函数
  // 1.如果此处和组件内，提供了同名的data和methods，则组件内优先级更高
  // 2.如果编写了生命周期函数，则mixins中的生命周期函数和页面中的生命周期函数，会用数组管理，并且统一执行
  created () {
    console.log('嘎嘎你好')
  },
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
    sayhi () {
      console.log('你好')
    }
  },
  loginConfirm () {
    // 1.判断token是否存在,如果token不存在，弹消息对象
    // 2.如果token存在，继续请求操作
    if (!this.$store.getters.token) {
      // 弹确认框
      console.log('bu正常请求')
      this.$dialog.confirm({
        title: '温馨提示',
        message: '此时需要先登录才能继续操作哦',
        confirmButtonText: '去登录',
        cancelButtonText: '再逛逛'

      }).then(() => {
        // 如果希望跳转到登录，并且登录后能回跳回来,
        // 需要在跳转的时候携带参数(当前的路径地址)
        // this.$router.push('/login'
        this.$router.replace(
          {
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          }
        )
      }).catch(() => { })
      return true
    }
    return false
  }
}
