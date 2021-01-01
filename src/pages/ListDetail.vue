<template>
  <div class="list-detail">
    <q-page class="q-py-lg row justify-center content-start">
      <profile-card :playlist="playlist"></profile-card>
      <div class="list-wrapper col-10 q-pt-xl ">
        <q-list class="rounded-borders">
          <q-item-label header>{{ listTitle }}</q-item-label>
          <q-infinite-scroll @load="onLoad" :offset="50">
            <q-item
              clickable
              v-ripple
              class="row justify-between"
              v-for="item in songlist"
              :key="item.id"
            >
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="item.al.picUrl" />
                </q-avatar>
              </q-item-section>
              <q-item-section
                ><q-item-label class="text-weight-bold" lines="2">{{
                  item.name
                }}</q-item-label>
                <q-item-label class="text-grey-9" lines="1">{{
                  item.ar && item.ar[0].name
                }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  lines="1"
                  class="text-grey-9"
                  v-show="$q.screen.gt.xs"
                >
                  {{ item.al.name }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                {{ calcSongSize(item.dt) }}
              </q-item-section>
            </q-item>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-list>
      </div>
    </q-page>
  </div>
</template>

<script>
import { getListDetail, getListAllSong } from '../boot/axios'
import ProfileCard from '../components/ProfileCard'
// import Vue from 'vue'
export default {
  name: 'ListDetail',
  data() {
    return {
      playlist: null,
      songListQuery: [],
      songlist: [],
      index: 1,
      flag: true,
      isScoll: false,
      listTitle: '歌曲列表'
    }
  },
  methods: {
    onLoad(index, done) {
      setTimeout(() => {
        if (!this.isScoll) return done(true)
        if (this.flag === true || this.songListQuery) {
          //   console.log('loading')
          this.flag = false
          if (this.index * 20 > this.calcSongCount) {
            done(true)
          } else {
            // console.log('index:', this.index)
            this.getListAllSong(this.index * 20)
            this.index++
            done()
          }
        } else {
          done()
        }
      }, 300)
    },
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
      //   console.log('start:', start)
      //   console.log(typeof this.songListQuery)
      //   console.log('songlist:', this.songListQuery)
      //   console.log('songlistslice:', this.songListQuery.slice(start, start + 20))
      const { code, songs } = await getListAllSong(
        this.songListQuery.slice(start, start + 20).join(',')
      )
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌单所有歌曲失败', 'top')
      }
      songs.forEach(item => {
        this.songlist.push(item)
      })
      this.flag = true
    },
    calcSongSize(value) {
      return (parseInt(value) / 1000 / 60).toFixed(2)
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
  beforeCreate() {
    // this.getListDetail()
  },
  created() {
    this.getListDetail()
  },
  mounted() {
    // this.getListAllSong()
    //     this.$nextTick(function() {
    //       this.getListAllSong()
    //     })
  },

  updated() {
    // this.getListAllsong()
  },
  computed: {
    calcSongCount() {
      //   if (this.playlist.trackIds) {
      return this.songListQuery.length
      //   }
      //   return 0
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.list-detail {
  .card-wrapper {
    height: 300px;
    .my-card {
      height: 100%;
      .card-section {
        .title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .desc {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .q-img {
        object-fit: cover;
        height: 99.8%;
        .badge {
          text-align: left;
          height: 18px;
          width: 50px;
        }
      }
      .q-chip {
        //   width: 63px;
      }
    }
  }
  .list-wrapper {
    .q-list {
      .q-item {
        border-radius: 8px;
        height: 75px;
      }
    }
  }
}
@media (max-width: $breakpoint-sm-max) {
  .list-detail {
    .card-wrapper {
      height: 62vh;
      //   display: inline-block;
      .my-card {
        // display: inline-block;
        height: 100%;
        .q-img {
          object-fit: cover;
          height: 50%;
        }
        .card-section {
          padding-bottom: 0;
          .desc {
            font-size: 1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .card-action {
          padding-bottom: 0;
        }
      }
    }
    .list-wrapper {
      padding-top: 15px;
    }
  }
}
</style>
