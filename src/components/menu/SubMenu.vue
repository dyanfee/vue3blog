<template>
  <li class="sub-menu">
    <div class="sub-menu__title">
      <slot name="title" />
    </div>
    <ul class="my-menu">
      <slot />
    </ul>
  </li>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  name: "SubMenu",
  setup() {
    // inject
    const {
      openedMenus,
      // hoverBackground: rootHoverBackground,
      methods,
      props,
      methods: { closeMenu },
      rootMenuOn,
      rootMenuEmit,
    } = inject("rootMenu");

    const {
      addSubMenu: parentAddSubmenu,
      removeSubMenu: parentRemoveSubmenu,
      handleMouseleave: parentHandleMouseleave,
    } = inject(`subMenu:${parentMenu.value.uid}`);
  },
};
</script>

<style lang='scss' scoped>
.sub-menu {
  list-style-type: none;
  .sub-menu__title {
    height: 56px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    // padding-left: 10px;
    &:hover {
      background-color: #f3f3f3;
    }
  }
}
</style>