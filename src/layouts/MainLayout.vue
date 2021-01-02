<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black ">
      <q-linear-progress
        stripe
        size="md"
        color="warning"
        :value="progress"
        v-show="progress > 0"
      />
      <q-toolbar class="row justify-between items-center no-wrap">
        <div
          class="header-left row items-center col-sm-3 col-xs-2"
          v-if="!isXsAndSearch"
        >
          <q-icon name="play_circle_outline" size="lg"></q-icon>
          <h5 class="q-ma-xs" v-if="$q.screen.gt.xs">QMusic</h5>
        </div>

        <div
          :class="[
            'header-center row col-sm-6 items-center q-py-xs',
            isXsAndSearch ? 'col-xs-12' : 'col-xs-8'
          ]"
        >
          <div
            :class="[
              'title row col',
              $q.screen.lt.sm ? 'justify-around' : 'justify-center'
            ]"
            v-if="centerVisiable"
          >
            <!-- <h5 class="q-ma-md text-h6" v-if="$q.screen.gt.xs">首页</h5> -->
            <q-btn
              class="q-ma-xs text-h6"
              flat
              v-if="$q.screen.gt.xs"
              label="首页"
              to="/"
            ></q-btn
            ><q-btn
              class="q-ma-xs text-h6"
              flat
              v-if="$q.screen.gt.xs"
              label="发现"
            ></q-btn
            ><q-btn
              class="q-ma-xs text-h6"
              flat
              v-if="$q.screen.gt.xs"
              label="媒体库"
            ></q-btn>
            <!-- <h5 class="q-ma-md text-h6" v-if="$q.screen.gt.xs">推荐</h5> -->
            <!-- <h5 class="q-ma-md text-h6" v-if="$q.screen.gt.xs">媒体库</h5> -->
            <q-icon
              name="home"
              v-if="$q.screen.lt.sm"
              class="q-mr-sm"
              size="md"
            ></q-icon>
            <q-icon
              name="explore"
              v-if="$q.screen.lt.sm"
              class="q-mr-sm"
              size="md"
            ></q-icon>
            <q-icon
              name="library_music"
              v-if="$q.screen.lt.sm"
              size="md"
              class="q-mr-sm"
            ></q-icon>
            <div class="search row items-center" @click="checkToTitle">
              <q-icon name="search" size="md"></q-icon>
              <h5 class="q-ma-sm text-h6" v-if="$q.screen.gt.sm">
                搜索
              </h5>
            </div>
          </div>
          <q-input
            filled
            v-model="text"
            v-else
            autofocus
            class="search-box col "
            placeholder="搜索"
            label-color="white"
            square
            @blur="checkToTitle"
          >
            <template v-slot:prepend>
              <q-icon name="arrow_back" color="white" @click="checkToTitle" />
            </template>
            <template v-slot:append>
              <q-icon
                name="clear"
                color="white"
                @click="clearSearchBox"
                v-if="text !== ''"
              />
            </template>
          </q-input>
        </div>

        <div
          class="header-right row col-sm-3 col-xs-2 justify-end"
          v-if="!isXsAndSearch"
        >
          <q-btn
            icon="account_circle"
            size="lg"
            round
            flat
            padding="none"
          ></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <keep-alive :include="['PageIndex']">
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      centerVisiable: true,
      progress: 0.01
    }
  },
  methods: {
    clearSearchBox() {
      this.text = ''
    },
    checkToTitle() {
      this.centerVisiable = !this.centerVisiable
    },
    // 页面加载进度条，通过判断图片加载完成的数量来实现
    showProgress() {
      if (this.progress >= 1) {
        this.progress = 0
        // console.log('sdf')
        clearInterval(this.interval)
      }
      // let imgLoad = 0 // 加载完成的图片数量
      // let imgCount = Infinity
      const imgCount = document.getElementsByClassName('q-img').length // 图片集合
      const imgLoad = document.getElementsByClassName('q-img__image').length // 图片集合
      // console.log('sdfdfs:' + imgCount
      this.progress = Math.max(0.1, imgLoad / imgCount)
      // 设置过时时间
      setTimeout(() => {
        this.progress = 0
        clearInterval(this.interval)
      }, 10000)
    }
  },
  computed: {
    isXsAndSearch() {
      return this.$q.screen.lt.sm && !this.centerVisiable
    }
  },
  mounted() {
    this.interval = setInterval(this.showProgress, 500)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
.q-layout {
  .q-header {
    .q-toolbar {
      // height: 7vh;
      .header-center {
        .q-input {
          ::v-deep .q-field__native.q-placeholder {
            font-size: 20px;
            font-weight: 500;
            color: white;
          }
          .q-icon {
            cursor: pointer;
          }
        }
        .search {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
