<template>
  <div class="player row justify-between items-center" v-show="changeSongId">
    <q-slider
      v-model="currentTime"
      :min="0"
      :max="getDuration"
      dense
      @input="changeAudioCurrentTime"
      class="song-slider"
    />
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
    <div class="info-wrapper row justify-between items-center q-gutter-x-md">
      <q-avatar rounded>
        <img :src="musicCover" />
      </q-avatar>
      <div class="title column justify-center items-start">
        <div class="song-name text-h6">{{ getSongName }}</div>
        <div class="row  justify-start text-grey-8 q-gutter-x-sm">
          <div class="artist">{{ getArtistName }}</div>
          <div class="album">{{ getAlbumName }}</div>
        </div>
      </div>
    </div>
    <div class="tool-wrapper row justify-between items-center">
      <div class="volume-wrapper row justify-between items-center no-wrap">
        <q-slider
          v-model="currentVolume"
          :min="0"
          :max="1"
          :step="0.01"
          dense
          @input="changeAudioVolume"
          class="volume-slider"
        />
        <q-btn
          flat
          round
          class="volume-btn"
          :icon="currentVolume > 0 ? 'volume_up' : 'volume_off'"
          @click="mutedAudio"
        ></q-btn>
      </div>

      <q-btn
        flat
        round
        :icon="loop ? 'repeat_one' : 'repeat'"
        @click="loop = !loop"
        class="repeat-btn"
      ></q-btn>
      <q-btn
        flat
        round
        icon="arrow_drop_up"
        @click="goTo(changeSongId)"
      ></q-btn>
    </div>
    <audio
      :src="musicUrl"
      autoplay
      :loop="loop"
      ref="audio"
      @timeupdate="timeUpdate"
    ></audio>
    <q-fab
      color="primary"
      text-color="white"
      icon="keyboard_arrow_left"
      direction="left"
      padding="sm"
      :persistent="false"
      glossy
    >
      <q-fab-action
        color="primary"
        text-color="white"
        @click="loop = !loop"
        :icon="loop ? 'repeat_one' : 'repeat'"
        padding="xs"
        glossy
      />
      <q-fab-action
        color="primary"
        text-color="white"
        class="volume-btn"
        :icon="currentVolume > 0 ? 'volume_up' : 'volume_off'"
        @click="mutedAudio"
        padding="xs"
        glossy
      ></q-fab-action>
      <q-slider
        v-model="currentVolume"
        :min="0"
        :max="1"
        :step="0.01"
        dense
        @input="changeAudioVolume"
        class="volume-slider"
      />
    </q-fab>
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
      debace: true,
      currentVolume: 0.5,
      loop: false
    }
  },
  methods: {
    goTo(id) {
      if (this.$router.currentRoute.params.id.toString() === id.toString()) {
        // console.log('back')
        this.$router.go(-1)
      } else {
        // console.log('song')
        this.$router.push({ name: 'song', params: { id } })
      }
    },
    handlePlay() {
      if (this.musicUrl !== '') {
        // console.log('clickPlay')
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
        this.$store.commit('setCurrentTime', parseInt(event.target.currentTime))
        // console.log(('currentTime:', parseInt(event.target.currentTime)))
        setTimeout(() => {
          this.debace = true
        }, 900)
      }
    },
    changeAudioCurrentTime(value) {
      this.$refs.audio.currentTime = value
    },
    changeAudioVolume(value) {
      //   console.log('volume:', value)
      document.querySelector('.volume-slider').style.visibility = 'visible'
      this.$refs.audio.volume = value
    },
    visiableVolumeSlider() {
      const volumeWrapper = document.querySelector('.volume-wrapper')
      const volumeSlider = document.querySelector('.volume-slider')
      volumeWrapper.addEventListener('mouseenter', () => {
        // console.log('enter')
        volumeSlider.style.visibility = 'visible'
      })
      volumeWrapper.addEventListener('mouseleave', () => {
        // console.log('leave')
        setTimeout(() => {
          volumeSlider.style.visibility = 'hidden'
        }, 2000)
      })
    },
    // volumeChange(event) {
    //   console.log('changeVolume', event.target.volume)
    // },
    mutedAudio() {
      if (!this.$refs.audio.muted) {
        this.$refs.audio.muted = true
        this.currentVolume = 0
        // this.changeAudioVolume(0)
      } else {
        this.$refs.audio.muted = false
        this.currentVolume = this.$refs.audio.volume
      }
    }
  },
  components: {},
  props: {},
  created() {},
  mounted() {
    //   this.$refs.audio.
    this.changeAudioCurrentTime(this.currentVolume)
    this.visiableVolumeSlider()
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
    },
    getSongName() {
      return this.$store.state.songInfo.name || ''
    },
    getArtistName() {
      return this.$store.state.songInfo.ar[0].name || ''
    },
    getAlbumName() {
      return this.$store.state.songInfo.al.name || ''
    }

    // songInfo() {
    //   return this.$store.state.songInfo
    // }
  },
  watch: {
    isPaused: function(newValue, oldValue) {
      oldValue ? this.$refs.audio.play() : this.$refs.audio.pause()
      //   console.log(this.$refs.audio.currentTime)
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
  position: relative;
  .song-slider {
    position: absolute;
    top: -10px;
    ::v-deep .q-slider__thumb {
      visibility: hidden;
      &:focus {
        visibility: visible;
      }
    }
  }
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
  .tool-wrapper {
    width: auto;
    .volume-wrapper {
      width: auto;
      .volume-slider {
        visibility: hidden;
        height: 5px;
        width: 8vw;
      }
    }
  }
  .q-fab {
    display: none;
    //     position: fixed;
    //     bottom: 12vh;
    //     right: 10px;
    //     .volume-slider {
    //       height: 5px;
    //       width: 8vw;
    //     }
  }
}

@media (max-width: $breakpoint-xs-max) {
  .player {
    .control-wrapper {
      .time {
        display: none;
      }
    }
    .info-wrapper {
      .q-avatar {
        display: none;
      }
      .title {
        .song-name,
        .album,
        .artist {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          max-width: 30vw;
        }
      }
    }
    .tool-wrapper {
      .volume-wrapper {
        display: none;
      }
      .repeat-btn {
        display: none;
      }
    }
    .q-fab {
      display: block;
      position: fixed;
      bottom: 12vh;
      right: 10px;
      .volume-slider {
        height: 5px;
        width: 20vw;
      }
    }
  }
}
</style>
