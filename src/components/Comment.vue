<template>
  <div class="comment" v-if="comments.length > 0">
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
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {}
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
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss">
.comment {
  .comment-title {
    margin-top: 0;
    margin-bottom: 40px;
  }
}

@media (max-width: $breakpoint-md-min) {
  .comment {
    .comment-title {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
  }
}
</style>
