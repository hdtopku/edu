import http from './public'

export const getMails = (params = {}) => http.fetchGet('/', params)

export const syncGetMails = (params = {}) => http.ajaxFetch('/', params)

export const getQr = () => http.fetchGet('/r?key=qr')

export const toggleItChat = (params = {}) => http.fetchGet('/r?key=itchat', params)

export const getAMs = (params = {}) => http.fetchGet('/hdanewom', params)

export const syncGetAMs = (params = {}) => http.ajaxFetch('/hdanewom', params)

export const getRData = (params = {}) => http.fetchGet('/hdanewom/rdata', params)

export const getJet = (params = {}) => http.fetchGet('/hdanewom/j', params)

export const syncGetJet = (params = {}) => http.ajaxFetch('/hdanewom/j', params)

export const getJetCode = (params = {}) => http.fetchPost('/hdanewom/jc', params)

export const syncGetJetCode = (params = {}) => http.ajaxFetch('/hdanewom/jc', params, 'post')

export const syncGetJetAcount = (params = {}) => http.ajaxFetch('/hdanewom/ja', params)

export const batchJetReg = (params = {}) => http.fetchGet('/hdanewom/jb', params)

export const changeSisuMail = (params = {}) => http.fetchGet('/smail', params)
