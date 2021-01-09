<template>
  <q-page class="song q-py-lg row justify-center">
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
      ></tabs>
    </div>
  </q-page>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import Tabs from '../components/Tabs'
import { getListAllSong, getSongComment, getSimiSong } from '../boot/axios'
export default {
  name: 'Song',
  data() {
    return {
      songInfo: this.$store.state.songInfo,
      comments: [],
      hotComments: [],
      simiSongs: [],
      commentCount: 0
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
      this.hotComments = hotComments
      this.commentCount = total
    },
    async getSimiSong() {
      const { code, songs } = await getSimiSong(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取相似MV失败', 'top')
      }
      this.simiSongs = songs
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
    // console.log('created')
    if (!this.songInfo.id) {
      console.log('vuex is null')
      this.getSongDetail()
    } else {
      console.log('get from vuex')
    }
    this.getSongComment()
    this.getSimiSong()
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
<style scoped lang="scss"></style>
