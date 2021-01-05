<template>
  <q-page class="mv q-py-lg row justify-center content-start">
    <div class="mv-wrapper col-10 ">
      <q-card class="my-card bg-grey-2" flat>
        <q-card-section :horizontal="$q.screen.gt.sm">
          <!-- <q-img class="col-11" src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
          <q-card-section class="col-11 q-pa-none">
            <q-card-section class="title">
              <div
                class="title text-weight-bold text-h4"
                v-text="videoName"
              ></div>
            </q-card-section>
            <q-card-section class="video-wrapper"
              ><video id="player" ref="player"></video
            ></q-card-section>
          </q-card-section>

          <q-card-actions
            :vertical="$q.screen.gt.sm"
            class="col-1 justify-around"
          >
            <q-btn
              flat
              round
              color="accent"
              icon="headset"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
            />
            <q-btn
              flat
              round
              color="red"
              icon="favorite"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
            />
            <q-btn
              flat
              round
              color="primary"
              icon="share"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
    <div class="tabs-wrapper col-10 justify-center">
      <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
        style="margin: 0 auto"
      >
        <q-tab
          name="comment"
          :icon="$q.screen.gt.sm ? 'chat' : ''"
          label="评论"
          class="text-accent tab-icon"
        />
        <q-tab
          name="lyrics"
          :icon="$q.screen.gt.sm ? 'list_alt' : ''"
          label="歌词"
          class="text-red tab-icon"
        />
        <q-tab
          name="more"
          :icon="$q.screen.gt.sm ? 'movie' : ''"
          label="更多"
          class="text-primary tab-icon"
        />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="comment">
          <comment :comments="hotComments" title="最热评论"></comment>
          <comment :comments="comments" title="最新评论"></comment>
        </q-tab-panel>

        <q-tab-panel name="lyrics">
          未搜索到歌词
        </q-tab-panel>

        <q-tab-panel name="more">
          <show-items title="相似MV" :itemList="simiMvs" path="mv"></show-items>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import {
  getMvDetail,
  getMvAddress,
  getSimiMv,
  getMvComment
} from '../boot/axios'
import ShowItems from '../components/ShowItems'
import Comment from '../components/Comment'
export default {
  name: 'Mv',
  data() {
    return {
      videoName: 'videoName',
      mvUrl: [],
      mvCover: '',
      player: null,
      brs: [],
      tab: 'comment',
      simiMvs: [],
      comments: [],
      hotComments: []
    }
  },
  methods: {
    showNotify(color, message, position) {
      this.$q.notify({ color, message, position })
    },
    async getMvDetail() {
      const { code, data } = await getMvDetail(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取MV详情失败', 'top')
      }
      this.mvCover = data.cover
      this.videoName = data.name
      this.brs = data.brs.map(item => {
        return item.br
      })
      //   this.brs.sort()
      this.getAllMvAddress()
    },
    async getMvAddress(r = 1080) {
      const { code, data } = await getMvAddress(this.id, r)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取MV详情失败', 'top')
      }
      this.mvUrl.push({ size: r, url: data.url })
      if (this.brs.length === this.mvUrl.length) {
        this.initPlayer()
      }
    },
    getAllMvAddress() {
      this.brs.forEach(br => {
        this.getMvAddress(br)
      })
    },
    async getSimiMv() {
      const { code, mvs } = await getSimiMv(this.id)
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取相似MV失败', 'top')
      }
      this.simiMvs = mvs
    },
    async getMvComment(limit = 20, before = '') {
      const { code, comments, hotComments } = await getMvComment(
        this.id,
        limit,
        before
      )
      if (code !== 200) {
        return this.showNotify('deep-orange-6', '获取mv评论失败', 'top')
      }
      this.comments = comments
      this.hotComments = hotComments
    },

    initPlayer() {
      //
      const sources = this.mvUrl.map(item => {
        // console.log(url)
        return {
          src: item.url,
          type: 'video/mp4',
          size: item.size
        }
      })
      //   console.log('sources:', sources)

      this.player.source = {
        type: 'video',
        title: this.videoName,
        sources: sources,
        poster: this.mvCover
      }
    }
  },
  components: {
    ShowItems,
    Comment
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.getMvDetail()
    this.getSimiMv()
    this.getMvComment()
  },
  mounted() {
    const videoOptions = {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'airplay',
        'pip',
        'fullscreen'
      ],
      settings: ['quality', 'speed', 'loop'],
      loop: { active: true },
      quality: { default: 1080, options: [1080, 720, 480, 240] }
    }
    //   this.player = new Plyr('#player', videoOptions)
    this.player = new Plyr(this.$refs.player, videoOptions)
  },
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss">
.mv {
  .mv-wrapper {
    height: auto;
    .my-card {
      height: auto;
      .q-img {
        height: 73vh;
      }
      .title {
        padding-bottom: 0;
      }
      .video-wrapper {
        height: 70vh;
        & video {
          height: 100%;
        }
      }
    }
  }
  .tabs-wrapper {
    margin-top: 50px;
    .q-tabs {
      max-width: 40vw;
    }
    .comment-wrapper {
      //   .comment-title {
      //     margin-top: 0;
      //   }
    }
  }
}

@media (max-width: $breakpoint-md-min) {
  .mv {
    .mv-wrapper {
      height: auto;
      .my-card {
        .title {
          padding: 0;
          margin-bottom: 6px;
          font-size: 1.2rem;
        }
        .video-wrapper {
          height: auto;
          padding: 0;

          & video {
            padding: 0;
          }
        }
      }
    }
    .tabs-wrapper {
      margin-top: 10px;
      .q-tabs {
        max-width: 60vw;
        .tab-icon {
          font-size: 10px;
        }
      }
      .comment-wrapper {
        // .comment-title {
        //   font-size: 1.5rem;
        //   margin-bottom: 15px;
        // }
      }
    }
  }
}
</style>
