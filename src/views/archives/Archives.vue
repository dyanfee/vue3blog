<template>
  <div class="archives">
    <div class="posts-collapse">
      <div class="posts-nav">
        <div class="posts-counter-before"></div>
        <div class="posts-counter">总计{{ 10 }}篇日志</div>
      </div>
      <card-archives v-for="item in articles" :item="item" :key="item.id"></card-archives>
    </div>
  </div>
</template>

<script>
import CardArchives from "components/card/CardArchives";
import { reactive, ref } from "vue";
import { getArticles } from "network/article";
export default {
  name: "Archives",
  components: {
    CardArchives,
  },
  setup() {
    const articles = ref([]);
    const page = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    _getArticle();

    function _getArticle() {
      getArticles()
        .then((res) => {
          articles.value = res.body;
          console.log(res.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      articles,
    };
  },
};
</script>

<style lang="scss" scoped>
.archives {
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  padding: 30px 10px;
  @extend %base-shadow;

  .posts-collapse {
    padding-left: 2em;
    width: 100%;
    position: relative;

    .posts-nav {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .posts-counter-before {
        content: "";
        width: 10px;
        height: 10px;
        margin-left: -3px;
        background-color: #bbb;
        border-radius: 50%;
      }
      .posts-counter {
        padding-left: 20px;
      }
    }

    &::before {
      content: " ";
      position: absolute;
      top: 15px;
      bottom: 0px;
      width: 4px;
      background-color: #f5f5f5;
      z-index: 1;
    }
  }
}
</style>
