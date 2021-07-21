<template>
  <div class="article_list">
    <el-table :data="articleData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="category" label="分类" width="180" />
      <el-table-column prop="nickName" label="作者" />
      <el-table-column prop="createTime" label="创建日期">
        <template #default="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新日期">
        <template #default="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getArticles, deleteArticle } from "network/article";
import { watch } from "@vue/runtime-core";
import { formatDate } from "@/utils";
import { useRouter } from "vue-router";
export default {
  name: "Articles",
  setup(props) {
    const router = useRouter();
    const articleData = ref([]);
    const search = ref("");
    _getArticles();
    watch(search, (val) => {
      // console.log(val);
    });

    function _getArticles() {
      getArticles()
        .then((res) => {
          articleData.value = res.body;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function handleEdit(index, item) {
      const query = { id: item.id, title: item.title };
      router.push({
        name: "EditArticle",
        query,
      });
    }
    function handleDelete(index, item) {
      const params = { id: item.id };
      deleteArticle(params).then((res) => {
        console.log(res);
        _getArticles();
      });
    }
    return {
      articleData,
      search,
      handleEdit,
      handleDelete,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped></style>
