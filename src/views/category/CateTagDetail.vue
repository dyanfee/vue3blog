<template>
  <base-cate-tag :name="name">
    <div class="article-list">
      <article-card v-for="item in articles" :item="item" :key="item.id"></article-card>
    </div>
    <div v-if="!articles.length" class="no-data">还没有文章...</div>
  </base-cate-tag>
</template>

<script>
import { useRoute } from "vue-router";
import BaseCateTag from "components/base-catetag";
import ArticleCard from "components/article-card";
import { reactive, ref } from "@vue/reactivity";
import { getArticleByTag, getArticleByCate } from "network/article";
import { watch } from "@vue/runtime-core";
export default {
  name: "CateTagDetail",
  components: {
    BaseCateTag,
    ArticleCard,
  },
  setup() {
    const route = useRoute();
    const articles = ref([]);
    let { id, type, name } = route.query;
    const page = reactive({
      pageNum: 0,
      pageSize: 10,
    });
    init();
    watch(
      () => route.query,
      () => {
        id = route.query.id;
        type = route.query.type;
        name = route.query.name;
        init();
      }
    );
    function init() {
      switch (type) {
        // 分类
        case "0":
          _getArticleByCate();
          break;
        // 标签
        case "1":
          _getArticleByTag();
          break;
      }
    }
    function _getArticleByCate() {
      const params = { id, page };
      getArticleByCate(params).then((res) => {
        articles.value = res.body;
      });
    }
    function _getArticleByTag() {
      const params = { id, page };
      getArticleByTag(params).then((res) => {
        articles.value = res.body;
      });
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
  padding: 20px 10px;
}
.no-data {
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
