<template>
  <q-page class="q-py-lg row justify-center">
    <div class="index-wrapper col-10">
      <div class="recommend-song-list">
        <show-items title="推荐歌单" :itemList="recomandList"></show-items>
      </div>
      <div class="recommend-mv-list">
        <show-items title="推荐MV" :itemList="recomandMvList"></show-items>
      </div>
      <div class="recommend-artists-list">
        <show-items
          title="热门歌手"
          :itemList="topArtistsList"
          circle
        ></show-items>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  getRecomandList,
  getRecomandMvList,
  getTopArtists
} from '../boot/axios'
import ShowItems from '../components/ShowItems'
export default {
  name: 'PageIndex',
  data() {
    return {
      recomandList: null,
      recomandMvList: null,
      topArtistsList: null
    }
  },
  methods: {
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
      console.log(this.recomandMvList)
    }
  },
  created() {
    // this.getBannerList()
    this.getRecomandList()
    this.getRecomandMvList()
    this.getTopArtistsList()
  },
  components: {
    ShowItems
  }
}
</script>

<style lang="scss" scoped>
.index-wrapper {
  // padding: 50px;
}
</style>
