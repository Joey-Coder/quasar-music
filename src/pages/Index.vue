<template>
  <q-page class="q-py-lg row justify-center">
    <div class="index-wrapper col-10">
      <!-- 推荐歌单 -->
      <div class="recommend-song-list">
        <show-items
          title="推荐歌单"
          :itemList="recomandList"
          path="playlist"
        ></show-items>
      </div>
      <!-- 推荐MV -->
      <div class="recommend-mv-list">
        <show-items
          title="推荐MV"
          :itemList="recomandMvList"
          path="mv"
        ></show-items>
      </div>
      <!-- 推荐歌手 -->
      <div class="recommend-artists-list">
        <show-items
          title="热门歌手"
          :itemList="topArtistsList"
          circle
          path="artist"
        ></show-items>
      </div>
      <!-- 推荐新歌 -->
      <div class="recommend-new-song">
        <show-items
          title="新歌速递"
          :itemList="recomandNewSong"
          path="song"
        ></show-items>
      </div>
      <!-- 排行榜单 -->
      <div class="top-list">
        <show-items title="排行榜" :itemList="topList"></show-items>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  getRecomandList,
  getRecomandMvList,
  getTopArtists,
  getNewSong,
  getTopList
} from '../boot/axios'
import ShowItems from '../components/ShowItems'

export default {
  name: 'PageIndex',
  data() {
    return {
      recomandList: null,
      recomandMvList: null,
      topArtistsList: null,
      recomandNewSong: null,
      topList: null
    }
  },
  methods: {
    changeProgress() {
      console.log(1)
    },
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getRecomandList() {
      const { code, result } = await getRecomandList(8)
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取推荐歌单失败', 'top')
      }
      this.recomandList = result
    },
    async getRecomandMvList() {
      const { code, result } = await getRecomandMvList()
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取推荐MV失败', 'top')
      }
      this.recomandMvList = result
    },
    async getTopArtistsList() {
      const { code, artists } = await getTopArtists()
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取热门歌手失败', 'top')
      }
      this.topArtistsList = artists
      // console.log(this.recomandMvList)
    },
    async getNewSongList() {
      const { code, result } = await getNewSong()
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取热门歌手失败', 'top')
      }
      this.recomandNewSong = result
    },
    async getTopList() {
      const { code, list } = await getTopList()
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取排行榜单失败', 'top')
      }
      this.topList = list.slice(0, 10)
    },
    showProgress() {
      const imgList = document.getElementsByClassName('q-img') // 图片集合
      const imgCount = imgList.length // 图片总数
      console.log('sdfdfs:' + imgCount)
      let imgLoad = 0 // 加载完成的图片数量

      for (let i = 0; i < imgCount; i++) {
        imgList[i].onload = () => {
          imgLoad++
          this.progress = imgLoad / imgCount
          console.log(imgLoad)
          if (imgLoad === imgCount) {
            this.loading = false
            this.display = true
            console.log('图片加载完成 展示组件')
          }
        }
        setTimeout(() => {
          if (!this.display) {
            this.loading = false
            this.display = !this.display
            console.log('超时 强制显示')
          }
        }, 10000)
      }
    }
  },
  created() {
    this.getRecomandList()
    this.getRecomandMvList()
    this.getTopArtistsList()
    this.getNewSongList()
    this.getTopList()
  },
  updated() {
    // this.showProgress()
  },

  components: {
    ShowItems
  }
}
</script>

<style lang="scss" scoped></style>
