<template>
  <div class="comment-input">
    <div class="input-area">
      <div
        ref="inputContainer"
        class="input-container"
        @blur="loseFocus"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
        @click="clickInput"
      >
        <div
          contenteditable="true"
          spellcheck="true"
          ref="input"
          class="input"
          placeholder="期待大佬的评论..."
        ></div>
        <!-- v-model="comment" -->
      </div>
      <div ref="inputUpload" class="input-upload">
        <icon name="smile" />
      </div>
    </div>
    <div ref="submitArea" class="submit-area">
      <my-button class="custom-button" size="suit" @click="submit"
        >发布</my-button
      >
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";

import { addClass, removeClass } from "@/utils";
import MyButton from "components/button";
import { replyComment } from "network/comment";
import { useStore } from "vuex";
export default {
  name: "CommentInput",
  props: {
    replyInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: { MyButton },
  setup(props, { emit }) {
    const input = ref({});
    const inputUpload = ref({});
    const inputContainer = ref({});
    const submitArea = ref({});
    const store = useStore();
    let initHeight = 0;
    let initWidth = 0;
    let curHeight = 0;
    let curWidth = 0;
    let init = false;

    onMounted(() => {
      resizeObserver.observe(input.value);
      // inputContainer.value.addEventListener("mouseup", clickInput);
    });
    onUnmounted(() => {
      // inputContainer.value.removeEventListener("mouseup", clickInput);
    });
    function clickInput() {
      input.value.focus();
      // submitArea.value.style.transform = "scale(1)";
      // submitArea.value.style.width = "100px";
    }
    function loseFocus() {
      // submitArea.value.style.transform = "scale(0)";
      // submitArea.value.style.width = "0";
    }
    function submit() {
      const text = input.value.innerText;
      // console.log(props.replyInfo);
      if (!text) {
        console.log(`评论不能为空！`);
        return;
      }
      let data = {
        ...props.replyInfo,
        content: text,
        userId: store.getters.userId,
      };
      replyComment(data).then((res) => {
        // 评论成功
        emit("replySuccess");
      });
    }
    function mouseDown() {
      // console.log("mouseDown");
    }
    function mouseUp() {
      // console.log("mouseUp");
    }

    const resizeObserver = new ResizeObserver((entries) => {
      // 监测到高度变化后需要处理的逻辑
      curHeight = entries[0].contentRect.height;
      curWidth = entries[0].contentRect.width;
      if (!init) {
        init = true;
        initHeight = input.value.clientHeight;
        // 修正padding 的宽度
        initWidth = inputContainer.value.clientWidth - 20;
        inputContainer.value.style.width = initWidth;
      }
      if (curHeight > initHeight || curWidth > initWidth) {
        addClass(inputUpload.value, "input-space-between");
      } else {
        removeClass(inputUpload.value, "input-space-between");
      }
    });

    return {
      input,
      inputUpload,
      inputContainer,
      submitArea,
      clickInput,
      loseFocus,
      submit,
      mouseUp,
      mouseDown,
    };
  },
};
</script>

<style lang='scss' scoped>
.input-space-between {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 36px;
  width: 100%;
  box-sizing: border-box;
  // flex: 1;
  flex-shrink: 0;
}
.comment-input {
  display: flex;
  width: 100%;
  // width: 400px;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 10px 0;
  transition: all 0.3s;
  .input-area {
    display: flex;
    min-height: 36px;
    width: 100%;
    border: 1px solid #999;
    justify-content: space-between;
    border-radius: 5px;
    flex-wrap: wrap;
    box-sizing: border-box;

    .input-container {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      flex: 1;
      .input {
        font-size: 16px;
        outline: none;
        padding: 0 10px;
        max-width: 100%;
        flex-shrink: 1;
        line-height: 2;
        user-select: text;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-break: break-all;
        -webkit-user-modify: read-write-plaintext-only;

        /*为空时显示 element attribute content*/
        &:empty::after {
          content: attr(placeholder); /* element attribute*/
          // content: "this is content";
          color: #999;
        }
        /*焦点时内容为空*/
        &:focus::after {
          content: none;
          color: #000;
        }
      }
    }
    .input-upload {
      font-size: 24px;
      line-height: 30px;
      padding: 0 10px;
      flex-shrink: 1;
      // transition: all 0.3s;
      & > *:hover {
        color: $color-high-text;
      }
    }
  }
  .submit-area {
    padding: 0 10px;
    transition: all 0.3s;
    width: 100px;
    flex-shrink: 0;
    .custom-button {
      padding: 0;
    }
  }
}
</style>