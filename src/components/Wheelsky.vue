<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${viewBoxRange * 2} ${viewBoxRange * 2}`"
    >
      <ellipse :cx="viewBoxRange" :cy="viewBoxRange" :rx="arcRadius" :ry="arcRadius" fill="#eee"></ellipse>
      <path
        :d="
          `M ${xLeftCorner} ${yLeftCorner}
          A ${arcRadius} ${arcRadius} 0 ${sweepAngleOver180} 1 ${xRightCorner} ${yRightCorner}
          L ${wheelCenter} ${wheelCenter}z`
        "
        :fill="this.color"
      ></path>
      <circle :cx="wheelCenter" :cy="wheelCenter" r="30" fill="teal"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewBoxRange: 200,
      dumbArray: ["a", "b", "c", "d", "e"],
      color: "#fa7a55",
      startAngle: 10,
      sweepAngle: 120
    };
  },
  computed: {
    wheelCenter() {
      return this.viewBoxRange;
    },
    startArcAngle() {
      return (this.startAngle * Math.PI) / 180;
    },
    finishArcAngle() {
      return ((this.startAngle + this.sweepAngle) * Math.PI) / 180;
    },
    xLeftCorner() {
      return this.wheelCenter + this.arcRadius * Math.sin(this.startAngle);
    },
    yLeftCorner() {
      return this.wheelCenter - this.arcRadius * Math.cos(this.startAngle);
    },
    xRightCorner() {
      return this.wheelCenter + this.arcRadius * Math.sin(this.finishArcAngle);
    },
    yRightCorner() {
      return this.wheelCenter - this.arcRadius * Math.cos(this.finishArcAngle);
    },
    sweepAngleOver180() {
      return this.sweepAngle > 180 ? 1 : 0;
    },
    arcRadius() {
      return this.viewBoxRange / 1.3;
    }
  }
};
</script>

<style lang="sass" scoped>
svg
  position: fixed
  width: 100%
  height: 100%
  // margin-left: -50%
  // border: 4px solid teal
</style>
