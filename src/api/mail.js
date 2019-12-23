import http from './public'

export const getMails = (params = {}) => http.fetchGet('/', params)

export const getQr = () => http.fetchGet('/r?key=qr')

export const toggleItChat = (params = {}) => http.fetchGet('/r?key=itchat', params)

export const getAMs = (params = {}) => http.fetchGet('/am', params)

export const getRData = (params = {}) => http.fetchGet('/am/rdata', params)
