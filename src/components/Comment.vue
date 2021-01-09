<template>
  <div class="comment">
    <div v-if="comments.length > 0">
      <div v-for="item in comments" :key="item.id" class="row justify-between">
        <q-chat-message
          :name="item.user.nickname"
          :avatar="item.user.avatarUrl"
          :text="[item.content]"
          :stamp="handleTimeStamp(item.time)"
          bg-color="grey-3"
          class="q-pb-md col-10"
        />
        <q-btn
          flat
          color="red"
          icon="favorite"
          :label="item.likedCount"
          dense
          size="sm"
          class="self-start col-1"
        />
      </div>

      <q-separator color="grey-3" />
      <div class="flex flex-center q-pt-sm no-wrap">
        <q-pagination
          v-if="type === 'new'"
          v-model="current"
          :max="maxPageCount"
          :max-pages="6"
          color="grey-7"
          :boundary-numbers="false"
          @input="$emit('changePage', current)"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
        >
        </q-pagination>
      </div>
    </div>
    <div v-else>
      暂无评论
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      current: 1
    }
  },
  methods: {
    handleTimeStamp(t) {
      const date = new Date(t)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return `${year}年${month}月${day}日`
    }
  },
  components: {},
  props: {
    comments: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'hot'
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  created() {},
  mounted() {},
  computed: {
    maxPageCount() {
      return parseInt(this.commentCount / 10)
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.comment {
  // .comment-title {
  //   margin-top: 0;
  //   margin-bottom: 40px;
  // }
}

@media (max-width: $breakpoint-md-min) {
  .comment {
    // .comment-title {
    //   font-size: 1.5rem;
    //   margin-bottom: 15px;
    // }
    .q-pagination {
      // padding: '5px';
    }
  }
}
</style>
