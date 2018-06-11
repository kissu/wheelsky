<template lang='pug'>
  #app
    img(src='./assets/logo.png')
    p(v-for="flavor in flavors" :key="flavor.id") {{ flavor.children }}
    button(@click="find_nested_object(level, name)") Click me
    button(@click="level-= 1") Decrement
    button(@click="level+= 1") Increment
    br
    br
    div {{ level }}
    hr
    div {{ result }}
</template>

<script>
import flavorData from './data.json'

export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 1,
      name: '',
      result: '',
    }
  },
  methods: {
    //? do I need to make a computed property for that one ?
    find_nested_object(level_value, name_value) {
      var recursive_find = child => {
        if (
          child['level'] === level_value &&
          '' !== name_value &&
          child['name'].toLowerCase() === name_value
        ) {
          return (this.result = child)
        } else if (child['level'] === level_value && level_value === 0) {
          //TODO ↻ refacto the above line and the previous test into 1 line
          return (this.result = child)
        }
        return child.children.find(recursive_find)
      }
      this.flavors.find(recursive_find)
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
