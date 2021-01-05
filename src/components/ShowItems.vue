<template>
  <div
    :class="['show-items', $q.screen.lt.sm ? 'q-pt-md' : 'q-mb-xl']"
    v-if="itemList && itemList.length > 0"
  >
    <h4 class="title q-ma-none text-weight-bold" v-text="title"></h4>
    <q-scroll-area
      horizontal
      :thumb-style="{
        opacity: 0
      }"
      :class="['cards-scroll', $q.screen.lt.sm ? 'q-pt-xs' : 'q-pt-md']"
    >
      <circle-item
        :itemList="itemList"
        v-if="circle"
        :path="path"
      ></circle-item>
      <square-item :itemList="itemList" v-else :path="path"></square-item>
    </q-scroll-area>
  </div>
</template>

<script>
import SquareItem from './SquareItem'
import CircleItem from './CircleItem'
export default {
  name: 'ShowItems',
  data() {
    return {
      //   captionVisiable: false
    }
  },
  methods: {},
  components: {
    SquareItem,
    CircleItem
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    itemList: {
      type: Array,
      default: null
    },
    circle: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: 'playlist'
    }
  },
  created() {},
  mounted() {},
  computed: {
    playCount(count) {
      const c = Math.floor(count / 10000)
      return `${c}+ w`
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.show-items {
  .cards-scroll {
    width: 100%;
    height: 275px;
  }
}
@media (max-width: $breakpoint-xs-max) {
  .show-items {
    .title {
      font-size: 1.5rem;
    }
    .cards-scroll {
      width: 100%;
      height: 200px;
      margin-top: 0;
    }
  }
}
</style>
