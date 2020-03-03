// 封装所有  localStorage  方法

// 增
export function setLocal (key, value) {
  // 保存数据
  // 只能存储字符串
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 删
export function delLocal (key) {
  // 删除数据
  window.localStorage.removeItem(key)
}
// 查
export function getLocal (key) {
  // 取出 localstorage 中的数据
  // 所以需要将得到的数据返回给外界 return
  return JSON.parse(window.localStorage.getItem(key))
}
