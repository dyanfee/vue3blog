<template>
  <div @click="clickCard" class="article-card">
    <div class="article-card-header">
      <div class="article-card-name">{{ item.title }}</div>
      <div class="article-card-desc">
        <icon-text class="article-card-desc_item" i="eye">
          {{ item.views }}
        </icon-text>
        <!-- <icon-text class="article-card-desc_item" i="heart">
          {{ item.like }}
        </icon-text> -->
        <icon-text class="article-card-desc_item" i="comment">
          {{ item.like }}
        </icon-text>
      </div>
    </div>
    <div class="article-card-content">
      <span>
        {{ item.content }}
      </span>
    </div>
    <div class="article-card-footer">
      <icon-text class="article-card-desc_item" i="user">{{
        item.nickName
      }}</icon-text>
      <div class="article-card-footer__center">
        <tag @click.stop="clickCate">{{ item.category }}</tag>
      </div>
      <div class="article-card-footer__right">
        {{ formatTime(item.createTime) }}
      </div>
    </div>
  </div>
</template>

<script>
import IconText from "components/Icon/IconText.vue";
import Tag from "components/Tag";
import { formatDate } from "@/utils";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ArticleCard",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();

    function formatTime(value) {
      const date = new Date(value);
      return formatDate(date);
    }
    function clickCard() {
      router.push({
        path: "/detail/" + props.item.id,
      });
    }
    function clickCate(e) {
      console.log(e);
    }
    return {
      formatTime,
      clickCard,
      clickCate,
    };
  },
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
  color: $color-text-comm;
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