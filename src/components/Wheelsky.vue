<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${viewBoxRange * 2} ${viewBoxRange * 2}`"
    >
      <ellipse :cx="viewBoxRange" :cy="viewBoxRange" :rx="arcRadius" :ry="arcRadius" fill="#eee"></ellipse>
      <path
        v-for="(section, index) in circleSections"
        :key="section.id"
        :id="`arc_path${index + 1}`"
        :d="drawCirclePath(degrePerArc * index, degrePerArc * (index + 1))"
        :fill="colors[index]"
      ></path>
      <!-- <text>
          <textPath
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#arc_path"
            text-anchor="middle"
            startOffset="50%"
          >Dark Souls is Awesome !</textPath>
      <!-- </text>-->
      <!-- $$('svg path')[0].getTotalLength()-->
      <circle :cx="wheelCenter" :cy="wheelCenter" r="30" fill="teal"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewBoxRange: 300,
      circleSections: ["a", "b", "c", "d", "e"],
      colors: ["#fa7a55", "#fb1", "#b000b5", "#c0ff33", "#e2071c", "#1ad1e5"]
    };
  },
  mounted() {
    if (this.circleSections.length == 1) {
      console.log("we should GSAP lock the rotation here !");
    } else {
      console.log("it's ok");
    }
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
    arcRadius() {
      return this.viewBoxRange / 2;
    },
    degrePerArc() {
      return 360 / this.circleSections.length;
    }
  }
};
</script>

<style lang="sass" scoped>
svg
  // position: fixed
  // width: 100%
  // height: 100%
  // margin-left: -50%
  border: 4px solid teal
</style>
