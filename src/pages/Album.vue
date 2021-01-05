<template>
  <div class="album">
    <q-page class="q-py-lg row justify-center content-start">
      <profile-card :playlist="album" class="card-wrapper"></profile-card>
      <list-area
        :songList="songList"
        :listTitle="listTitle"
        :isScroll="isScroll"
        class="list-wrapper"
      ></list-area>
    </q-page>
  </div>
</template>

<script>
import { getAlbum } from '../boot/axios'
import ProfileCard from '../components/ProfileCard'
import ListArea from '../components/ListArea'
// import store from '../store'
// import Vue from 'vue'
export default {
  name: 'Album',
  // store,
  data() {
    return {
      album: null,
      songList: [],
      index: 0,
      flag: true,
      isScroll: false,
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
    async getAlbum() {
      const { code, album, songs } = await getAlbum(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取专辑详情失败', 'top')
      }
      this.album = album
      this.songList = songs
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
    this.getAlbum()
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
