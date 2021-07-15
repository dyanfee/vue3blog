<template>
  <transition>
    <div class="my-menu-container">
      <ul
        :class="{
          'my-menu': true,
          'my-menu--collapse': collapse,
          'my-menu--horizontal': mode === 'horizontal',
        }"
      >
        <slot />
      </ul>
    </div>
  </transition>
</template>

<script>
import { ref } from "@vue/reactivity";
import {
  getCurrentInstance,
  onMounted,
  provide,
  watch,
} from "@vue/runtime-core";
import mitt from "mitt";
export default {
  name: "Menu",
  props: {
    collapse: Boolean,
    mode: {
      type: String,
      default: "vertical",
    },
    defaultActive: {
      type: String,
      default: "",
    },
    menuTrigger: {
      type: String,
      default: "hover",
    },
    backgroundColor: { type: String },
    textColor: { type: String },
    activeTextColor: { type: String },
  },
  emits: ["close", "open", "select"],
  setup(props, ctx) {
    const activeIndex = props.defaultActive;
    const openedMenus = ref([]);
    console.log(activeIndex);
    const items = ref({});
    const submenus = ref({});
    const rootMenuEmitter = mitt();

    function initializeMenu() {
      const index = activeIndex.value;
      const activeItem = item.value[index];
      if (!activeItem || props.mode === "horizontal" || props.collapse) return;

      let indexPath = activeItem.indexPath;

      // 展开该菜单项的路径上所有子菜单
      indexPath.forEach((index) => {
        let submenu = submenus.value[index];
        submenu && openMenu(index, submenu?.indexPath);
      });
    }
    const addSubMenu = (item) => {
      submenus.value[item.index] = item;
    };

    const removeSubMenu = (item) => {
      delete submenus.value[item.index];
    };

    const addMenuItem = (item) => {
      items.value[item.index] = item;
    };

    const removeMenuItem = (item) => {
      delete items.value[item.index];
    };

    const openMenu = (index, indexPath) => {
      if (openedMenus.value.includes(index)) return;
      // 将不在该菜单路径下的其余菜单收起
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index) => {
          return unref(indexPath).indexOf(index) !== -1;
        });
      }
      openedMenus.value.push(index);
    };

    const closeMenu = (index) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const open = (index) => {
      const { indexPath } = submenus.value[index.toString()];
      indexPath.forEach((i) => openMenu(i, indexPath));
    };

    const handleSubmenuClick = (submenu) => {
      const { index, indexPath } = submenu;
      let isOpened = openedMenus.value.includes(index);

      if (isOpened) {
        closeMenu(index);
        ctx.emit("close", index, indexPath.value);
      } else {
        openMenu(index, indexPath);
        ctx.emit("open", index, indexPath.value);
      }
    };
    const handleItemClick = (item) => {
      const { index, indexPath } = item;
      const hasIndex = item.index !== null;
      // const oldActiveIndex = activeIndex.value;

      if (hasIndex) {
        activeIndex.value = item.index;
      }

      ctx.emit("select", index, indexPath.value, item);

      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
    };
    const updateActiveIndex = (val) => {
      const itemsInData = items.value;
      debugger
      const item =
        itemsInData[val] ||
        itemsInData[activeIndex.value] ||
        itemsInData[props.defaultActive];
      console.log(item);
      if (item) {
        activeIndex.value = item.index;
        initializeMenu();
      } else {
        // Can't find item when collapsing
        // and activeIndex shouldn't be changed when 'collapse' was changed.
        // Then reset 'alteredCollapse' immediately.
        if (!alteredCollapse.value) {
          activeIndex.value = null;
        } else {
          alteredCollapse.value = false;
        }
      }
    };

    // watch(
    //   () => props.defaultActive,
    //   (currentActive) => {
    //     if (!items.value[currentActive]) {
    //       activeIndex.value = "";
    //     }
    //     updateActiveIndex(currentActive);
    //   }
    // );
    // watch(items.value, () => {
    //   updateActiveIndex();
    // });

    onMounted(() => {
      initializeMenu();
      rootMenuEmitter.on("menuItem:item-click", handleItemClick);
      rootMenuEmitter.on("submenu:submenu-click", handleSubmenuClick);
    });

    provide("rootMenu", {
      openedMenus,
      props,
      items,
      submenus,
      activeIndex,
      methods: {
        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
      },
      rootMenuEmit: rootMenuEmitter.emit,
      rootMenuOn: rootMenuEmitter.on,
    });
    const instance = getCurrentInstance();
    provide(`subMenu:${instance.uid}`, {
      addSubMenu,
      removeSubMenu,
    });
  },
};
</script>

<style lang='scss' scoped>
.my-menu-container {
  height: 100%;
  background-color: #fff;
}
</style>
<style lang="scss">
.my-menu {
  font-size: 14px;
}
</style>