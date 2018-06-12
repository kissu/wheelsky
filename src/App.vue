<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    p(v-for="flavor in flavors" :key="flavor.id") {{ flavor.children }}
    button(@click="") Click me
    button(@click="level-= 1") Decrement
    button(@click="level+= 1") Increment
    br
    br
    div {{ level }}
    hr
    div {{ currentRing }}
</template>

<script>
import flavorData from './data.json'

export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 2,
      name: 'Doux',
    }
  },
  computed: {
    currentRing() {
      let recursive_find = child => {
        if (this.level === 0) {
          return child
        } else if (child['name'] === 'Doux') {
          //TODO ↻ refacto the above line and the previous test into 1 line
          return child
        }
        child.children.find(recursive_find)
      }

      return this.flavors.find(recursive_find)
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
