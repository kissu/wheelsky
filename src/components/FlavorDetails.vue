<template>
  <div class="details">
    <p>{{ selected }}</p>
    <p>Choose me senpai !</p>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: "Error on the selected flavor...",
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.details
  display: block
  width: 100%
  height: 100%
  border: solid 1px red
  transform: translate3d(-25%, 0, 0)
  img
    width: 50vw
    height: 200px
</style>
