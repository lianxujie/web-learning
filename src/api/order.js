import request from '@/utils/request'

// 订单结算的接口
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart buynow
      delivery: 10, // 快递配送 20
      couponId: 0, // 优惠劵id
      isUsePoints: 0,
      ...obj// 将传过来的参数对象，动态展开
    }
  })
}
