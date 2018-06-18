<template lang='pug'>
  #app
    .wheel
      svg(:width="420" :height="420" viewBox="0 0 420 420")
        circle(:cx="210" :cy="210" r="210" stroke="white" fill="teal" stroke-width="2")
        rect(:x="410" :y="210" width="10" height="3" stroke="white" fill="red" stroke-width="2")
</template>

<script>
import flavorData from './data.json'
import ZingTouch from 'zingtouch'
export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 0,
      name: '',
    }
  },
  mounted() {
    var wheel = document.querySelector('.wheel')
    var region = new ZingTouch.Region(wheel)
    var spinOfTheHell = new ZingTouch.Rotate()
    var currentAngle = 0

    region.bind(wheel, spinOfTheHell, function(e) {
      var rotatable = document.querySelector('.wheel')
      currentAngle += e.detail.distanceFromLast
      rotatable.style.transform = 'rotate(' + currentAngle + 'deg)'
      console.log(e.detail)
    })
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
.wheelsky {
  fill: yellowgreen;
}
.wheel-middle {
  border: 3px solid red;
}
</style>
