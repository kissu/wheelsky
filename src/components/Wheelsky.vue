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
  props: {
    elements: {
      type: Array
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
        vueInstance.wheelRot = this;
      },
      bounds: { minRotation: -10000, maxRotation: 10000 }
    });
    this.$nextTick(function() {
      this.checkFlavor;
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
      return ((angle + 0) * Math.PI) / 180 + 0;
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
  watch: {
    wheelRotation(newValue, oldValue) {
      return console.log("spinning");
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
    yolo() {
      return "42";
    },
    wheelRot() {
      return Draggable.get("#wheel").rotation;
    },
    test() {
      this.yolo;
      this.$forceUpdate();
      return console.log("test passed");
    },
    checkFlavor() {
      const flavorIndex = Math.floor(
        ((-Draggable.get("#wheel").rotation + 90) % 360) / this.degrePerArc
      );
      console.log(flavorIndex);
      this.$emit("update-flavor", this.elements.slice(flavorIndex)[0]);
      console.log(
        `The chosen flavor is ${this.elements.slice(flavorIndex)[0].name}`
      );
      return flavorIndex;
    }
  }
};
</script>

<style lang="sass" scoped>
svg
  width: 100%
  height: 100%
  margin: 0
  padding: 0
  border: 4px solid teal
.svg-box
  position: absolute
.left-offset
  // transform: translateX(-50vw)
.curved-text
  font-size: 2rem
  border: 2px solid yellow
.anchor
  stroke: rgb(0,0,0)
  stroke-width: 2
.test
  position: absolute
  top: 47%
  right: -5%
  img
    width: 64px
</style>
