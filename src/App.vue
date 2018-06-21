<template lang='pug'>
  #app
    svg.wheel(:width="400" :height="400" viewBox="0 0 400 400")
      //-
        cannot use svgSize here ??!
      circle(:cx="svgSize" :cy="svgSize" :r="svgSize" stroke="white" fill="teal" stroke-width="2")
      //- rect(:x="400" :y="svgSize" width="10" height="3" stroke="white" fill="red" stroke-width="2")
      path(
        v-for="(flavorQuarter, index) in flavors.children"
        @click.stop="chooseFlavor(index)"
        :class="'wheelQuarters' + index"
        :index="index"
        :fill="colors[index]"
        transform="rotate(0 0 0)"
      )

      // this part is REALLY garbage and should be split in 2 components and with the use of https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath

      text(
        v-for="(flavorQuarter, index) in flavors.children"
        @click.stop="chooseFlavor(index)" /* this one can be omitted imo */
        :class="'wheelQuartersText' + index"
        font-size="18px"
        fill="orange"
        :x="svgSize + 50"
        :y="svgSize + 5"
        text-align="center"
        transform="rotate(-45 0 0) translate(15 0)"
      ) {{ flavorQuarter.name }}

      circle.backPrevious(
        @click.stop='backPreviousFlavor'
        :cx="svgSize"
        :cy="svgSize"
        :r="20"
        stroke="white"
        fill="red"
        stroke-width="2"
      )

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
      results: '',
      colors: [
        '#fff',
        '#EF476F',
        '#456990',
        '#06D6A0',
        'yellow',
        '#073B4C',
        '#028090',
        '#F45B69',
        'yellow',
        '#073B4C',
        '#028090',
        '#F45B69',
        'yellow',
        '#073B4C',
        '#028090',
        '#F45B69',
      ],
      // flavors: {
      //   children: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      // },
      angle: 0,
      svgSize: 200,
      // I missed some important stuff, so...I gonna make this ugly fix.......
      uglyOffset: [0, 0, -30, -40, -50, 0, -65, -68, -70, -72, -74, -75, -76, -76, -77],
    }
  },
  computed: {
    radialVelocity() {
      return 360 / this.flavors.children.length
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
      wheel.style.transform = `rotate(${currentAngle}deg)`

      console.log(currentAngle)
    })
    var middleBackButton = document.querySelector('.backPrevious')
    region.unbind(middleBackButton)

    Object.values(this.flavors.children).forEach((flavor, index) =>
      document
        .querySelector(`.wheelQuartersText${index}`)
        .setAttribute(
          'transform',
          `rotate(${this.radialVelocity * index +
            this.uglyOffset[this.flavors.children.length - 1]} 200 200) translate(15 0)`,
        ),
    )

    Object.values(this.flavors.children).forEach((flavor, index) =>
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
    chooseFlavor(index) {
      // this.level += 1
    },
    backPreviousFlavor() {},
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
