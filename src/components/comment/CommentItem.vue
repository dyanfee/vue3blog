<template>
  <div class="comment-item">
    <div class="comment-header">
      <div class="comment-avatar">
        <img
          src="https://pic1.zhimg.com/9d925a6f9acab09577006f4ee7486024_xl.jpg"
          alt="头像"
        />
        <span>{{ comment.nickName }}</span>
        <span v-if="!root" style="color: #8590a6">回复</span>
        <span v-if="!root">{{ comment.parentNickName }}</span>
      </div>
      <div class="comment-date">
        {{ $filters.formatDate(comment.createTime) }}
      </div>
    </div>
    <div class="comment-body">{{ comment.content }}</div>
    <div class="comment-footer">
      <div class="footer-func">
        <icon-text i="thumbs-up">{{ comment.like }}</icon-text>
        <icon-text @click="replay" i="comment">回复</icon-text>
        <icon-text i="thumbs-down">踩</icon-text>
      </div>
      <div v-if="isShowReplay" class="comment-replay">
        <comment-input
          @replySuccess="replySuccess"
          :replyInfo="replyInfo"
        ></comment-input>
      </div>
    </div>
    <div v-if="root">
      <comment-item
        class="child-comment"
        v-for="item in comment.childComment"
        :key="item.id"
        :comment="item"
        @replySuccess="replySuccess"
      ></comment-item>
    </div>
  </div>
</template>

<script>
import IconText from "components/Icon/IconText";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import { ref } from "@vue/reactivity";
export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
    root: Boolean,
  },
  components: {
    IconText,
    CommentInput,
    CommentItem,
  },
  setup(props, { emit }) {
    const isShowReplay = ref(false);
    const replyInfo = ref({});
    replyInfo.value = {
      articleId: props.comment.articleId,
      parentCommentId: props.comment.parentCommentId || props.comment.id, // 将回复这条评论 没有父评论则当前为父id
      parentUserId: props.comment.userId, // 将回复当前评论的作者
      type: 0,
    };

    function replay() {
      isShowReplay.value = !isShowReplay.value;
    }

    function replySuccess() {
      emit("replySuccess");
      isShowReplay.value = false;
    }

    return {
      replay,
      isShowReplay,
      replyInfo,
      replySuccess,
    };
  },
};
</script>

<style lang='scss' scoped>
.comment-item {
  width: 100%;
  font-size: 14px;
  padding-top: 20px;
  .comment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .comment-avatar {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        padding-left: 10px;
      }
    }
  }
  .comment-body {
    padding-top: 10px;
    padding-left: 30px;
  }
  .comment-footer {
    padding-top: 10px;
    padding-left: 30px;
    .footer-func {
      display: flex;
      transition: all 0.3s;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);

      & > * {
        padding-left: 5px;
        color: $color-high-text-l;
      }
    }
    .comment-replay {
      transition: all 0.3s;
    }
  }
  .child-comment {
    padding-left: 30px;
    padding-top: 10px;
  }
}
</style>