<template>
    <div></div>
</template>

<script>
export default {
  created() {
    this.$nextTick(() => {
      this.$router.$replace(
        {
          path: this.$route.query.old || ""
        },
        true
      );
    });
  }
};
</script>