import Vue from 'vue'
import axios from 'axios'

// 动态进度条
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// NProgress.inc()
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(
  function(config) {
    // NProgress.start(0.2)
    return config
  },
  function(err) {
    console.log(err)
  }
)

request.interceptors.response.use(
  function(res) {
    // NProgress.done()
    return res.data
  },
  function(err) {
    console.log(err)
  }
)

Vue.prototype.$request = request

// 获取封面
// export function getBanner() {
//   return request({
//     url: '/banner'
//   })
// }
// 获取推荐歌单
export function getRecomandList(limit) {
  return request({
    method: 'GET',
    url: `/personalized?limit=${limit}`
  })
}

// 获取推荐MV
export function getRecomandMvList() {
  return request({
    method: 'GET',
    url: '/personalized/mv'
  })
}

// 获取推荐MV
export function getTopArtists(limit = 10) {
  return request({
    method: 'GET',
    url: `/top/artists?offset=0&limit=${limit}`
  })
}

// 获取推荐新音乐
export function getNewSong(limit = 10) {
  return request({
    method: 'GET',
    url: `/personalized/newsong?limit=${limit}`
  })
}

// 获取排行榜
export function getTopList() {
  return request({
    method: 'GET',
    url: '/toplist'
  })
}

// 获取歌单详情
export function getListDetail(id) {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    params: { id }
  })
}

// 获取歌单所有歌曲
export function getListAllSong(ids) {
  return request({
    method: 'GET',
    url: `/song/detail?ids=${ids}`
  })
}
