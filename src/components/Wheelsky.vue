<template>
  <div class="svg-box">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="wheel"
      :viewBox="`0 0 ${viewBoxRange * 2} ${viewBoxRange * 2}`"
      class="left-offset"
    >
      <!-- height and width of 500px was previously applied here -->
      <!-- <ellipse :cx="viewBoxRange" :cy="viewBoxRange" :rx="arcRadius" :ry="arcRadius" fill="#eee"></ellipse> -->
      <path
        v-for="(element, index) in elements"
        :key="element.id"
        :d="drawCirclePath(degrePerArc * index, degrePerArc * (index + 1))"
        :fill="element.color"
      ></path>
      <g v-for="(element, index) in elements" :key="element.id">
        <path
          :id="`arc_path${index + 1}`"
          :d="drawTextPath(degrePerArc * index, degrePerArc * (index + 1), 0.85)"
          opacity="0"
        ></path>
        <text>
          <textPath
            xmlns:xlink="http://www.w3.org/1999/xlink"
            v-bind="{'xlink:href':`#arc_path${index + 1}`}"
            text-anchor="middle"
            startOffset="50%"
            fill="white"
          >
            <tspan class="curved-text">{{ element.name }}</tspan>
          </textPath>
        </text>
      </g>
      <!-- $$('svg path')[0].getTotalLength()-->
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="on-top-of-wheel"
      :viewBox="`0 0 ${backButton * 2 + 100} ${backButton * 2 + 100}`"
      class="left-offset"
    >
      <circle
        @click="backButtonClick"
        :cx="backButton"
        :cy="backButton"
        :r="backButton"
        fill="#333"
        data-clickable="true"
        stroke="#fff"
        stroke-width="20"
      ></circle>
      <polyline
        fill="none"
        stroke="#f2d024"
        :stroke-width="backButton / 20"
        stroke-linecap="round"
        stroke-linejoin="round"
        data-clickable="true"
        :points="`${backButton * 1.6},${backButton / 2} ${backButton * 1.3},${backButton} ${backButton * 1.6},${backButton * 1.5}`"
      ></polyline>
      <!-- points="800,250 650,500 800,750" -->
    </svg>
  </div>
</template>

<script>
import Draggable from "gsap/Draggable";

export default {
  props: {
    elements: {
      type: Array
    },
    selected: {
      type: String
    }
  },
  data() {
    return {
      viewBoxRange: 500,
      arcRadius: 500
    };
  },
  mounted() {
    if (this.elements.length == 1) {
      console.log("we should GSAP lock the rotation here !");
    } else {
      console.log("it's ok");
    }
    const vueInstance = this;
    Draggable.create("#wheel", {
      type: "rotation",
      snap: function(endValue) {
        //todo only available with the GreenClub...
        return Math.round(endValue / 90) * 90;
      },
      dragResistance: 0.2,
      allowContextMenu: true,
      onDrag() {
        vueInstance.checkFlavor(this);
      },
      bounds: { minRotation: -10000, maxRotation: 10000 }
    });
    this.$nextTick(function() {
      this.checkFlavor(Draggable.get("#wheel"));
    });
  },
  //todo need to export that somewhere, too messy atm
  methods: {
    backButtonClick() {
      console.log("clicked");
    },
    drawCirclePath(alpha, beta) {
      // alpha is start angle, beta is end of the circle arc, both in degrees
      return `M ${this.xLeftCorner(alpha)} ${this.yLeftCorner(alpha)}
      A ${this.arcRadius} ${this.arcRadius} 0 0 1 ${this.xRightCorner(
        beta
      )} ${this.yRightCorner(beta)}
      L ${this.wheelCenter} ${this.wheelCenter}z`;
    },
    drawTextPath(alpha, beta, ratio) {
      return `M ${this.xRightCorner(beta, ratio)} ${this.yRightCorner(
        beta,
        ratio
      )}
      A ${this.arcRadius} ${this.arcRadius} 0 0 0 ${this.xLeftCorner(
        alpha,
        ratio
      )} ${this.yLeftCorner(alpha, ratio)}`;
    },
    startArcAngle(angle) {
      return (angle * Math.PI) / 180;
    },
    finishArcAngle(angle) {
      return (angle * Math.PI) / 180;
    },
    xLeftCorner(angle, scaleRatio = 1) {
      return (
        this.wheelCenter +
        this.arcRadius * scaleRatio * Math.sin(this.startArcAngle(angle))
      );
    },
    yLeftCorner(angle, scaleRatio = 1) {
      return (
        this.wheelCenter -
        this.arcRadius * scaleRatio * Math.cos(this.startArcAngle(angle))
      );
    },
    xRightCorner(endAngle, scaleRatio = 1) {
      return (
        this.wheelCenter +
        this.arcRadius * scaleRatio * Math.sin(this.finishArcAngle(endAngle))
      );
    },
    yRightCorner(endAngle, scaleRatio = 1) {
      return (
        this.wheelCenter -
        this.arcRadius * scaleRatio * Math.cos(this.finishArcAngle(endAngle))
      );
    },
    checkFlavor(draggableElement) {
      const flavorIndex = Math.floor(
        ((-draggableElement.rotation + 90) % 360) / this.degrePerArc
      );
      if (this.selected != this.elements.slice(flavorIndex)[0].name) {
        this.$emit("update-flavor", this.elements.slice(flavorIndex)[0]);
      }
      console.log(
        `The chosen flavor is ${this.elements.slice(flavorIndex)[0].name}`
      );
      return flavorIndex;
    }
  },
  computed: {
    wheelCenter() {
      return this.viewBoxRange;
    },
    degrePerArc() {
      return 360 / this.elements.length;
    },
    offsetAngle() {
      let offsetAngle = 0;
      if (this.elements.length > 2) {
        offsetAngle = this.degrePerArc / 2;
      }
      return offsetAngle;
    },
    backButton() {
      return this.viewBoxRange;
    }
  }
};
</script>

<style lang="sass" scoped>
.svg-box
  position: relative
  width: 50%
  transform: translate3d(-50%, 0, 0)
#wheel
  width: 100%
  height: 100vh
  max-height: 1000px
  overflow: hidden
  padding: 0
#on-top-of-wheel
  position: absolute
  top: 50%
  left: 50%
  height: 30vh
  max-height: 300px
  transform: translate(-50%, -50%)
  width: auto
.curved-text
  font-size: 3rem
  border: 2px solid yellow
.anchor
  stroke: rgb(0,0,0)
  stroke-width: 2
</style>
