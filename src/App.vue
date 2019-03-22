<template>
  <div>
    <wheelsky @update-flavor="updateSelectedFlavor" :elements="flavors"></wheelsky>
    <flavor-details :selected="selectedFlavor"></flavor-details>
  </div>
</template>

<script>
import Wheelsky from "./components/Wheelsky.vue";
import FlavorDetails from "./components/FlavorDetails.vue";

export default {
  name: "app",
  components: {
    Wheelsky,
    FlavorDetails
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
      selectedFlavor: null
    };
  },
  methods: {
    updateSelectedFlavor(e) {
      this.selectedFlavor = e.name;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
