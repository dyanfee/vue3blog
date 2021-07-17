<template>
  <!-- 后台界面 -->
  <div class="app-container">
    <side-bar />
    <div class="main">
      <div class="">
        <nav-bar />
        <!-- <tags-view /> -->
      </div>
      <admin-main />
    </div>
  </div>
</template>


<script>
import { provide, onMounted } from "vue";
import { resizeMixin, resizeHandler } from "../resizeHandler";
import SideBar from "./components/SideBar";
import TagsView from "./components/TagsView";
import NavBar from "./components/NavBar";
import AdminMain from "./components/AdminMain";
export default {
  name: "Admin",
  mixins: [resizeMixin],
  components: {
    SideBar,
    TagsView,
    NavBar,
    AdminMain,
  },
  setup(props, ctx) {
    // 钩子函数
    onMounted(() => {
      resizeHandler(({ width }) => {});
    });

    provide("resize", {
      resizeHandler,
    });
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #f5f5f5;
  height: 100vh;
  .main {
    width: 100%;
    background-color: rgb(223, 223, 223);
    .fixed-header {
    }
  }
}
</style>