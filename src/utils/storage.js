const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
  // 如果是null或者undefined使用parse方法会报错
}
// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 搜索历史管理
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 获取搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
