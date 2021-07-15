<template>
  <div class="side-bar-container">
    <logo />
    <my-menu :default-active="activeMenu">
      <side-bar-item
        v-for="item in list"
        :key="item.title"
        :item="item"
      ></side-bar-item>
    </my-menu>
  </div>
</template>

<script>
import MenuItem from "components/menu/MenuItem";
import SubMenu from "components/menu/SubMenu";
import Item from "./Item";
import MyMenu from "components/menu/Menu";
import SideBarItem from "./SideBarItem";
import Logo from "./Logo";
import { ref } from "@vue/reactivity";
export default {
  name: "SideBar",
  components: {
    SideBarItem,
    Logo,
    MyMenu,
    MenuItem,
    SubMenu,
    Item,
  },
  setup() {
    const list = ref([]);
    const activeMenu = ref("项目二");
    list.value = [
      { path: "/", icon: "edit", title: "项目一" },
      {
        path: "/",
        icon: "edit",
        title: "项目二",
        children: [
          { path: "/", icon: "edit", title: "项目二-1" },
          { path: "/", icon: "edit", title: "项目二-2" },
        ],
      },
      { path: "/", icon: "edit", title: "项目三" },
      {
        path: "/",
        icon: "edit",
        title: "项目四",
        children: [
          {
            path: "/",
            icon: "edit",
            title: "项目四-1",
            children: [
              { path: "/", icon: "edit", title: "项目四-1-1" },
              { path: "/", icon: "edit", title: "项目四-1-2" },
            ],
          },
          { path: "/", icon: "edit", title: "项目四-2" },
        ],
      },
      { path: "/", icon: "edit", title: "项目五" },
    ];
    return { list, activeMenu };
  },
};
</script>

<style lang='scss' scoped>
.side-bar-container {
  width: 210px;
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.3s;
  // align-content: flex-start;
}
</style>