<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    p(v-for="flavor in flavors" :key="flavor.id") {{ flavor.children }}
    label level
    input(v-model.number="level")
    label name
    input(v-model="name")
    hr
    div currentRing: {{ currentRing }}
    hr
    hr
    div nested var: {{ nice }}
</template>

<script>
import flavorData from './data.json'
/* eslint-disable */
export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 0,
      name: '',
      nice: '',
    }
  },
  computed: {
    currentRing() {
      let recursive_find = flavorElement => {
        if (flavorElement.level === this.level) {
          if (flavorElement.name === this.name) {
            console.log('good name')
            return (this.nice = flavorElement)
          } else {
            console.log('not the good name')
            return
          }
        }
        // else if (child.level !== this.level && child.name !== this.name) {
        //   return child.children.find(recursive_find)
        // }
        console.log('ext return')
        return flavorElement.children.find(recursive_find)
      }
      return this.level === 0 ? this.flavors[0].children : this.flavors.find(recursive_find)
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
