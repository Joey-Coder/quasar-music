<template>
  <q-page class="search q-py-lg row justify-center">
    <div class="search-wrapper col-10">
      <!-- 搜索歌手 -->
      <div class="search-artist relative-position">
        <q-chip
          v-if="!$q.screen.lt.sm"
          icon="search"
          color="primary"
          text-color="white"
          >{{ keywords }}的搜索结果</q-chip
        >
        <show-items
          title="搜索歌手"
          :itemList="searchArtists"
          circle
          path="artist"
        ></show-items>
      </div>

      <div class="recommend-song-list">
        <show-items
          title="搜索歌单"
          :itemList="searchLists"
          path="playlists"
        ></show-items>
      </div>

      <div class="recommend-mv-list">
        <show-items title="搜索MV" :itemList="searchMvs" path="mv"></show-items>
      </div>
      <!-- 搜索单曲 -->
      <div class="search-song">
        <list-area
          :songList="searchSongs"
          listTitle="搜索歌曲"
          :isScroll="false"
          :titleBold="true"
        ></list-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import ShowItems from '../components/ShowItems'
import ListArea from '../components/ListArea'
import { getSearch } from '../boot/axios'
export default {
  name: 'Search',
  data() {
    return {
      searchSongs: [],
      searchArtists: [],
      searchLists: [],
      searchMvs: []
    }
  },
  methods: {
    goTo(id) {
      this.$router.push({ name: this.path, params: { id } })
    },
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getSearch(limit = 10, type = 1) {
      const { code, result } = await getSearch(this.keywords, limit, type)
      console.log(code)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '搜索单曲失败', 'top')
      }
      return result
    }
  },
  components: {
    ShowItems,
    ListArea
  },
  props: {
    keywords: {
      type: String,
      default: ''
    }
  },
  created() {
    // 搜索单曲
    this.getSearch(15).then(data => {
      this.searchSongs = data.songs
    })
    this.getSearch(10, 100).then(data => {
      this.searchArtists = data.artists
    })
    this.getSearch(10, 1000).then(data => {
      this.searchLists = data.playlists
    })
    this.getSearch(10, 1004).then(data => {
      this.searchMvs = data.mvs
    })
  },
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss">
.search {
  .q-chip {
    position: absolute;
    right: 0;
    top: 20px;
  }
}
</style>
