<template>
  <div class="sidebar-item">
    <template
      v-if="
        hasShownChildren(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <router-link v-if="onlyOneChild.meta" :to="item.path">
        <el-menu-item :index="item.path">
          <item :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="item.path">
      <template v-slot:title>
        <item :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <side-bar-item
        v-for="child in item.children"
        :key="child.title"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
import MenuItem from "components/menu/MenuItem";
import SubMenu from "components/menu/SubMenu";
import Item from "./Item";
import { ref } from "@vue/reactivity";
export default {
  name: "SideBarItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    SubMenu,
    MenuItem,
    Item,
  },
  setup(props) {
    const onlyOneChild = ref({});
    function hasShownChildren(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          onlyOneChild.value = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    }
    return {
      onlyOneChild,
      hasShownChildren,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>