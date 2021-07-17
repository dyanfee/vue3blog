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
import { getArticles } from "network/article";
import { watch } from "@vue/runtime-core";
import { formatDate } from "@/utils";
export default {
  name: "Articles",
  setup(props) {
    const articleData = ref([]);
    const search = ref("");

    watch(search, (val) => {
      // console.log(val);
    });

    getArticles()
      .then((res) => {
        articleData.value = res.body;
      })
      .catch((err) => {
        console.error(err);
      });

    function handleEdit(index, item) {}
    function handleDelete(index, item) {}
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

<style lang='scss' scoped>
</style>