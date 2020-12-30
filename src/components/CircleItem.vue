<template>
  <div class="circle-item row items-start justify-between no-wrap q-gutter-lg">
    <q-avatar v-for="item in itemList" :key="item.id" class="artist-avatar">
      <q-img :src="item.img1v1Url" transition="scale">
        <div
          class="avatar-caption absolute-full text-subtitle2 flex flex-center"
        >
          {{ item.name }}
        </div>
      </q-img>
    </q-avatar>
  </div>
</template>

<script>
export default {
  name: 'CircleItem',
  data() {
    return {}
  },
  methods: {},
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
.circle-item {
  .artist-avatar {
    width: 200px;
    height: 200px;
    cursor: pointer;
    .avatar-caption {
      transition: all 0.5s ease-in-out;
      opacity: 0;
    }
    &:hover {
      .avatar-caption {
        opacity: 1;
      }
    }
  }
}
@media (max-width: $breakpoint-xs-max) {
  .circle-item {
    .artist-avatar {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
