<template>
  <div class="sidebar-item">
    <template v-if="!hasChildren(item.children)">
      <router-link to="/">
        <menu-item :index="item.title">
          <item :icon="item.icon" :title="item.title" />
        </menu-item>
      </router-link>
    </template>
    <sub-menu v-else :index="item.title">
      <template v-slot:title>
        <item :icon="item.icon" :title="item.title" />
      </template>
      <side-bar-item
        v-for="child in item.children"
        :key="child.title"
        :item="child"
      />
    </sub-menu>
  </div>
</template>

<script>
import MenuItem from "components/menu/MenuItem";
import SubMenu from "components/menu/SubMenu";
import Item from "./Item";
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
    function hasChildren(children = []) {
      if (children.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return {
      hasChildren,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>