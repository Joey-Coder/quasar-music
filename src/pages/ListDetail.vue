<template>
  <div class="list-detail">
    <q-page class="q-py-lg row justify-center">
      <div class="card-wrapper col-10">
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
          <q-card-section class="col-6 row content-around">
            <div
              :class="[
                'text-h4 title',
                $q.screen.lt.md ? 'text-h5 q-py-xs text-weight-border' : ''
              ]"
            >
              {{ playlist.name.trim() }}
            </div>
            <div class="text-h6 text-weight-regular text-grey-9 desc">
              <!-- 我喜欢英文歌 无谓听不听得懂 至少歌词不会固定我的想象空间
              只感受听时最原本的情感 属于我自己的情感。 （持续更新哦）              封面：马龙.白兰度 -->
              {{ playlist.description.trim() }}
            </div>
            <q-chip
              color="primary"
              text-color="white"
              icon="album"
              dense
              v-show="!$q.screen.lt.md"
            >
              {{ calcSongCount }}p
            </q-chip>
          </q-card-section>
          <q-separator vertical></q-separator>

          <q-card-actions
            :vertical="$q.screen.lt.md ? 'false' : 'true'"
            class="justify-around col-1"
          >
            <q-btn flat round dense color="red" icon="favorite" />
            <q-btn flat round dense color="teal" size="lg" icon="play_arrow" />
            <q-btn flat round dense color="primary" icon="share" />
          </q-card-actions>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import { getListDetail } from '../boot/axios'
export default {
  name: 'ListDetail',
  data() {
    return {
      playlist: null
    }
  },
  methods: {
    async getListDetail() {
      const { code, playlist } = await getListDetail(this.id)
      if (code !== 200) {
        this.showNotify('deep-orange-6', '获取歌单详情失败', 'top')
      }
      this.playlist = playlist
    }
  },
  components: {},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.getListDetail()
  },
  mounted() {},
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
  .my-card {
    height: 300px;
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
@media (max-width: $breakpoint-sm-max) {
  .list-detail {
    .my-card {
      height: unset;
      .q-img {
        height: 35vh;
      }
      .desc {
        font-size: 1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
