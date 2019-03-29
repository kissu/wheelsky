<template>
  <div class="details">
    <p>{{ highlightedFlavor }}</p>
    <button class="btn btn-yellow" @click="digFlavor">{{ choisirSaveur }}</button>
  </div>
</template>

<script>
export default {
  props: {
    highlightedFlavor: {
      type: String,
      default: "Erreur sur le parfum choisi !",
      required: true
    },
    depthTier: {
      type: Number,
      default: 1,
      required: true
    }
  },
  methods: {
    digFlavor() {
      if (this.depthTier == 3) {
        console.log("We have a chosen flavor !");
        this.$emit("reset-depth", this.highlightedFlavor);
      } else {
        this.$emit("dig-flavor", this.highlightedFlavor);
      }
    }
  },
  computed: {
    choisirSaveur() {
      if (this.depthTier < 3) {
        return "Suivant";
      } else {
        return "Choisir cette saveur";
      }
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
