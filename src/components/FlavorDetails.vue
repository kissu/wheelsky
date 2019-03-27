<template>
  <div class="details">
    <p>{{ highlighted }}</p>
    <button class="btn btn-yellow">Choose me senpai button !</button>
  </div>
</template>

<script>
export default {
  props: {
    highlighted: {
      type: String,
      default: "Error on the highlighted flavor...",
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.details
  margin: 3em auto
  // border: solid 1px red
  // transform: translate3d(-25%, 0, 0)
</style>
