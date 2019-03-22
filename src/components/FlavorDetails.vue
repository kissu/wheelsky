<template>
  <div>{{ selected }}</div>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: "nice",
      required: true
    }
  }
};
</script>

<style scoped>
</style>
