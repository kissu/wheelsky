<template lang='pug'>
  #app
    svg.wheel(:width="400" :height="400" viewBox="0 0 400 400")
      //-
        cannot use svgSize here ??!
      circle(:cx="svgSize" :cy="svgSize" :r="svgSize" stroke="grey" fill="teal" stroke-width="2")
      //- rect(:x="400" :y="svgSize" width="10" height="3" stroke="white" fill="red" stroke-width="2")
      v-touch(
        tag="path"
        v-for="(flavorQuarter, index) in flavors.children"
        :key="flavorQuarter.id"
        :name="flavorQuarter.name"
        @click="incrementCounter() && nextNestedFlavor(flavorQuarter)"
        v-on:tap="pepe(flavorQuarter)"
        :class="'wheelQuarters' + index"
        :index="index"
        :fill="colors[index]"
        transform="rotate(0 0 0)"
      )

      //todo this part is REALLY garbage and should be split in 2 components and with the use of https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath

      v-touch(
        tag="text"
        v-for="(flavorQuarter, index) in flavors.children"
        :key="flavorQuarter.id2"
        :name="flavorQuarter.name"
        @click="incrementCounter() && nextNestedFlavor(flavorQuarter)"
        v-on:tap="pepe(flavorQuarter)"
        :class="'wheelTextQuarters' + index"
        font-size="18px"
        fill="orange"
        :x="svgSize + 30"
        :y="svgSize + 5"
        text-align="center"
        transform="rotate(-45 0 0) translate(15 0)"
        font-stretch="condensed"
        cursor="pointer"
      ) {{ flavorQuarter.name }}

      v-touch.reset-flavor-level(
        @click="resetFlavorLevel"
        v-on:tap="resetFlavorLevel"
        tag="circle"
        :cx="svgSize"
        :cy="svgSize"
        :r="20"
        stroke="black"
        fill="#44BBA4"
        stroke-width="2"
      )

    p(v-show="selectedFlavor") Saveur choisie: {{ selectedFlavor }}
    p(v-show="!selectedFlavor") Veuillez SVP choisir une saveur
</template>

