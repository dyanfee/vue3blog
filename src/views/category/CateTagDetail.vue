<template>
  <base-cate-tag :name="name">
    <div class="article-list">
      <article-card v-for="item in articles" :item="item" :key="item"></article-card>
    </div>
  </base-cate-tag>
</template>

<script>
import { useRoute } from "vue-router";
import BaseCateTag from "components/base-catetag";
import ArticleCard from "components/article-card";
import { ref } from "@vue/reactivity";
export default {
  name: "CateTagDetail",
  components: {
    BaseCateTag,
    ArticleCard,
  },
  setup() {
    const route = useRoute();
    const articles = ref([]);
    const { id, type, name } = route.query;
    console.log(route.query);

    switch (type) {
      // 分类
      case "0":
        console.log("--------");
        break;
      // 标签
      case "1":
        
        break;
    }

    return {
      name,
      articles,
    };
  },
};
</script>

<style lang="scss" scoped>
.article-list {
}
</style>
