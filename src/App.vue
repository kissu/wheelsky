<template lang='pug'>
  #app
    svg(:width="paths.svgSize" :height="paths.svgSize" class="wheel")
      path(
          :id="`path${index}`"
          :d="paths.d"
          :transform="transform"
          :fill="paths.colors[index]"
          stroke-width="2"
          stroke="white"
          v-for="(transform, index) in paths.transforms")
      text(
        :transform="transform"
        fill="white"
        stroke="white"
        :xlink:href="`#path${index}`"
        v-for="(transform, index) in paths.textTransforms")
          tspan(dx="59") {{paths.sections[index]}}
</template>

<script>
import flavorData from './data.json'
import { transform } from 'popmotion'
import spinnable from 'popmotion-spinnable'
const { snap } = transform

export default {
  name: 'App',
  data() {
    return {
      flavors: flavorData,
      level: 0,
      name: '',
      results: [],
      svgSize: 420,
      colors: [
        '#EF476F',
        '#FFD166',
        '#456990',
        '#06D6A0',
        '#118AB2',
        '#073B4C',
        '#028090',
        '#F45B69',
      ],
      sections: [
        'Money',
        'Health',
        'Friends & Family',
        'Romance',
        'Personal Growth',
        'Fun & Recreation',
        'Phyical Environ.',
        'Career',
      ],
    }
  },
  computed: {
    paths() {
      const svgSize = this._data.svgSize
      const midSvgSize = svgSize / 2
      const r = 200 //  diameter / 2
      const divisions = this.sections.length
      const degree = 360 / divisions
      const coords = this.coordinatesFromDegree(degree, r)
      const d = `M 0,0 l ${r},0 A ${r},${r},0,0,0,${coords.x},${-coords.y} L 0,0`
      const transforms = []
      const textTransforms = []
      const colors = this._data.colors
      const sections = this._data.sections

      for (let i = 0; i < divisions; i += 1) {
        transforms.push(`rotate (${i * degree + degree / parseFloat(2)}
          ${midSvgSize} ${midSvgSize}) translate (${midSvgSize}, ${midSvgSize})`)
        textTransforms.push(` rotate(${i * degree} ${midSvgSize} ${midSvgSize})
          translate(${midSvgSize}, ${midSvgSize})`)
      }
      return {
        svgSize,
        d,
        transforms,
        textTransforms,
        colors,
        sections,
      }
    },
  },
  mounted() {
    const node = document.querySelector('.wheel')
    spinnable(node, {
      onSpin: angle => console.log(angle),
      transformSpin: snap(45),
      friction: 1,
    })
  },
  methods: {
    coordinatesFromDegree(degree, radius) {
      // TODO: check if degree is valid
      const angleinRadians = degree * (Math.PI / 180)
      const y = Math.round(Math.sin(angleinRadians) * radius)
      const x = Math.round(Math.cos(angleinRadians) * radius)
      return { x, y }
    },
  },
}
// methods: {
//   recursive_find() {
//     let rfind = flavorElement => {
//       if (flavorElement.level === this.level && flavorElement.name === this.name) {
//         return this.results.push(flavorElement)
//       }
//       return flavorElement.children.find(rfind)
//     }
//     return this.level === 0 ? (this.results = this.flavors) : this.flavors.children.find(rfind)
//   },
// },

// old-stuff
//   br
//   label level
//   input(v-model.number="level")
//   p {{ level }}
//   label name
//   input(v-model="name")
//   p {{ name }}
//   button(@click="recursive_find") Look for the items
//   hr
//   div All the available flavors:
//   div(v-for="result in results.children") {{ result.name }}
//   hr

//   svg(viewBox="0 0 200 200")
//     circle(cx="100" cy="100" r="75" class="wheelsky")
//     circle(cx="100" cy="100" r="15" class="back-button")
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
.wheel {
  border: 3px solid red;
}
</style>
