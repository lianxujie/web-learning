import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例。可以对创建出来的实例进行自定义配置
// 好处:不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 50000
})

// 自定义配置
// 配置请求,响应,拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么(默认axios会多包装一层data，需要处理)
    const res = response.data
    console.log(res)
    if (res.status !== 200) {
      // 给提示
      // Tip:不可以使用this.$toast--当前的js文件不是vue组件的环境
      // 抛出一个错误的promise
      Toast(res.message)
      // 抛出一个错误的promise
      return Promise.reject(res.message)
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 导出配置好的实例
export default instance
