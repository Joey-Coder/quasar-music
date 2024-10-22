import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      songInfo: {
        al: {
          picUrl: 'https://cdn.quasar.dev/logo/svg/quasar-logo.svg',
          name: ''
        },
        ar: [{ name: '' }]
      },
      isPaused: true,
      currentTime: 0
    },
    mutations: {
      setSongInfo(state, info) {
        state.songInfo = info
      },
      setIsPaused(state, value) {
        state.isPaused = value
      },
      setCurrentTime(state, value) {
        state.currentTime = value
      }
    },
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
