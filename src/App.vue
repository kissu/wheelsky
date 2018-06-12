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
      name: 'miel',
    }
  },
  computed: {
    currentRing() {
      let recursive_find = child => {
        if (child.name !== this.name || child.level !== this.level) {
          return child.children.find(recursive_find)
        }
        // else if (child.level !== this.level && child.name !== this.name) {
        //   return child.children.find(recursive_find)
        // }
        return child
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
