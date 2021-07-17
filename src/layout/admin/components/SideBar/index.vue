<template>
  <div class="side-bar-container">
    <logo />
    <el-menu
      :uniqueOpened="false"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#333"
      active-text-color="#039eb9"
    >
      <side-bar-item
        v-for="item in admin_routes"
        :key="item.path"
        :item="item"
      ></side-bar-item>
    </el-menu>
  </div>
</template>

<script>
import SideBarItem from "./SideBarItem";
import Logo from "./Logo";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "SideBar",
  components: {
    SideBarItem,
    Logo,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  setup() {
    const store = useStore();
    const admin_routes = store.getters.admin_routes
    return {admin_routes};
  },
};
</script>

<style lang='scss' scoped>
.side-bar-container {
  width: 210px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

}
</style>