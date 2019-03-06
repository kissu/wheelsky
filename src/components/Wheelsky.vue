<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${viewBoxRange * 2} ${viewBoxRange * 2}`"
    >
      <path
        :d="`M ${xLeftCorner} ${yLeftCorner} A ${arcRadius} ${arcRadius} 0 0 1 ${xRightCorner} ${yRightCorner} L ${wheelCenter} ${wheelCenter}z`"
        :fill="this.color"
        transform="rotate(20)"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewBoxRange: 200,
      dumbArray: ["a", "b", "c", "d", "e"],
      color: "orange",
      startAngle: 0,
      sweepAngle: 45,
      arcRadius: 100
    };
  },
  computed: {
    wheelCenter() {
      return this.viewBoxRange / 2;
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
      return this.wheelCenter - this.wheelCenter * Math.cos(this.startAngle);
    },
    xRightCorner() {
      return this.wheelCenter + this.arcRadius * Math.sin(this.finishArcAngle);
    },
    yRightCorner() {
      return this.wheelCenter - this.arcRadius * Math.cos(this.finishArcAngle);
    }
  }
};
</script>

<style lang="sass" scoped>
svg
  height: 400px
  border: 4px solid teal
</style>
