<template>
  <div>{{ selected }}</div>
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

<style scoped>
</style>
