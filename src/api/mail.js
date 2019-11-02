import http from './public'

export const getMails = (params = {}) => http.fetchGet('/', params)
