import Vue from 'vue'
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(
  function(config) {
    return config
  },
  function(err) {
    console.log(err)
  }
)

request.interceptors.response.use(
  function(res) {
    return res.data
  },
  function(err) {
    console.log(err)
  }
)

Vue.prototype.$request = request

// 获取封面
export function getBanner() {
  return request({
    url: '/banner'
  })
}
// 获取推荐歌单
export function getRecomandList(limit) {
  return request({
    url: `/personalized?limit=${limit}`
  })
}

// 获取推荐MV
export function getRecomandMvList() {
  return request({
    url: '/personalized/mv'
  })
}

// 获取推荐MV
export function getTopArtists(limit = 10) {
  return request({
    url: `/top/artists?offset=0&limit=${limit}`
  })
}

// 获取推荐新音乐
export function getNewSong(limit = 10) {
  return request({
    url: `/personalized/newsong?limit=${limit}`
  })
}

// 获取排行榜
export function getTopList() {
  return request({
    url: '/toplist'
  })
}
