<template lang='pug'>
  #app
    h1(v-show="!allDone") Bienvenue sur Wheelsky

    .container(v-show="!formCompleted")
      .form-questions
        label Quelle est votre adresse mail ?
        br
        input.input.is-link.input-email(v-model="userEmail" type="email" placeholder="nom.prenom@gmail.com" autofocus=true)
        br

        label De quelle distillerie est l'alcool ?
        br
        input.input.is-link.input-distillery(v-model="whiskyDistillery" type="text" placeholder="Birmingham")
        br

        label Quel est le nom du breuvage ?
        br
        input.input.is-link.input-whisky-name(v-model="whiskyName" type="text" placeholder="Hakushu")
        br

        label Quel est le type du whisky ?
        br
        v-select(v-model="whiskyType" :options=["Blended", "Single malt", "Blended Malt Whisky", "Bourbon", "Caadian Rye Whisky", "Corn Whiskey", "Grain whisky", "Irish blended whiskey", "Pot still whiskey", "Rye whiskey", "Tennessee","Wheat whiskey"] readonly="true")
        br

        label Quelle est son origine ?
        br
        v-select(v-model="whiskyOrigin" :options=["Écosse", "Japon", "Irlande", "France", "États-Unis", "Canada", "Chine", "Espagne", "Belgique", "Inde", "Pays de Galles", "Taïwan", "Suède", "Australie", "Nouvelle-Zélande", "Autre"] readonly="true")

      br
      a.button.is-link(@click="formFinished") Tout me semble bon !

    .svg-container
      svg.wheel(viewBox="0 0 400 400" v-show="!wheelDone")
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
          fill="#FFC43D"
          :x="svgSize + 35"
          :y="svgSize + 5"
          text-align="center"
          transform="rotate(-45 0 0) translate(15 0)"
          font-stretch="condensed"
          cursor="pointer"
        ) {{ flavorQuarter.name }}

        v-touch.reset-flavor-level(
          @click="resetFlavorLevel"
          v-on:tap="resetFlavorLevel()"
          tag="circle"
          :cx="svgSize"
          :cy="svgSize"
          :r="30"
          stroke="black"
          fill="#44BBA4"
          stroke-width="1"
        )

      .bottom-block(v-show="!wheelDone & !allDone")
        p.white-text(:v-if="level == 2 && choosenOne") Saveur actuelle: {{ choosenOne }}
        v-touch.button.is-link(tag="a" v-on:tap="submitFlavor()" :v-if="level > 1") Confirmer votre choix
        br
        br
        div.white-text(v-if="listArray.length") ~ Votre liste de saveurs ~
          <p> {{ listArray }} </p>
        br
        v-touch.button.is-info.white-text(tag="a" v-if="listArray.length" v-on:tap="wheelFinished()") J'ai fini de faire ma liste

      h1.thanks(v-show="allDone") Merci d'avoir participé a la dégustation, au plaisir !
</template>

<script>
import flavorData from './data/whiskyFlavors.json'
// import origin from './data/whiskyOrigin.json'
// import flavorData from './data/whiskyType.json'
import ZingTouch from 'zingtouch' //* ♥
import axios from 'axios'
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
      choosenOne: '',

      userEmail: '',
      whiskyName: '',
      whiskyType: '',
      whiskyOrigin: '',
      whiskyDistillery: '',
      listArray: [],

      formCompleted: false,
      wheelDone: true,
      allDone: false,
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
      const svgContainer = document.querySelector('.svg-container')
      let wheel = document.querySelector('.wheel')
      let region = new ZingTouch.Region(svgContainer)
      let spinOfTheHell = new ZingTouch.Rotate()
      let currentAngle = 0

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

      Object.values(this.flavors.children).forEach((flavor, index) =>
        document
          .querySelector(`.wheelTextQuarters${index}`)
          .setAttribute(
            'transform',
            `rotate(${this.radialVelocity * index +
              this.uglyOffset[this.computeFlavorsSize - 1]} 200 200) translate(15 0)`,
          ),
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
      this.incrementCounter() && (this.selectedFlavor = this.nextNestedFlavor(x))

      console.log(x)
      return (this.choosenOne = Object.values(x)[1])
    },
    formFinished() {
      ;(this.formCompleted = true), (this.wheelDone = false)
    },
    wheelFinished() {
      ;(this.wheelDone = true), (this.allDone = true)
      axios
        .post('https://wheelsky33.firebaseio.com/posts.json', {
          email: this.userEmail,
          whiskyName: this.whiskyName,
          whiskyType: this.whiskyType,
          whiskyOrigin: this.whiskyOrigin,
          whiskyDistillery: this.whiskyDistillery,
          listArray: this.listArray,
        })
        .then(result => console.log(result))
        .catch(e => console.log(e))
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
    submitFlavor() {
      console.log(this.choosenOne)
      this.resetFlavorLevel()
      this.listArray += `${this.choosenOne} `
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
  margin: 0;
  padding: 0;
}
body {
  color: white;
}
html {
  background-color: #000;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-image: url('https://res.cloudinary.com/tastykissu/image/upload/v1529760056/wee.jpg');
  height: 100%;
  width: 100%;
  width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  margin-left: auto 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
h1 {
  font-size: 1.4em;
  color: #d19c1d;
}
.margin-word {
  margin-right: 0.3em;
}
.form-questions {
  /* background-color: hsl(0, 0%, 21%); */
  background-color: white;
  padding: 1em;
  border-radius: 8px;
  height: 70%;
  margin: 1em auto 0 auto;
}
.form-question * {
  display: block;
  margin: 1em auto;
  margin-top: 1em;
}
.form-questions label,
.form-questions p {
  color: #9055a2;
}
.v-select input[type='search'],
.v-select input[type='search']:focus {
  border: 2px solid white;
  border-radius: 3px;
}
.inline-p {
  display: inline-block;
}
.input-email,
.input-whisky-name,
.input-distillery {
  width: 75%;
}
.form-questions v-select,
.form-questions input {
  margin-bottom: 1em;
}
.svg-container {
  height: 66vh;
}
.wheel {
  fill: yellowgreen;
  position: absolute;
  top: -25%;
  left: -70%;
  width: 140vw;
  height: 140vh;
}

.bottom-block {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  width: 80%;
  left: 10%;
  border-radius: 8px;
  padding: 0.5em;
}
.white-text {
  color: white;
}
@media only screen and (min-width: 600px) {
  .input-email {
    width: 45%;
  }
}
</style>
