<template lang='pug'>
  #app
    .wheel()
      svg(:width="400" :height="400" viewBox="0 0 400 400")
        //-
          cannot use svgSize here ??!
        circle(:cx="svgSize" :cy="svgSize" :r="svgSize" stroke="white" fill="teal" stroke-width="2")
        //- rect(:x="400" :y="svgSize" width="10" height="3" stroke="white" fill="red" stroke-width="2")
        path(
          v-for="(flavorQuarter, index) in testArray"
          :class="'wheelQuarters' + index"
          :index="index + 1"
          :fill="colors[index]"
          stroke="white"
          stroke-width="2"
          transform="rotate(0 0 0)"
        )
        text(
          v-for="(flavorQuarter, index) in testArray"
          :class="'wheelQuartersText' + index"
          font-size="18px"
          fill="orange"
          :x="svgSize + 10"
          :y="svgSize + 5"
        ) number # {{ flavorQuarter }}

</template>

<script>
import flavorData from './data/whiskyFlavors.json'
// import origin from './data/whiskyOrigin.json'
// import flavorData from './data/whiskyType.json'
import ZingTouch from 'zingtouch' // ♥
export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 0,
      name: '',
      colors: ['#fff', '#EF476F', '#456990', '#06D6A0', 'yellow', '#073B4C', '#028090', '#F45B69'],
      // testArray: ['a', 'b', 'c', 'd', 'a1', 'b1', 'c1', 'd1'],
      testArray: ['0', '1', '2', '3', '4', '5'],
      angle: 0,
      svgSize: 200,
      lol: 0,
    }
  },
  computed: {
    radialVelocity() {
      return 360 / this.testArray.length
    },
  },
  // https://codepen.io/olufotebig/pen/YVjJpE?editors=1010
  mounted() {
    var wheel = document.querySelector('.wheel')
    var region = new ZingTouch.Region(wheel)
    var spinOfTheHell = new ZingTouch.Rotate()
    var currentAngle = 0

    region.bind(wheel, spinOfTheHell, function(e) {
      currentAngle += e.detail.distanceFromLast
      this.lol = e.detail.distanceFromLast
      console.log(this.lol)

      wheel.style.transform = `rotate(${currentAngle}deg)`

      // var textLabel1 = document.querySelector('.potato1')
      // textLabel1.setAttribute('transform', `rotate(${360}, svgSize, 200)`, `translate(200 200)`)
      // var textLabel2 = document.querySelector('.potato2')
      // textLabel2.setAttribute('transform', `rotate(${180}, 200, 200)`, `translate(200 200)`)
      // var wheelQuarters = document.querySelectorAll("[class*='wheelQuarters']")
      // wheelQuarters.forEach(oneWheel =>
      //   oneWheel.setAttribute('transform', `rotate(${0 + 120 * oneWheel.getAttribute('index')})`),
      // )
      // console.log(e.detail.angle)
    })
    // console.log(this.radialVelocity)

    this.testArray.forEach((flavor, index) =>
      document
        .querySelector(`.wheelQuartersText${index}`)
        .setAttribute(
          'transform',
          `rotate(${this.radialVelocity * index - this.lol * 5} 200 200) translate(15 0)`,
        ),
    )

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
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 50) * Math.PI / 180.0

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
* {
  box-sizing: border-box;
}
body {
  background-color: #000;
}
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
</style>
