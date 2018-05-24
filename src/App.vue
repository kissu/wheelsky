<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <p>{{ ddnice }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      nice: 'miece',
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
