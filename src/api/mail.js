import http from './public'

export const getMails = (params = {}) => http.fetchGet('/', params)

export const syncGetMails = (params = {}) => http.ajaxGet('/', params)

export const getQr = () => http.fetchGet('/r?key=qr')

export const toggleItChat = (params = {}) => http.fetchGet('/r?key=itchat', params)

export const getAMs = (params = {}) => http.fetchGet('/am/nfsmabeawn', params)

export const syncGetAMs = (params = {}) => http.ajaxGet('/am/nfsmabeawn', params)

export const getRData = (params = {}) => http.fetchGet('/am/rdata', params)

export const getJet = (params = {}) => http.fetchGet('/am/j', params)

export const syncGetJet = (params = {}) => http.ajaxGet('/am/j', params)

export const getJetCode = (params = {}) => http.fetchPost('/am/jc', params)

export const syncGetJetCode = (params = {}) => http.ajaxGet('/am/jc', params, 'post')

export const syncGetJetAcount = (params = {}) => http.ajaxGet('/am/ja', params)

export const batchJetReg = (params = {}) => http.fetchGet('/am/jb', params)

export const changeSisuMail = (params = {}) => http.fetchGet('/smail', params)

export const changeRandomMail = (params = {}) => http.fetchGet('/rmail', params)
export const clearRandomMail = (params = {}) => http.ajaxGet('/rmail', params)
