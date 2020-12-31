<template>
  <div class="list-detail">
    <q-page class="q-py-lg row justify-center content-start">
      <div class="card-wrapper col-10 ">
        <q-card
          :class="[
            'my-card wrap bg-grey-2',
            $q.screen.lt.md ? '' : 'row justify-between'
          ]"
          flat
        >
          <q-img class="col-4 " :src="playlist.coverImgUrl">
            <q-badge transparent class="badge" v-show="$q.screen.lt.md">
              {{ calcSongCount }}p
            </q-badge></q-img
          >
          <q-card-section class="col-6 row content-around card-section">
            <div
              :class="[
                'text-h4 title col-12',
                $q.screen.lt.md ? 'text-h5 q-py-xs text-weight-border' : ''
              ]"
            >
              {{ playlist.name.trim() }}
            </div>
            <div class="text-h6 text-weight-regular text-grey-9 desc col-12">
              {{ playlist.description.trim() }}
            </div>
            <q-chip
              color="primary"
              text-color="white"
              icon="album"
              dense
              v-show="!$q.screen.lt.md"
            >
              {{ calcSongCount }} p
            </q-chip>
          </q-card-section>
          <!-- <q-separator vertical></q-separator> -->

          <q-card-actions
            :class="[
              'justify-around col-1 card-action',
              $q.screen.lt.md ? 'row' : 'column items-center'
            ]"
            align="left"
          >
            <q-btn flat round color="teal" icon="headset">
              <q-tooltip anchor="center left">
                播放
              </q-tooltip>
            </q-btn>
            <q-btn flat round color="red" icon="favorite">
              <q-tooltip anchor="center left">收藏</q-tooltip>
            </q-btn>
            <q-btn flat round color="primary" icon="share">
              <q-tooltip anchor="center left">分享</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="list-wrapper col-10 q-pt-xl ">
        <q-list class="rounded-borders">
          <q-item-label header>歌曲列表</q-item-label>

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
        </q-list>
      </div>
    </q-page>
  </div>
</template>

<script>
import { getListDetail, getListAllSong } from '../boot/axios'
// import Vue from 'vue'
export default {
  name: 'ListDetail',
  data() {
    return {
      playlist: [],
      songListQuery: [],
      songlist: []
    }
  },
  methods: {
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getListDetail() {
      const { code, playlist } = await getListDetail(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌单详情失败', 'top')
      }
      this.playlist = playlist
      playlist.trackIds.forEach(item => {
        this.songListQuery.push(item.id)
      })
      this.getListAllSong()
    },
    async getListAllSong() {
      const { code, songs } = await getListAllSong(
        this.songListQuery.splice(0, 100).join(',')
      )
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取歌单所有歌曲失败', 'top')
      }
      this.songlist = songs
      //   console.log(this.songlist)
    },
    calcSongSize(value) {
      return (parseInt(value) / 1000 / 60).toFixed(2)
    }
  },
  components: {},
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.getListDetail()
    // this.getListAllSong()
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
      return this.playlist.trackIds.length
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.list-detail {
  //   .card-wrapper {
  //     height: 20vh;
  //     max-height: 20vh;
  //     .my-card {
  //       height: 30vh;
  //     }
  //   }
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
