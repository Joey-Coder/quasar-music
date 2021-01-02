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
    <div class="top-mv col-10"></div>
    <div class="top-album col-10"></div>
    <div class="other-artist col-10"></div>
  </q-page>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import ListArea from '../components/ListArea'
import { getHotSong } from '../boot/axios'
export default {
  name: 'Artist',
  data() {
    return {
      artist: null,
      hotSongs: []
    }
  },
  methods: {
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getHotSong() {
      const { code, artist, hotSongs } = await getHotSong(this.id)
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取歌手热门歌曲失败', 'top')
      }
      this.artist = artist
      this.artist.coverImgUrl = artist.img1v1Url
      this.artist.description = artist.briefDesc
      this.hotSongs = hotSongs.slice(0, 10)
      //   console.log(this.artist)
    }
  },
  components: {
    ProfileCard,
    ListArea
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.getHotSong()
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
.artist {
  .hot-song {
    padding-top: 50px;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .artist {
    .hot-song {
      padding-top: 20px;
    }
  }
}
</style>
