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
    hr
    div All the available flavors:
      p(v-for="flavor in currentRing") {{ flavor.name }}
    div extract: {{ extract }}
    div {{ test }}
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
      result: '',
    }
  },
  computed: {
    currentRing: function() {
      let recursive_find = flavorElement => {
        if (flavorElement.level === this.level && flavorElement.name === this.name) {
          // eslint-disable-next-line
          return (this.result = flavorElement)
        }
        return flavorElement.children.find(recursive_find)
      }
      // eslint-disable-next-line
      return this.level === 0 ? (this.result = this.flavors[0]) : this.flavors.find(recursive_find)
    },
    extract() {
      return this.result == '' ? this.currentRing() : this.flavors[0].children
    },
    test() {
      return `${this.level} ${this.name}`
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
