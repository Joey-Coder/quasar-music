<template>
  <div class="play-list">
    <q-page class="q-py-lg row justify-center content-start">
      <profile-card :playlist="playlist" class="card-wrapper"></profile-card>
      <list-area
        :songList="songList"
        :listTitle="listTitle"
        :isScroll="isScroll"
        @loadMoreSong="getListAllSong"
        @changeFlag="changeFlag"
        :flag="flag"
        :index="index"
        :total="calcSongSize"
        class="list-wrapper"
      ></list-area>
    </q-page>
  </div>
</template>

<script>
import { getListDetail, getListAllSong } from '../boot/axios'
import ProfileCard from '../components/ProfileCard'
import ListArea from '../components/ListArea'
// import store from '../store'
// import Vue from 'vue'
export default {
  name: 'PlayList',
  // store,
  data() {
    return {
      playlist: null,
      songListQuery: [],
      songList: [],
      index: 0,
      flag: true,
      isScroll: true,
      listTitle: '歌曲列表'
    }
  },
  methods: {
    changeFlag(e) {
      this.flag = false
    },
    // checkCache(id) {
    //   console.log(id)
    //   return this.$store.state.cacheList.indexOf(id)
    // },
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getListDetail() {
      const { code, playlist } = await getListDetail(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌单详情失败', 'top')
      }
      this.playlist = playlist
      this.playlist.trackIds.forEach(item => {
        this.songListQuery.push(item.id)
      })
      this.getListAllSong(0)
    },
    async getListAllSong(start) {
      // console.log('start:', start)
      //   console.log(typeof this.songListQuery)
      //   console.log('songList:', this.songListQuery)
      const songListSlice = this.songListQuery.slice(start, start + 20)
      // console.log('songListslice:', songListSlice)
      if (songListSlice.length === 0) {
        return console.log('songListSlice is null: see [l:61]')
      }
      const { code, songs } = await getListAllSong(songListSlice.join(','))
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌单所有歌曲失败', 'top')
      } else {
        songs.forEach(item => {
          this.songList.push(item)
        })
        this.index++
        this.flag = true
      }
    },
    calcSongSize(value) {
      return (parseInt(value) / 1000 / 60).toFixed(2)
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
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next(vm => {
  //     // vm.$store.commit('addCache', this.id)
  //     console.log('cacheList:', vm.$store.state.cacheList)
  //     // console.log(vm.id)
  //     // console.log(vm.$store.commit('checkCache', vm.id))
  //     if (vm.checkCache(vm.id) === -1) {
  //       vm.songListQuery = []
  //       vm.songList = []
  //       vm.getListDetail()
  //       vm.$store.commit('addCache', vm.id)
  //     }
  //     console.log('cacheList:', vm.$store.state.cacheList)
  //   })
  // },
  created() {
    // this.$store.commit('addCache', this.id)
    this.getListDetail()
  },
  mounted() {},

  updated() {
    // this.getListAllsong()
  },
  computed: {
    calcSongCount() {
      return this.songListQuery.length
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.play-list {
  .list-wrapper {
    padding-top: 50px;
  }
}
@media (max-width: $breakpoint-sm-max) {
  .play-list {
    .list-wrapper {
      padding-top: 0;
    }
  }
}
</style>
