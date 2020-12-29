<template>
  <div class="square-item">
    <div class="song-cards row items-start justify-between no-wrap q-gutter-lg">
      <q-card class="my-card" v-for="item in itemList" :key="item.id">
        <q-img :src="item.picUrl" style="height: 70%" transition="scale" round>
          <div
            class="img-caption absolute-full text-subtitle2 flex flex-center"
          >
            {{ item.copywriter }}
          </div>
        </q-img>
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="play_arrow"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            :padding="$q.screen.lt.sm ? 'xs' : 'sm'"
          />

          <div class="row no-wrap items-center justify-between">
            <div class="col text-h6 ellipsis card-title">
              {{ item.name }}
            </div>
            <div
              class="col-auto text-grey text-caption row no-wrap items-center"
            >
              <q-icon name="headset" />
              <q-space></q-space>
              {{ calcCount(item.playCount) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquareItem',
  data() {
    return {}
  },
  methods: {
    calcCount(value) {
      if (value > 10000) {
        return Math.floor(value / 10000) + 'w'
      } else if (value > 1000) {
        return Math.floor(value / 1000) + 'k'
      } else {
        return value
      }
    }
  },
  components: {},
  props: {
    itemList: {
      type: Array,
      default: null
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss">
.square-item {
  .my-card {
    width: 300px;
    height: 255px;
    .img-caption {
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }
    &:hover {
      .img-caption {
        opacity: 1;
      }
    }
  }
}
@media (max-width: $breakpoint-xs-max) {
  .square-item {
    .my-card {
      width: 230px;
      height: 180px;
      .card-title {
        font-size: 1rem;
      }
    }
  }
}
</style>
