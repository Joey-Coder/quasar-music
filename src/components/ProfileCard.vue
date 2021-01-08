<template>
  <div class="profile-card card-wrapper col-10" v-if="playlist">
    <q-card
      :class="[
        'my-card wrap bg-grey-2',
        $q.screen.lt.md ? '' : 'row justify-between'
      ]"
      flat
    >
      <q-img
        class="col-4 "
        :src="playlist.coverImgUrl || playlist.picUrl || playlist.al.picUrl"
      >
        <q-badge
          transparent
          class="badge"
          v-if="type === 'Artist' && $q.screen.lt.md"
        >
          {{ calcSongCount }}p
        </q-badge></q-img
      >
      <q-card-section class="col-6 row content-around card-section">
        <div
          :class="[
            'text-h4 title col-12',
            $q.screen.lt.md ? 'text-h5 q-py-xs text-weight-border' : ''
          ]"
        >
          {{ playlist.name && playlist.name.trim() }}
        </div>
        <div class="col-12">
          <div
            class="text-h6 text-weight-regular text-grey-9 desc"
            v-if="type === 'Artist'"
          >
            {{ playlist.description && playlist.description.trim() }}
          </div>
          <div
            class="text-h6 text-weight-regular text-grey-9 desc items-start"
            v-else
          >
            {{ playlist.ar[0].name }} / {{ playlist.al.name }}
          </div>
        </div>
        <q-chip
          color="primary"
          text-color="white"
          icon="album"
          dense
          v-if="type === 'Artist' && !$q.screen.lt.md"
        >
          {{ calcSongCount }} p
        </q-chip>
      </q-card-section>
      <!-- <q-separator vertical></q-separator> -->

      <q-card-actions
        :class="[
          'justify-around col-1 card-action',
          $q.screen.lt.md ? 'row' : 'column items-center'
        ]"
        align="left"
      >
        <q-btn flat round color="teal" icon="headset">
          <q-tooltip anchor="center left">
            播放
          </q-tooltip>
        </q-btn>
        <q-btn flat round color="red" icon="favorite">
          <q-tooltip anchor="center left">收藏</q-tooltip>
        </q-btn>
        <q-btn flat round color="primary" icon="share">
          <q-tooltip anchor="center left">分享</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  data() {
    return {}
  },
  methods: {
    calcSongSize(value) {
      return (parseInt(value) / 1000 / 60).toFixed(2)
    }
  },
  components: {},
  props: {
    playlist: {
      type: Object,
      default: function() {
        return { coverImgUrl: '' }
      }
    },
    type: {
      type: String,
      default: 'Artist'
    }
  },
  created() {
    // console.log('created', this.playlist)
  },
  updated() {
    // console.log('updated', this.playlist)
  },
  computed: {
    calcSongCount() {
      //   if (this.playlist.trackIds) {
      return (
        this.playlist.size ||
        this.playlist.musicSize ||
        this.playlist.trackIds.length
      )
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.card-wrapper {
  height: auto;
  .my-card {
    height: auto;
    .card-section {
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
    .q-img {
      object-fit: cover;
      height: 300px;
      .badge {
        text-align: left;
        height: 18px;
        width: 50px;
      }
    }
    .q-chip {
      //   width: 63px;
    }
  }
}
@media (max-width: $breakpoint-sm-max) {
  .card-wrapper {
    height: auto;
    .my-card {
      height: auto;
      .q-img {
        object-fit: cover;
        height: 200px;
      }
      .card-section {
        padding-bottom: 0;
        .desc {
          font-size: 1rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .card-action {
        // padding-bottom: 0;
      }
    }
  }
}
</style>
