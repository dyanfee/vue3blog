<template>
  <div class="detail">
    <div class="detail_header">{{ post.title }}</div>
    <div class="detail_info">
      <icon-text i="calendar">2021-07-04</icon-text>
      <icon-text i="eye">{{ post.views }}</icon-text>
      <icon-text i="comment">99</icon-text>
      <icon-text i="thumbs-up">199</icon-text>
    </div>
    <div class="detail_content">
      {{ post.content }}
    </div>
    <div class="detail_footer">
      <div class="detail_footer-updtime">
        <span>更新于{{ "2021-7-6 23:34:00" }}</span>
      </div>
      <div class="detail_footer-article">
        <div>
          分类:
          <span>程序人生</span>
        </div>
        <div>
          标签:
          <span>vue</span>
          <span>react</span>
        </div>
      </div>
      <div class="detail_footer-button">
        <my-button @click="clickShare" color="#e87461">
          <icon-text i="share">分享</icon-text>
        </my-button>
        <my-button @click="clickLike" color="#04aac7">
          <icon-text i="thumbs-up">点赞</icon-text>
        </my-button>
      </div>
    </div>
    <comment />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getArticle } from "network/article";
import MyButton from "components/button";
import IconText from "components/Icon/IconText";
import Comment from "components/comment";
export default {
  name: "Detail",
  components: {
    IconText,
    MyButton,
    Comment,
  },
  setup(props) {
    const route = useRoute();
    const post = ref({});

    onMounted(() => {
      const id = route.params.id || "";
      _getArticle(id);
    });

    function _getArticle(id) {
      getArticle({ id }).then((res) => {
        post.value = res.body;
      });
    }
    function clickLike() {
      console.log("clickLike");
    }
    function clickShare() {
      console.log("clickShare");
    }
    return {
      post,
      clickLike,
      clickShare,
    };
  },
};
</script>

<style lang='scss' scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  padding: 10px;
  @extend %base-shadow;

  .detail_header {
    font-size: 26px;
    font-weight: 500;
    padding: 20px;
  }

  .detail_info {
    display: flex;
    font-size: 14px;
    color: #666;
    padding-bottom: 30px;
    & > * {
      padding-right: 10px;
    }
  }

  .detail_content {
    width: 100%;
  }
  .detail_footer {
    width: 100%;
    .detail_footer-updtime {
      display: flex;
      justify-content: flex-end;
      // padding-right: 10px;
      padding-top: 20px;
      font-size: 14px;
      color: #999;
    }
    .detail_footer-article {
      font-size: 14px;
      color: #000;
      span {
        @include text-hover;
        margin-left: 10px;
        border: 1px red solid;
      }
      & > * {
        padding: 8px 5px;
        margin: 15px 0 0;
      }
    }
    .detail_footer-button {
      display: flex;
      justify-content: center;
      & > * {
        margin: 0 10px;
      }
    }
  }
}
</style>