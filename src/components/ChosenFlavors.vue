<template>
  <div class="chosen-flavors">
    <p>Choosen flavors below</p>
    <span v-for="flavor in flavors" :key="flavor.id">{{ flavor }}</span>
    <br>
    <!-- <button class="btn btn-yellow">proceed further button !</button> -->
  </div>
</template>

<script>
export default {
  props: {
    selectedFlavors: {
      type: Array
    }
  },
  computed: {
    flavors() {
      if (this.selectedFlavors.length == 0) {
        return ["Aucun parfum choisi pour le moment"];
      } else {
        return this.selectedFlavors.join(", ");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
</style>
