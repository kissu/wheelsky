<template lang='pug'>
  #app
    .wheel(@dblclick="test")
      svg(:width="400" :height="400" viewBox="0 0 400 400")
        circle(:cx="200" :cy="200" r="200" stroke="white" fill="teal" stroke-width="2")
        //- rect(:x="400" :y="200" width="10" height="3" stroke="white" fill="red" stroke-width="2")
        path(
          v-for="(flavorQuarter, index) in testArray"
          :class="'wheelQuarters' + index"
          :fill="colors[index]"
          stroke="white"
          stroke-width="2"
        )

</template>

<script>
import flavorData from './data.json'
import ZingTouch from 'zingtouch' // ♥
export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 0,
      name: '',
      colors: [
        '#FFD166',
        '#EF476F',
        '#456990',
        '#06D6A0',
        '#118AB2',
        '#073B4C',
        '#028090',
        '#F45B69',
      ],
      testArray: ['a', 'b', 'c', 'd', 'a1', 'b1', 'c1', 'd1'],
    }
  },
  computed: {
    radialVelocity() {
      return 360 / this.testArray.length
    },
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
      console.log(e.detail.angle)
    })
    console.log(this.radialVelocity)

    this.testArray.forEach((flavor, index) =>
      document
        .querySelector(`.wheelQuarters${index}`)
        .setAttribute(
          'd',
          describeArc(
            200,
            200,
            200,
            this.radialVelocity * index,
            this.radialVelocity * (index + 1),
          ),
        ),
    )
  },
  methods: {
    test(e) {
      console.log(e)
    },
  },
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle)
  var end = polarToCartesian(x, y, radius, startAngle)

  var arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

  var d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
  ].join(' ')

  return d
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
