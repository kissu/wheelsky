<template>
  <div class="details">
    <p>{{ highlightedFlavor }}</p>
    <button class="btn btn-yellow" @click="digFlavor">Choose me senpai button !</button>
  </div>
</template>

<script>
export default {
  props: {
    highlightedFlavor: {
      type: String,
      default: "Error on the highlighted flavor...",
      required: true
    }
  },
  methods: {
    digFlavor() {
      this.$emit("dig-flavor", this.highlightedFlavor);
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
