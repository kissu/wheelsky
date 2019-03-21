<template>
  <div>
    <wheelsky :elements="flavors"></wheelsky>
  </div>
</template>

<script>
import Wheelsky from "./components/Wheelsky.vue";

export default {
  name: "app",
  components: {
    Wheelsky
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
      ]
    };
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
