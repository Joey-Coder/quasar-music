import Vue from 'vue'
import axios from 'axios'

// 动态进度条

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

/**
 * 获取歌手热门歌曲和部分信息
 * @param {Number | String} id
 */
export function getHotSong(id) {
  return request({
    method: 'GET',
    url: `/artists?id=${id}`
  })
}

/**
 * 获取歌手推荐MV
 * @param {Number | String} id
 */
export function getHotMv(id) {
  return request({
    method: 'GET',
    url: `/artist/mv?id=${id}`
  })
}

/**
 * 获取歌手推荐MV
 * @param {Number | String} id
 */
export function getHotAlbum(id, limit = 10) {
  return request({
    method: 'GET',
    url: `/artist/album?id=${id}&limit=${limit}`
  })
}

/**
 * 获取相似歌手
 * @param {Number | String} id
 */
export function getSimiArtists(id) {
  return request({
    method: 'GET',
    url: `/simi/artist?id=${id}`
  })
}

/**
 * 获取MV详情
 * @param {Number | String} id
 */
export function getMvDetail(id) {
  return request({
    method: 'GET',
    url: `/mv/detail?mvid=${id}`
  })
}

/**
 * 获取MV播放地址
 * @param {Number | String} id
 */
export function getMvAddress(id, r) {
  return request({
    method: 'GET',
    url: `/mv/url?id=${id}&r=${r}`
  })
}

/**
 * 获取相似mv
 * @param {Number | String} id
 */
export function getSimiMv(id) {
  return request({
    method: 'GET',
    url: `/simi/mv?mvid=${id}`
  })
}

/**
 * 获取mv评论
 * @param {Number | String} id
 */
export function getMvComment(id, limit, offset, before) {
  return request({
    method: 'GET',
    url: `/comment/mv?id=${id}&limit=${limit}&offset=${offset}&before=${before}`
  })
}

/**
 * 获取mv评论，点赞数量
 * @param {Number | String} id
 */
export function getMvCommentLikeCount(id) {
  return request({
    method: 'GET',
    url: `/mv/detail/info?mvid=${id}`
  })
}

/**
 * 获取mv评论，点赞数量
 * @param {Number | String} id
 */
export function getAlbum(id) {
  return request({
    method: 'GET',
    url: `/album?id=${id}`
  })
}

/**
 * 检查音乐是否可用
 * @param {Number | String} id
 */
export function checkMusic(id) {
  return request({
    method: 'GET',
    url: `/check/music?id=${id}`
  })
}

/**
 * 获取音乐播放地址
 * @param {Number | String} id
 */
export function getMusicUrl(id) {
  return request({
    method: 'GET',
    url: `/song/url?id=${id}`
  })
}

/**
 * 获取歌曲评论
 * @param {Number | String} id
 */
export function getSongComment(id, limit = 20, offset = 0, before) {
  return request({
    method: 'GET',
    url: `/comment/music?id=${id}&limit=${limit}&offset=${offset}&before=${before}`
  })
}

/**
 * 获取相似mv
 * @param {Number | String} id
 */
export function getSimiSong(id) {
  return request({
    method: 'GET',
    url: `/simi/song?id=${id}`
  })
}
