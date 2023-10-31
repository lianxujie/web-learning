import request from '@/utils/request'

// 加入购物车
// goodsId =>商品id iphone8
// goodsSkid =>商品的规格id
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
