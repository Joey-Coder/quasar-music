<template>
  <div class="profile-card card-wrapper col-10" v-if="playlist">
    <q-card
      :class="[
        'my-card wrap bg-grey-2',
        $q.screen.lt.md ? '' : 'row justify-between'
      ]"
      flat
    >
      <q-img class="col-4 " :src="this.playlist.coverImgUrl">
        <q-badge transparent class="badge" v-show="$q.screen.lt.md">
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
        <div class="text-h6 text-weight-regular text-grey-9 desc col-12">
          {{ playlist.description && playlist.description.trim() }}
        </div>
        <q-chip
          color="primary"
          text-color="white"
          icon="album"
          dense
          v-show="!$q.screen.lt.md"
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
      return this.playlist.musicSize || this.playlist.trackIds.length
      //   }
      //   return 0
    }
  },
  watched: {}
}
</script>
<style scoped lang="scss">
.card-wrapper {
  height: 300px;
  .my-card {
    height: 100%;
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
      height: 99.8%;
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
    height: 62vh;
    //   display: inline-block;
    .my-card {
      // display: inline-block;
      height: 100%;
      .q-img {
        object-fit: cover;
        height: 50%;
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
        padding-bottom: 0;
      }
    }
  }
}
</style>
