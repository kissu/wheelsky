<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500px"
      height="500px"
      :viewBox="`0 0 ${viewBoxRange * 2} ${viewBoxRange * 2}`"
      id="wheel"
      class="left-offset"
    >
      <ellipse :cx="viewBoxRange" :cy="viewBoxRange" :rx="arcRadius" :ry="arcRadius" fill="#eee"></ellipse>
      <path
        v-for="(element, index) in elements"
        :key="element.id"
        :id="`arc_path${index + 1}`"
        :d="drawCirclePath(degrePerArc * index, degrePerArc * (index + 1))"
        :fill="element.color"
      ></path>
      <!-- $$('svg path')[0].getTotalLength()-->
      <text>
        <textPath
          xmlns:xlink="http://www.w3.org/1999/xlink"
          v-bind="{'xlink:href':`#arc_path${test}`}"
          text-anchor="middle"
          startOffset="50%"
        >Dark Souls is Awesome !</textPath>
      </text>
      <circle
        @click="backButtonClick"
        :cx="wheelCenter"
        :cy="wheelCenter"
        r="30"
        fill="teal"
        data-clickable="true"
      ></circle>
    </svg>
  </div>
</template>

<script>
import Draggable from "gsap/Draggable";

export default {
  data() {
    return {
      viewBoxRange: 500,
      arcRadius: 400,
      test: 2,
      elements: [
        {
          name: "a",
          color: "#1ad1e5"
        },
        {
          name: "b",
          color: "#e2071c"
        },
        {
          name: "c",
          color: "#fb1"
        },
        {
          name: "d",
          color: "#b000b5"
        },
        {
          name: "e",
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
      dragResistance: 0.5,
      allowContextMenu: true,
      onDragEnd() {
        console.log("drag has ended\n", this);
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
    backButtonClick() {
      console.log("clicked");
    },
    startArcAngle(angle) {
      return (angle * Math.PI) / 180;
    },
    finishArcAngle(angle) {
      return (angle * Math.PI) / 180;
    },
    xLeftCorner(angle) {
      return (
        this.wheelCenter + this.arcRadius * Math.sin(this.startArcAngle(angle))
      );
    },
    yLeftCorner(angle) {
      return (
        this.wheelCenter - this.arcRadius * Math.cos(this.startArcAngle(angle))
      );
    },
    xRightCorner(endAngle) {
      return (
        this.wheelCenter +
        this.arcRadius * Math.sin(this.finishArcAngle(endAngle))
      );
    },
    yRightCorner(endAngle) {
      return (
        this.wheelCenter -
        this.arcRadius * Math.cos(this.finishArcAngle(endAngle))
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
  // position: absolute
  width: 100vw
  height: 100vh
  margin: 0
  padding: 0
  border: 4px solid teal
.left-offset
  // transform: translateX(-50vw)
</style>
