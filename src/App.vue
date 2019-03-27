<template>
  <div class="main-content">
    <wheelsky
      class="wheel-block"
      @update-flavor="updateSelectedFlavor"
      :selected="selectedFlavor"
      :elements="flavors"
    ></wheelsky>
    <div class="right-aside-block">
      <flavor-details class="details-block" :selected="selectedFlavor"></flavor-details>
      <chosen-flavors></chosen-flavors>
    </div>
  </div>
</template>

<script>
import Wheelsky from "./components/Wheelsky.vue";
import FlavorDetails from "./components/FlavorDetails.vue";
import ChosenFlavors from "./components/ChosenFlavors.vue";

export default {
  name: "app",
  components: {
    Wheelsky,
    FlavorDetails,
    ChosenFlavors
  },
  data() {
    return {
      flavors: [
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
      ],
      selectedFlavor: undefined
    };
  },
  methods: {
    updateSelectedFlavor(e) {
      this.selectedFlavor = e.name;
    }
  }
};
</script>

<style lang="sass">
*
  box-sizing: content-box
  // overflow: auto;
body
  margin: 0
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
.main-content
  width: 100%
  display: flex
  justify-content: center
  align-items: center
.wheel-block
  position: relative
  flex: 1 1 0
.right-aside-block
  display: flex
  flex-direction: column
  flex: 1 0 0
  transform: translate3d(-25%, 0, 0)
  border: 3px solid yellow
</style>
