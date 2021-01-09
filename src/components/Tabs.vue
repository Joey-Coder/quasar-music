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
        未搜索到歌词
      </q-tab-panel>

      <q-tab-panel name="more">
        <show-items
          title="相似MV"
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
    return {}
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
    tab: {
      type: String,
      default: 'comment'
    },
    commentType: {
      type: String,
      default: 'hot'
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
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
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
