<template>
  <q-page class="artist q-py-lg row justify-center">
    <div class="intro col-10">
      <profile-card :playlist="artist"></profile-card>
    </div>
    <div class="hot-song col-10">
      <list-area
        :songList="hotSongs"
        listTitle="热门歌曲"
        :isScroll="false"
        :titleBold="true"
      ></list-area>
    </div>
    <div class="top-mv col-10">
      <show-items title="热门MV" path="/mv" :itemList="mvs"></show-items>
    </div>
    <div class="top-album col-10">
      <show-items
        title="热门专辑"
        path="/album"
        :itemList="hotAlbums"
      ></show-items>
    </div>
    <div class="other-artist col-10">
      <show-items
        title="相似歌手"
        path="artist"
        :itemList="simiArtists"
        circle
      ></show-items>
    </div>
  </q-page>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import ListArea from '../components/ListArea'
import ShowItems from '../components/ShowItems'
import {
  getHotSong,
  getHotMv,
  getHotAlbum,
  getSimiArtists
} from '../boot/axios'
export default {
  name: 'Artist',
  data() {
    return {
      artist: null,
      hotSongs: [],
      mvs: [],
      hotAlbums: [],
      simiArtists: []
    }
  },
  methods: {
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },

    async getHotSong() {
      const { code, artist, hotSongs } = await getHotSong(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌手热门歌曲失败', 'top')
      }
      this.artist = artist
      this.artist.coverImgUrl = artist.img1v1Url
      this.artist.description = artist.briefDesc
      this.hotSongs = hotSongs.slice(0, 15)
      //   console.log(this.artist)
    },
    async getHotMv() {
      const { code, mvs } = await getHotMv(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌手热门MV', 'top')
      }
      this.mvs = mvs
    },
    async getHotAlbum() {
      const { code, hotAlbums } = await getHotAlbum(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌手热门专辑', 'top')
      }
      this.hotAlbums = hotAlbums
    },
    async getSimiArtists() {
      const { code, artists } = await getSimiArtists(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取相似歌手失败', 'top')
      }
      this.simiArtists = artists
      //   console.log(this.simiArtists)
    }
  },
  components: {
    ProfileCard,
    ListArea,
    ShowItems
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.getHotSong()
    this.getHotMv()
    this.getHotAlbum()
    this.getSimiArtists()
  },
  mounted() {},
  computed: {
    calcSongSize(value) {
      return (parseInt(value) / 1000 / 60).toFixed(2)
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
$top-lg-gutter: 50px;
$top-xs-gutter: 20px;
.artist {
  .top-song,
  .top-mv {
    padding-top: $top-lg-gutter;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .artist {
    .top-mv,
    .top-song {
      padding-top: $top-xs-gutter;
    }
  }
}
</style>
