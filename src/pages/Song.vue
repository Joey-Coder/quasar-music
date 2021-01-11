<template>
  <q-page class="song q-py-lg row justify-center content-start">
    <div class="intro-wrapper col-10">
      <profile-card
        :playlist="songInfo"
        type="song"
        @handlePlay="handlePlay"
      ></profile-card>
    </div>
    <div class="tabs-wrapper col-10">
      <tabs
        :commentCount="commentCount"
        :hotComments="hotComments"
        :comments="comments"
        :simiItems="simiSongs"
        path="song"
        simiTitle="相似歌曲"
        @changePage="changePage"
        :lyric="lyric"
        :avatar="songInfo.al.picUrl"
        :name="songInfo.ar[0].name"
      ></tabs>
    </div>
  </q-page>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import Tabs from '../components/Tabs'
import {
  getListAllSong,
  getSongComment,
  getSimiSong,
  getLyric
} from '../boot/axios'
export default {
  name: 'Song',
  data() {
    return {
      songInfo: {
        al: {
          picUrl: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg',
          name: ''
        },
        ar: [{ name: '' }]
      },
      comments: [],
      hotComments: [],
      simiSongs: [],
      commentCount: 0,
      lyric: []
    }
  },
  methods: {
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getSongDetail() {
      const { code, songs } = await getListAllSong(this.id)
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取歌曲详情失败', 'top')
      }
      this.songInfo = songs[0]
    },
    async getSongComment(limit = 20, offset = 0, before = '') {
      const { code, comments, hotComments, total } = await getSongComment(
        this.id,
        limit,
        offset,
        before
      )
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取mv评论失败', 'top')
      }
      this.comments = comments
      if (offset === 0) {
        this.hotComments = hotComments
      }
      this.commentCount = total
    },
    async getSimiSong() {
      const { code, songs } = await getSimiSong(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取相似MV失败', 'top')
      }
      this.simiSongs = songs
    },
    async getLyric() {
      const { code, lrc } = await getLyric(this.id)
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取歌词失败', 'top')
      }
      const arr = [
        ...lrc.lyric.matchAll(/\[(\d{2}):(\d{2})\.\d{3}\]\u00a0?(.*?)\n/g)
      ]

      const lastlrc =
        parseInt(arr[arr.length - 1][1]) * 60 + parseInt(arr[arr.length - 1][2])
      this.lyric[arr.length - 1] = {
        index: [lastlrc, lastlrc],
        value: arr[arr.length - 1][3]
      }
      for (let i = arr.length - 2; i >= 0; i--) {
        const lrcTime = parseInt(arr[i][1]) * 60 + parseInt(arr[i][2])
        this.lyric[i] = {
          index: [lrcTime, this.lyric[i + 1].index[0]],
          value: arr[i][3]
        }
      }
      // console.log(this.lyric)
    },
    changePage(value) {
      this.getSongComment(20, value * 20)
      //   this.$refs.tabsWrapper.scrollIntoView({ behavior: 'smooth' })
    },
    async handlePlay() {
      this.$store.commit('setSongInfo', this.songInfo)
      this.$store.commit('setIsPaused', !this.isPaused)
    }
  },
  components: {
    ProfileCard,
    Tabs
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  created() {
    this.getSongDetail()
    this.getSongComment()
    this.getSimiSong()
    this.getLyric()
  },
  mounted() {},
  computed: {
    // getSongInfo() {
    //   console.log('computed')
    //   return this.$store.state.songInfo
    // }
    isPaused() {
      return this.$store.state.isPaused
    }
    // getCurrentTime() {
    //   return this.$store.state.currentTime
    // }
  },
  watch: {
    // getSongInfo: {
    //   handler(newValue, oldValue) {
    //     console.log('sddf')
    //     this.songInfo = newValue
    //   },
    //   immediate: true
    // }
  }
}
</script>
<style scoped lang="scss">
.song {
  height: auto;
  .intro-wrapper {
    height: auto;
  }
}
</style>
