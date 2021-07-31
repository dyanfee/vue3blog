<template>
  <div class="detail">
    <div class="detail_header">{{ post.title }}</div>
    <div class="detail_info">
      <icon-text i="calendar">{{ format(post.createTime) }}</icon-text>
      <icon-text i="eye">{{ post.views }}</icon-text>
      <!-- <icon-text i="comment">99</icon-text> -->
      <icon-text i="thumbs-up">199</icon-text>
    </div>
    <div class="detail_content">
      <md-viewer :initialValue="post.content"></md-viewer>
      <!-- {{ post.content }} -->
    </div>
    <div class="detail_footer">
      <div class="detail_footer-updtime">
        <span>更新于{{ $filters.formatTime(post.updateTime) }}</span>
      </div>
      <div class="detail_footer-article">
        <div>
          分类:
          <span>{{ post.category }}</span>
        </div>
        <div v-if="post.tags && post.tags.length">
          标签:
          <span v-for="(item, index) in post.tags" :key="index">{{ item }}</span>
        </div>
      </div>
      <div class="detail_footer-button">
        <custom-button @click="clickShare" color="#e87461">
          <icon-text i="share">分享</icon-text>
        </custom-button>
        <custom-button @click="clickLike" color="#04aac7">
          <icon-text i="thumbs-up">点赞</icon-text>
        </custom-button>
      </div>
    </div>
    <div class="comment-area">
      <comment-input @replySuccess="replySuccess" :replyInfo="replyInfo"></comment-input>
      <comment-item
        @replySuccess="replySuccess"
        :comment="item"
        root
        v-for="item in comments"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getArticle } from "network/article";
import { getComments } from "network/comment";
import { useStore } from "vuex";
import CustomButton from "components/button/CustomButton";
import IconText from "components/Icon/IconText";
import Icon from "components/Icon";
import CommentInput from "components/comment/CommentInput";
import MyButton from "components/button";
import CommentItem from "components/comment/CommentItem";
import MdViewer from "./MdViewer";
import { formatDate } from "@/utils";
export default {
  name: "Detail",
  components: {
    IconText,
    CustomButton,
    MyButton,
    Icon,
    CommentInput,
    CommentItem,
    MdViewer,
  },
  data() {
    return {
      // replyInfo:{}
    };
  },
  setup(props) {
    const route = useRoute();
    const post = ref({});
    const comments = ref({});
    const replyInfo = ref({});
    const store = useStore();
    const id = route.params.id || "";
    onMounted(() => {
      replyInfo.value = {
        articleId: id,
        userId: store.getters.userId,
        type: 1,
      };
      _getArticle(id);
      _getComments(id);
    });

    function _getArticle(id) {
      getArticle({ id }).then((res) => {
        post.value = res.body;
      });
    }
    // 获取评论列表
    function _getComments(id) {
      getComments({ id }).then((res) => {
        comments.value = res.body;
      });
    }
    function clickLike() {
      console.log("clickLike");
    }
    function clickShare() {
      console.log("clickShare");
    }
    function submit(e) {
      console.log(e);
    }
    function replySuccess() {
      _getComments(id);
    }
    function format(date) {
      return formatDate(date, "yyyy-MM-dd");
    }
    return {
      post,
      comments,
      replyInfo,
      clickLike,
      clickShare,
      submit,
      replySuccess,
      format,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.detail {
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  padding: 10px 0;
  @extend %base-shadow;

  .detail_header {
    font-size: 26px;
    font-weight: 500;
    padding: 20px;
    text-align: center;
  }

  .detail_info {
    display: flex;
    font-size: 14px;
    color: #666;
    padding: 0 10px 30px;
    & > * {
      padding-right: 10px;
    }
  }

  .detail_content {
    width: 100%;
    padding: 0 10px;
  }
  .detail_footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
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
        // border: 1px red solid;
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
  .comment-area {
    width: 100%;
    padding: 40px 10px;
  }
}
</style>
