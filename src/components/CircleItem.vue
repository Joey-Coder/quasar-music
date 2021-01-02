<template>
  <div class="circle-item row items-start justify-between no-wrap q-gutter-lg">
    <q-avatar
      v-for="item in itemList"
      :key="item.id"
      class="artist-avatar"
      @click="goTo(item.id)"
    >
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
  methods: {
    handleload() {
      this.$emit('changeProgress')
    },
    goTo(id) {
      this.$router.push({ name: this.path, params: { id } })
    }
  },
  components: {},
  props: {
    itemList: {
      type: Array,
      default: null
    },
    path: {
      type: String,
      default: 'playlist'
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
    transition: all 0.5s ease-in-out;
    .avatar-caption {
      transition: all 0.5s ease-in-out;
      opacity: 0;
    }
    &:hover {
      // box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
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
