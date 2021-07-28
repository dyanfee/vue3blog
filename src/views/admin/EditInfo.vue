<template>
  <div class="edit-info">
    <h3>博客信息管理</h3>
    <el-form ref="form" :model="blogInfo" label-width="80px">
      <el-form-item label="公告栏">
        <el-input autosize v-model="blogInfo.notice"></el-input>
      </el-form-item>
    </el-form>
    <div class="edit-info--buttom">
      <my-button type="primary" @click="onSubmit">立即修改</my-button>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import MyButton from "components/button";
export default {
  name: "EditInfo",
  components: { MyButton },
  setup() {
    const sotre = useStore();
    const blogInfo = reactive({
      notice: "",
    });

    onMounted(() => {
      blogInfo.notice = sotre.getters.info.notice.content;
    });
    function onSubmit() {
      
    }

    return {
      blogInfo,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-info {
  background-color: #fff;
  @include shadow(12px, 2px);
  & > * {
    padding: 20px;
  }
  .edit-info--buttom {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>
