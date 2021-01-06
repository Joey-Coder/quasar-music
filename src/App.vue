<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import store from './store'
export default {
  store,
  name: 'App'
}
</script>
<style lang="scss"></style>
