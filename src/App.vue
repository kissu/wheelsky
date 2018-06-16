<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    br
    label level
    input(v-model.number="level")
    p {{ level }}
    label name
    input(v-model="name")
    p {{ name }}
    button(@click="recursive_find") Look for the items
    hr
    div All the available flavors:
    div(v-for="result in results.children") {{ result.name }}
    hr

    //- g
    //-   circle(cx="100" cy="100" r="80")
</template>

<script>
import flavorData from './data.json'
export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 0,
      name: '',
      results: '',
    }
  },
  methods: {
    recursive_find() {
      let rfind = flavorElement => {
        if (flavorElement.level === this.level && flavorElement.name === this.name) {
          return (this.results = flavorElement)
        }
        return flavorElement.children.find(rfind)
      }
      return this.level === 0 ? (this.results = this.flavors) : this.flavors.children.find(rfind)
    },
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
