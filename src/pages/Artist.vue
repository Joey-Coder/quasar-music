<template>
  <q-page class="artist q-py-lg row justify-center">
    <div class="intro col-10">
      <profile-card :playlist="artist">12</profile-card>
    </div>
    <div class="hot-song col-10"></div>
    <div class="top-mv col-10"></div>
    <div class="top-album col-10"></div>
    <div class="other-artist col-10"></div>
  </q-page>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
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
      this.hotSongs = hotSongs
      console.log(this.artist)
    }
  },
  components: {
    ProfileCard
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
  computed: {},
  watched: {}
}
</script>
<style scoped lang="less"></style>
