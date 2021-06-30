<template>
  <div class="home">
    <article-card v-for="item in 10" :key="item"></article-card>
  </div>
</template>

<script>
import ArticleCard from "components/article-card";
export default {
  name: "Home",
  components: {
    ArticleCard,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