<script>
import flavorData from './data/whiskyFlavors.json'
// import origin from './data/whiskyOrigin.json'
// import flavorData from './data/whiskyType.json'
import ZingTouch from 'zingtouch' //* ♥
export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      flavorsSize: '',
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
      svgSize: 200,
      //todo I missed some important stuff, so...I gonna make this ugly fix.......
      uglyOffset: [0, 0, -30, -40, -50, 0, -65, -68, -70, -72, -74, -75, -76, -76, -77],
      level: 0,
      name: '',
      results: '',
      selectedFlavor: '',
    }
  },
  computed: {
    radialVelocity() {
      return 360 / this.computeFlavorsSize
    },
    computeFlavorsSize() {
      return this.flavors.children.length
    },
  },
  //* https://codepen.io/olufotebig/pen/YVjJpE?editors=1010
  mounted() {
    this.$nextTick(function() {
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
      // region.bind(wheel, 'tap', e => {
      //   console.log(e)
      // })
      // var quartersRegion = new ZingTouch.Region(document.body)
      // var quarters = document.querySelectorAll("[class*='wheelQuarters']")

      Object.values(this.flavors.children).forEach(
        (flavor, index) =>
          document
            .querySelector(`.wheelTextQuarters${index}`)
            .setAttribute(
              'transform',
              `rotate(${this.radialVelocity * index +
                this.uglyOffset[this.computeFlavorsSize - 1]} 200 200) translate(15 0)`,
            ),
        console.log('passed'),
      )

      Object.values(this.flavors.children).forEach(
        (flavor, index) =>
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
        console.log('passed'),
      )

      // Object.values(this.flavors.children).forEach(x => {
      //   var that = this
      //   region.bind(x, 'tap', function() {
      //     debugger
      //     that.incrementCounter() && that.nextNestedFlavor(x)
      //   })
      // })

      //? fuck me
      // var bodyRegion = new ZingTouch.Region(document.body)
      // // var quarters = document.querySelector('.wheelQuarters0')
      // var tapGesture = new ZingTouch.Tap()
      // var quarters = document.querySelectorAll("[class^='wheelQuarters']")
      // quarters.forEach(x => {
      //   bodyRegion.bind(x, tapGesture, e => {
      //     this.incrementCounter()
      //     // alert(e.target.getAttribute('name'))
      //     this.nextNestedFlavor(
      //       this.flavors.children.find(y => y.name == e.target.getAttribute('name')),
      //     )
      //     console.log(x)
      //     // // bodyRegion.unbind(x)
      //   })
      // })

      // var resetButton = document.querySelector('.reset-flavor-level')
      // bodyRegion.bind(resetButton, tapGesture, () => this.resetFlavorLevel())
    })
  },
  updated() {
    this.$nextTick(function() {
      //! omfffffg, pls refacto this one......
      Object.values(this.flavors.children).forEach((flavor, index) =>
        document
          .querySelector(`.wheelTextQuarters${index}`)
          .setAttribute(
            'transform',
            `rotate(${this.radialVelocity * index +
              this.uglyOffset[this.computeFlavorsSize - 1]} 200 200) translate(15 0)`,
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

      // var bodyRegion = new ZingTouch.Region(document.body)
      // // var quarters = document.querySelector('.wheelQuarters0')
      // var tapGesture = new ZingTouch.Tap()
      // var quarters = document.querySelectorAll("[class^='wheelQuarters']")
      // quarters.forEach(x => {
      //   bodyRegion.bind(x, tapGesture, e => {
      //     this.incrementCounter()
      //     // alert(e.target.getAttribute('name'))
      //     this.nextNestedFlavor(
      //       this.flavors.children.find(y => y.name == e.target.getAttribute('name')),
      //     )
      //     bodyRegion.unbind(x)
      //   })
      // })

      // var resetButton = document.querySelector('.reset-flavor-level')
      // bodyRegion.bind(resetButton, tapGesture, () => this.resetFlavorLevel())

      // var region2 = new ZingTouch.Region(document.body)
      // // var quarters = document.querySelectorAll("[class*='wheelQuarters']")
      // var quarters = document.querySelector('wheelQuarters0')
      // var tapGesture = new ZingTouch.Tap()
      // region2.bind(quarters, tapGesture, function() {
      //   alert('nice')
      // })

      // Object.values(this.flavors.children).forEach(x => {
      //   var that = this
      //   region.bind(x, 'tap', function() {
      //     debugger
      //     that.incrementCounter() && that.nextNestedFlavor(x)
      //   })
      // })

      // var quartersRegion = new ZingTouch.Region(document.body)
      // var quarters = document.querySelectorAll("[class*='wheelQuarters']")

      // quarters.forEach(x =>
      //   quartersRegion.bind(
      //     x,
      //     'tap',
      //     // () => this.incrementCounter() && this.nextNestedFlavor(flavor),
      //     () => {
      //       this.incrementCounter()
      //       this.nextNestedFlavor(
      //         this.flavors.children.find(x => x.name == x.children.getAttribute('name')),
      //       )
      //     },
      //   ),
      // )
    })
  },
  methods: {
    test() {
      alert(event)
    },
    pepe(x) {
      return this.incrementCounter() && (this.selectedFlavor = this.nextNestedFlavor(x))
    },
    // bindTap(flavor) {
    //   var wheel = document.querySelector('.wheel')
    //   var quartersRegion = new ZingTouch.Region(wheel)
    //   const quarters = document.querySelector("[class*='wheelQuarters']")

    //   quartersRegion.bind(
    //     quarters,
    //     'tap',
    //     // () => this.incrementCounter() && this.nextNestedFlavor(flavor),
    //     () => {
    //       console.log(flavor)
    //     },
    //   )
    // },
    chooseFlavor(index) {
      this.selectedFlavor = this.flavors.children[index].name
    },
    incrementCounter() {
      //? maybe find a better way for the deep level than '2'
      if (this.level < 2) {
        return (this.level += 1)
      } else {
        return false
      }
    },
    nextNestedFlavor(currentFlavor, additive = 0) {
      let rfind = flavorElement => {
        if (
          flavorElement.level + additive === this.level &&
          flavorElement.name === currentFlavor.name
        ) {
          // eslint-disable-next-line
          return (this.flavors = flavorElement)
        }
        return flavorElement.children.find(rfind)
      }
      return this.level === 0 ? (this.flavors = flavorData) : this.flavors.children.find(rfind)
    },
    resetFlavorLevel() {
      this.level = 0
      this.nextNestedFlavor()
      this.selectedFlavor = ''
    },
  },
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: Math.round(centerX + radius * Math.cos(angleInRadians)),
    y: Math.round(centerY + radius * Math.sin(angleInRadians)),
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
