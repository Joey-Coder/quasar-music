<template>
  <q-page class="song q-py-lg row justify-center">
    <div class="intro-wrapper col-10">
      <profile-card :playlist="songInfo" type="song"></profile-card>
    </div>
  </q-page>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import { getListAllSong } from '../boot/axios'
export default {
  name: 'Song',
  data() {
    return {
      songInfo: this.$store.state.songInfo
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
    }
  },
  components: {
    ProfileCard
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  created() {
    console.log('created')
    if (!this.songInfo.id) {
      console.log('vuex is null')
      this.getSongDetail()
    } else {
      console.log('get from vuex')
    }
  },
  mounted() {},
  computed: {
    // getSongInfo() {
    //   console.log('computed')
    //   return this.$store.state.songInfo
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
<style scoped lang="scss"></style>
