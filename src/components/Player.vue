<template>
  <div class="player row justify-between items-center">
    <div class="control-wrapper row">
      <div class="btn-group">
        <q-btn flat round icon="skip_previous" size="md"></q-btn>
        <q-btn
          flat
          :icon="isPaused ? 'play_arrow' : 'pause'"
          size="lg"
          @click="handlePlay"
        ></q-btn>
        <q-btn flat round icon="skip_next" size="md"></q-btn>
      </div>
      <div class="time row items-center justify-between">
        <div class="q-pr-xs">{{ currentTime | showTime }}</div>
        /
        <div class="q-pl-xs">{{ getDuration | showTime }}</div>
      </div>
    </div>
    <div class="info-wrapper">
      <q-avatar rounded>
        <img :src="musicCover" />
      </q-avatar>
    </div>
    <div class="tool-wrapper"></div>

    <audio
      :src="musicUrl"
      autoplay
      loop
      ref="audio"
      @timeupdate="timeUpdate"
    ></audio>
  </div>
</template>

<script>
import { checkMusic, getMusicUrl } from '../boot/axios'
export default {
  name: 'player',
  data() {
    return {
      musicUrl: '',
      currentTime: 0,
      debace: true
    }
  },
  methods: {
    handlePlay() {
      if (this.musicUrl !== '') {
        console.log('clickPlay')
        this.$store.commit('setIsPaused', !this.isPaused)
      }
    },
    async checkMusic(id) {
      const { success } = await checkMusic(id)
      if (!success) {
        this.showNotify('deep-orange-6', '检查音乐是否可用播放失败', 'top')
      }
      return success
    },
    async getMusicUrl(id) {
      const { code, data } = await getMusicUrl(id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取音乐播放地址失败', 'top')
      }
      if (data.length > 0) {
        return data[0].url
      }
    },
    timeUpdate(event) {
      if (this.debace) {
        this.debace = false
        this.currentTime = event.target.currentTime
        setTimeout(() => {
          this.debace = true
        }, 900)
      }
    }
  },
  components: {},
  props: {},
  created() {},
  mounted() {
    //   this.$refs.audio.
  },
  computed: {
    musicCover() {
      return this.$store.state.songInfo.al.picUrl
    },
    isPaused() {
      return this.$store.state.isPaused
    },
    changeSongId() {
      return this.$store.state.songInfo.id
    },
    getDuration() {
      return this.$store.state.songInfo.dt / 1000 || 0
    }

    // songInfo() {
    //   return this.$store.state.songInfo
    // }
  },
  watch: {
    isPaused: function(newValue, oldValue) {
      oldValue ? this.$refs.audio.play() : this.$refs.audio.pause()
      console.log(this.$refs.audio.currentTime)
    },
    changeSongId: async function(newValue, oldValue) {
      //   console.log('changeSongID')

      const check = await this.checkMusic(newValue)
      if (check) {
        this.musicUrl = await this.getMusicUrl(newValue)
      }
      this.$store.commit('setIsPaused', false)
    }
    // songInfo: function(newValue, oldValue) {
    //   console.log('change songIf')
    // }
  },
  filters: {
    showTime(value) {
      if (value === 0) {
        return '0:00'
      }
      //   return value.toFixed(0)
      const minute = parseInt(value / 60)
      let second = parseInt(value % 60)
      if (second < 10) {
        second = '0' + second
      }

      return minute + ':' + second
    }
  }
}
</script>
<style scoped lang="scss">
.player {
  height: 100%;
  width: 100%;
  .control-wrapper {
    width: auto;
    height: 100%;
    span {
      font-size: 10px;
    }
  }
  .info-wrapper {
    padding: 8px 0;
  }
}
</style>
