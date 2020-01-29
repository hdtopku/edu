import axios from 'axios'
import baseUrl from './baseURL'
import $ from 'jquery'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'

export default {
  fetchGet (url, params = {}) {
    const requestUrl = baseUrl + url
    return new Promise((resolve, reject) => {
      axios.get(requestUrl, { params }).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    const requestUrl = baseUrl + url
    return new Promise((resolve, reject) => {
      axios.post(requestUrl, params).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  ajaxFetch (url, params = {}, type = 'get', async = false) {
    // axios不支持同步
    // vue-clipboard2不支持异步ajax复制
    // 为此新增这个方法(参考：https://www.jb51.net/article/124865.htm)
    var data = {}
    $.ajax({
      url: baseUrl + url,
      type: type, // 'get'、'post'
      async: async,
      data: params,
      dataType: 'json', // 返回格式
      success: res => {
        data = res
      },
      error: e => {
        data = e
      },
      timeout: 2500
    })
    return data
  }
}
