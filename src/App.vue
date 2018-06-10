<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    p(v-for="flavor in flavors" :key="flavor.id") {{ flavor.children }}
    button(@click="test") Click me
    div {{ result }}
</template>

<script>
import flavorData from './data.json'

export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      result: '',
    }
  },
  methods: {},
}

function find_nested_object(array, level, level_value, name, name_value) {
  let result
  array.find(function recursive_find(child) {
    if (child[level] !== level_value || child[name].toLowerCase() !== name_value) {
      return child.children.find(recursive_find)
    }
    return (result = child)
  })
  return result
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
