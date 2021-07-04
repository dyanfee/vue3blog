<template>
  <div class="home">
    <article-card
      v-for="item in articles"
      :item="item"
      :key="item"
    ></article-card>
  </div>
</template>

<script>
import ArticleCard from "components/article-card";
import { onMounted, ref } from "@vue/runtime-core";
import { getArticles } from "network/article";
export default {
  name: "Home",
  components: {
    ArticleCard,
  },
  setup(props, ctx) {
    const articles = ref({});
    onMounted(() => {
      getArticles()
        .then((res) => {
          articles.value = res.body;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      articles,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
</style>
