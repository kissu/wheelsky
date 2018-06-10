<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    p(v-for="flavor in flavors.children" :key="flavor.id") {{ flavor }}
    button(@click="test") Click me
</template>

<script>
import flavorData from './data.json'

export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      users: users,
    }
  },
  methods: {
    test() {
      console.log(this._.random(5))
    },
  },
}

var users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
  { user: 'pebbles', age: 1, active: true },
]
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
