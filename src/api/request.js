import axios from 'axios'

axios.interceptors.response.use(res => {
  if (res.status && res.status === 200) {
    return res.data
  }
})

export const getRequest = function (url, params = {}) {
  return axios.get(url, params)
}
