/**
 * 存储localStorage
 */
export const setStore = (key, content) => {
  if (!key) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(key, content)
}

/**
 * 获取localStorage
 */
export const getStore = key => {
  if (!key) return
  var val = localStorage.getItem(key) || '[]'
  if (localStorage.getItem(key) && localStorage.getItem(key) !== 'undefined') {
    if (typeof content === 'string') {
      return JSON.parse(val)
    }
    return val
  }
  return undefined
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
