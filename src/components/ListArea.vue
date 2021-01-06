<template>
  <div class="list-area list-wrapper col-10">
    <q-list class="rounded-borders" v-if="songList.length > 0">
      <q-item-label
        header
        :class="[
          'list-title',
          'titleBold' ? 'text-h4 text-dark text-weight-bold' : ''
        ]"
        >{{ listTitle }}</q-item-label
      >
      <q-infinite-scroll @load="onLoad" :offset="50">
        <q-item
          clickable
          v-ripple
          class="row justify-between"
          v-for="item in songList"
          :key="item.id"
          @click="handleClick(item.id, item.al.picUrl)"
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
</template>

<script>
import { checkMusic, getMusicUrl } from '../boot/axios'
// import store from '../store'
export default {
  name: '',
  // store,
  data() {
    return {}
  },
  methods: {
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    onLoad(index, done) {
      setTimeout(() => {
        if (!this.isScroll) return done(true)
        if (this.flag === true && this.index > 0) {
          this.$emit('changeFlag', false)
          console.log('loading')
          if (this.index * 20 > this.total) {
            done(true)
          } else {
            // console.log('index:', this.index)
            // this.getListAllSong(this.index * 20)
            this.$emit('loadMoreSong', this.index * 20)
            done()
          }
        } else {
          done()
        }
      }, 1000)
    },
    calcSongSize(value) {
      return (parseInt(value) / 1000 / 60).toFixed(2)
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
        this.$store.commit('setMusicUrl', data[0].url)
      }
    },
    async handleClick(id, cover) {
      console.log('click song')
      const check = await this.checkMusic(id)
      console.log(check)
      if (check === true) {
        this.$store.commit('setMusicCover', cover)
        this.getMusicUrl(id)
      }
    }
  },
  components: {},
  props: {
    listTitle: {
      type: String,
      default: '列表'
    },
    songList: {
      type: Array,
      default: function() {
        return []
      }
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    flag: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    titleBorder: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss">
.list-wrapper {
  .q-list {
    .q-item {
      border-radius: 8px;
      height: 75px;
    }
  }
}
@media (max-width: $breakpoint-sm-max) {
  .list-wrapper {
    padding-top: 10px;
    .list-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
}
</style>
