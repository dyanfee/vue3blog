<template>
  <div class="edit-article">
    <div class="edit-header">
      <el-input
        class="editor-title"
        v-model="article.title"
        placeholder="请输入标题"
      ></el-input>
      <my-button type="primary" @click="releaseArticle">发布文章</my-button>
    </div>
    <el-row class="edit-info">
      <el-col :span="1">分类</el-col>
      <el-col :span="11">
        <el-select
          v-model="article.category"
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章分类"
        >
          <el-option
            v-for="item in catesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="edit-info">
      <el-col :span="1">标签</el-col>
      <el-col :span="11">
        <el-select
          v-model="article.tags"
          filterable
          multiple
          allow-create
          default-first-option
          placeholder="请选择文章标签"
          style="width: 100%"
        >
          <el-option
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <md-editor
      ref="editorRef"
      @change="change"
      @editor="editorVm"
      class="md-editor"
    ></md-editor>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import {
  addArticle,
  allCategories,
  allTags,
  getArticle,
  editArticle,
} from "network/article";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "@vue/runtime-core";
import { getElementTop } from "@/utils";
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
      content: "",
      category: "",
      tags: [],
    });
    const catesOptions = ref([]);
    const tagOptions = ref([]);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // 通过invoke调用editor的方法
    const editorRef = ref(null);
    // 直接保存实例
    let editor = null;

    function setEditorHight() {
      if (!editor) return "";
      let h = document.body.clientHeight;
      const t = getElementTop(editor.options.el);
      // 减去自己的padding值
      editor.setHeight(h - t - 10 + "px");
    }
    function change() {
      if (editor) article.content = editor.getMarkdown();
    }
    function editorVm(e) {
      editor = e;
    }
    function releaseArticle() {
      const authorId = store.getters.userId;
      let id = route.query.id || "";
      const params = {
        authorId,
        title: article.title,
        content: article.content,
        category: article.category,
        tags: article.tags,
        articleId: id,
      };
      if (id) {
        // 保存编辑
        editArticle(params).then((res) => {
          if (res.code == 200) {
            router.replace("/admin/articles");
          }
        });
      } else {
        addArticle(params).then((res) => {
          if (res.code == 200) {
            router.replace("/admin/articles");
          }
        });
      }
    }
    function init() {
      allCategories().then((res) => {
        const data = res.body;
        catesOptions.value = data.map((e) => {
          return { value: e.label, ...e };
        });
      });
      allTags().then((res) => {
        tagOptions.value = res.body.map((e) => ({ value: e.label, ...e }));
      });
    }

    function _getArticle(params) {
      getArticle(params).then((res) => {
        const data = res.body;
        console.log(res);
        article.title = data.title;
        article.content = data.content;
        article.category = data.category || "";
        article.tags = data.tags || [];
        if (editor) editor.setMarkdown(article.content, 0);
      });
    }

    onMounted(() => {
      setEditorHight();
      init();
      if (route.query.id) {
        const params = {
          id: route.query.id,
        };
        _getArticle(params);
      }
    });

    return {
      article,
      releaseArticle,
      change,
      editorVm,
      catesOptions,
      tagOptions,
      editorRef,
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
    font-weight: 600;
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
  .edit-info {
    padding: 10px;
    display: flex;
    align-items: center;
  }
  .md-editor {
    background-color: #fff;
    padding: 5px;
  }
}
</style>
