<template>
  <div class="svg-box">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500px"
      height="500px"
      id="wheel"
      :viewBox="`0 0 ${viewBoxRange * 2} ${viewBoxRange * 2}`"
      class="left-offset"
    >
      <ellipse :cx="viewBoxRange" :cy="viewBoxRange" :rx="arcRadius" :ry="arcRadius" fill="#eee"></ellipse>
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
      <circle
        @click="backButtonClick"
        :cx="wheelCenter"
        :cy="wheelCenter"
        :r="arcRadius / 6"
        fill="grey"
        data-clickable="true"
      ></circle>
      <!-- $$('svg path')[0].getTotalLength()-->
    </svg>
    <span class="test">
      <img src="../assets/fortune_arrow.png" alt="fortune_arrow">
    </span>
  </div>
</template>

<script>
import Draggable from "gsap/Draggable";

export default {
  data() {
    return {
      viewBoxRange: 500,
      arcRadius: 500,
      test: 2,
      elements: [
        {
          name: "banana",
          color: "#1ad1e5"
        },
        {
          name: "strawberry",
          color: "#e2071c"
        },
        {
          name: "cherry",
          color: "#fb1"
        },
        {
          name: "pineapple",
          color: "#b000b5"
        },
        {
          name: "watermelon",
          color: "#fa7a55"
        }
      ]
    };
  },
  mounted() {
    if (this.elements.length == 1) {
      console.log("we should GSAP lock the rotation here !");
    } else {
      console.log("it's ok");
    }
    Draggable.create("#wheel", {
      type: "rotation",
      snap: function(endValue) {
        //todo only available with the GreenClub...
        return Math.round(endValue / 90) * 90;
      },
      dragResistance: 0.2,
      allowContextMenu: true,
      onDragEnd() {
        console.log("drag has ended\n", this.rotation);
      },
      bounds: { minRotation: -10000, maxRotation: 10000 }
    });
  },
  methods: {
    drawCirclePath(alpha, beta) {
      console.log(alpha, beta);
      // alpha is start angle, beta is end of the circle arc, both in degrees
      let x = `M ${this.xLeftCorner(alpha)} ${this.yLeftCorner(alpha)}
      A ${this.arcRadius} ${this.arcRadius} 0 0 1 ${this.xRightCorner(
        beta
      )} ${this.yRightCorner(beta)}
      L ${this.wheelCenter} ${this.wheelCenter}z`;
      console.log(x);
      return x;
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
    backButtonClick() {
      console.log("clicked");
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
      //? offset with GSAP ?
      let offsetAngle = 0;
      if (this.elements.length > 2) {
        offsetAngle = this.degrePerArc / 2;
      }
      return offsetAngle;
    }
  }
};
</script>

<style lang="sass" scoped>
svg
  width: 90vw
  height: 90vh
  margin: 0
  padding: 0
  border: 4px solid teal
.svg-box
  position: absolute
.left-offset
  // transform: translateX(-50vw)
.curved-text
  font-size: 2rem
.anchor
  stroke: rgb(0,0,0)
  stroke-width: 2
.test
  position: absolute
  top: 47%
  right: 0%
  img
    width: 64px
</style>
