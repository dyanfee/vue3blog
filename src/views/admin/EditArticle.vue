<template>
  <div class="edit-article">
    <div class="edit-header">
      <el-input
        class="editor-title"
        v-model="article.title"
        placeholder="请输入标题"
      ></el-input>
      <my-button type="primary">发布文章</my-button>
    </div>

    <md-editor class="md-editor"></md-editor>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import MdEditor from "./compoents/MdEditor";
import MyButton from "components/button";
export default {
  name: "EditArticle",
  components: {
    MdEditor,
    MyButton,
  },
  setup() {
    const article = reactive({
      title: "",
    });

    return {
      article,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-article {
  background-color: #fff;
  @include shadow(12px, 2px);
  .edit-header {
    font-size: 24px;
    font-weight: 600px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    & > * {
      padding: 10px;
    }
    .editor-title {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .md-editor {
    background-color: #fff;
    padding: 5px;
  }
}
</style>
