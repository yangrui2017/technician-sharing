<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: 'App',
  created () {

  },
  mounted () {

  },
  methods: {
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
