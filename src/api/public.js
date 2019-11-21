import axios from 'axios'
import baseUrl from './baseURL'

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
  }
}
