<template>
  <div class="article-card">
    <div class="article-card-header">
      <div class="article-card-name">article-card-name</div>
      <div class="article-card-desc">
        <icon-text class="article-card-desc_item" i="eye">27</icon-text>
        <icon-text class="article-card-desc_item" i="comment">0</icon-text>
      </div>
    </div>
    <div class="article-card-content">
      <span>
        容这是这是内容这是内容是内容这是这是内容这内容这是内容这是内容这是内容
      </span>
    </div>
    <div class="article-card-footer">
      <icon-text class="article-card-desc_item" i="user">七月</icon-text>
      <div class="article-card-footer__center">
        <tag>Vue</tag>
      </div>
      <div class="article-card-footer__right">2021.06.26 11:11</div>
    </div>
  </div>
</template>

<script>
import IconText from "components/Icon/IconText.vue";
import Tag from "components/Tag";
import { inject } from "@vue/runtime-core";
export default {
  name: "ArticleCard",
  components: {
    IconText,
    Tag,
  },

};
</script>

<style lang='scss' scoped>
.article-card {
  @include hover-up(5px, 0, -5px);
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 2px rgba($color: #000, $alpha: 0.2);
  width: 100%;
  box-sizing: border-box;
  color: $color-text;
  border-radius: 6px;

  .article-card-header {
    display: flex;
    justify-content: space-between;
    .article-card-name {
      font-size: 22px;
      font-weight: bold;
    }
    .article-card-desc {
      display: flex;
      justify-content: center;
      .article-card-desc_item {
        font-size: 14px;
        padding-right: 10px;
      }
    }
  }
  .article-card-content {
    display: flex;
    font-size: 16px;

    min-width: 20px;
    line-height: 1.5;
    padding-top: 20px;
    padding-bottom: 15px;
    flex: 1;
    span {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .article-card-footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>