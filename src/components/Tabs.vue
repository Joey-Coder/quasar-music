<template>
  <div class="tabs" ref="tabsWrapper">
    <q-tabs
      v-model="tab"
      narrow-indicator
      align="justify"
      style="margin: 0 auto"
    >
      <q-tab
        name="comment"
        :icon="$q.screen.gt.sm ? 'chat' : ''"
        label="评论"
        class="text-accent tab-icon"
      >
        <q-badge color="red" floating>{{ commentCount }}</q-badge></q-tab
      >
      <q-tab
        name="lyrics"
        :icon="$q.screen.gt.sm ? 'list_alt' : ''"
        label="歌词"
        class="text-red tab-icon"
        @click="$refs.tabsWrapper.scrollIntoView({ behavior: 'smooth' })"
      />
      <q-tab
        name="more"
        :icon="$q.screen.gt.sm ? 'movie' : ''"
        label="更多"
        class="text-primary tab-icon"
      />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="comment" class="items-center">
        <div class="row justify-start">
          <h4
            class="comment-title text-weight-bold"
            v-text="commentType === 'hot' ? '最热评论' : '最新评论'"
          ></h4>
          <q-tabs v-model="commentType">
            <div class="dropdown self-start">
              <q-btn-dropdown auto-close flat dense label="More...">
                <q-list>
                  <q-item clickable @click="commentType = 'hot'">
                    <q-item-section>Hot</q-item-section>
                  </q-item>

                  <q-item clickable @click="commentType = 'new'">
                    <q-item-section>New</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-tabs>
        </div>
        <q-tab-panels v-model="commentType"
          ><q-tab-panel name="hot">
            <comment
              :comments="hotComments"
              :commentCount="commentCount"
            ></comment>
          </q-tab-panel>
          <q-tab-panel name="new">
            <comment
              :comments="comments"
              :commentCount="commentCount"
              type="new"
              @changePage="changePage"
            ></comment></q-tab-panel
        ></q-tab-panels>
      </q-tab-panel>

      <q-tab-panel name="lyrics">
        <h4 class="comment-title text-weight-bold">歌词</h4>
        <q-scroll-area
          style="height: 80vh; "
          class="lyric-scroll"
          ref="lyricScroll"
        >
          <!-- <div v-for="n in 100" :key="n" class="q-py-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div> -->
          <q-chat-message
            v-for="(item, index) in lyric"
            :key="index"
            :text="[item.value]"
            :avatar="avatar"
            :name="name"
            :bg-color="
              item.index[0] <= getCurrentTime && getCurrentTime < item.index[1]
                ? 'dark'
                : 'grey-2'
            "
            :class="
              item.index[0] <= getCurrentTime && getCurrentTime < item.index[1]
                ? 'active-lyric'
                : ''
            "
            v-show="item.value"
          />
        </q-scroll-area>
      </q-tab-panel>

      <q-tab-panel name="more">
        <show-items
          :title="simiTitle"
          :itemList="simiItems"
          :path="path"
        ></show-items>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import ShowItems from '../components/ShowItems'
import Comment from '../components/Comment'
export default {
  name: 'Tabs',
  data() {
    return {
      tab: this.initTab,
      commentType: this.initCommentType
    }
  },
  methods: {
    changePage(value) {
      // this.getMvComment(20, value * 20)
      this.$emit('changePage', value)
      this.$refs.tabsWrapper.scrollIntoView({ behavior: 'smooth' })
    }
  },
  components: {
    ShowItems,
    Comment
  },
  props: {
    commentCount: {
      type: Number,
      default: 0
    },
    initTab: {
      type: String,
      default: 'comment'
    },
    hotComments: {
      type: Array,
      default: function() {
        return []
      }
    },
    comments: {
      type: Array,
      default: function() {
        return []
      }
    },
    simiItems: {
      type: Array,
      default: function() {
        return []
      }
    },
    path: {
      type: String,
      default: 'mv'
    },
    simiTitle: {
      type: String,
      default: '相似mv'
    },
    initCommentType: {
      type: String,
      default: 'hot'
    },
    lyric: {
      type: Array,
      default: () => {
        return []
      }
    },
    avatar: {
      type: String,
      default: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg'
    },
    name: {
      type: String,
      default: 'unknow'
    }
  },
  created() {},
  mounted() {},
  computed: {
    getCurrentTime() {
      return this.$store.state.currentTime
    }
  },
  watch: {
    getCurrentTime: {
      handler(newValue, oldValue) {
        // console.log('currentTime:', newValue)
        const activeLyricEl = document.querySelector('.active-lyric')
        // 重新播放歌曲时歌词滑动到第一句
        if (newValue === 0) {
          this.$refs.lyricScroll.setScrollPosition(0)
        }
        if (activeLyricEl && activeLyricEl.offsetTop > 225) {
          this.$refs.lyricScroll.setScrollPosition(
            activeLyricEl.offsetTop - 150
          )
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tabs {
  margin-top: 50px;
  .q-tabs {
    max-width: 40vw;
  }
  .show-items {
    padding-top: 0;
  }

  .comment-title {
    margin-top: 0;
    margin-bottom: 40px;
  }
  .lyric-scroll {
    transition: all 0.69s linear;
    .active-lyric {
      ::v-deep .q-message-text {
        width: 200%;
        max-width: 65vw;
        .q-message-text-content {
          div {
            color: white;
            font-weight: bolder;
          }
        }
      }
    }
  }
}
@media (max-width: $breakpoint-md-min) {
  .tabs {
    margin-top: 10px;
    .q-tabs {
      max-width: 60vw;
      .tab-icon {
        font-size: 10px;
      }
    }
    .q-tab-panel {
      padding-left: 3px;
      padding-right: 3px;
    }
    .comment-title {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
  }
}
</style>
