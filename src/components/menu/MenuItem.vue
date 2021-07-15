<template>
  <li
    class="my-menu-item"
    tabindex="-1"
    :class="{
      'is-active': active,
      'is-disabled': disabled,
    }"
    :style="[paddingStyle, itemStyle, { backgroundColor }]"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </li>
</template>

<script>
import {
  computed,
  onMounted,
  onBeforeUnmount,
  inject,
  getCurrentInstance,
} from "vue";
import useMenu from "./useMenu";
export default {
  name: "MenuItem",
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance();
    const rootMenu = inject("rootMenu");
    const { parentMenu, paddingStyle, indexPath } = useMenu(
      instance,
      props.index
    );
    const { addSubMenu, removeSubMenu } = inject(
      `subMenu:${parentMenu.value.uid}`
    );
    const active = computed(() => {
      return props.index === rootMenu.activeIndex.value;
    });
    const hoverBackground = computed(() => {
      return rootMenu.hoverBackground.value;
    });
    const backgroundColor = computed(() => {
      return rootMenu.props.backgroundColor || "";
    });
    const activeTextColor = computed(() => {
      return rootMenu.props.activeTextColor || "";
    });
    const textColor = computed(() => {
      return rootMenu.props.textColor || "";
    });
    const mode = computed(() => {
      return rootMenu.props.mode;
    });
    const isNested = computed(() => {
      return parentMenu.value.type.name !== "ElMenu";
    });

    const itemStyle = computed(() => {
      const style = {
        color: active.value ? activeTextColor.value : textColor.value,
        borderBottomColor: "",
      };
      if (mode.value === "horizontal" && !isNested.value) {
        style.borderBottomColor = active.value
          ? rootMenu.props.activeTextColor
            ? activeTextColor.value
            : ""
          : "transparent";
      }
      return style;
    });
    const onMouseEnter = () => {
      if (mode.value === "horizontal" && !rootMenu.props.backgroundColor)
        return;
      instance.vnode.el.style.backgroundColor = hoverBackground.value;
    };
    const onMouseLeave = () => {
      if (mode.value === "horizontal" && !rootMenu.props.backgroundColor)
        return;
      instance.vnode.el.style.backgroundColor = backgroundColor.value;
    };
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.rootMenuEmit("menuItem:item-click", {
          index: props.index,
          indexPath,
          route: props.route,
        });
        emit("click", {
          index: props.index,
          indexPath: indexPath.value,
        });
      }
    };

    onMounted(() => {
      addSubMenu({ index: props.index, indexPath, active });
      rootMenu.methods.addMenuItem({ index: props.index, indexPath, active });
    });

    onBeforeUnmount(() => {
      removeSubMenu({ index: props.index, indexPath, active });
      rootMenu.methods.removeMenuItem({
        index: props.index,
        indexPath,
        active,
      });
    });
    return {
      parentMenu,
      rootMenu,
      slots,

      paddingStyle,
      itemStyle,
      backgroundColor,
      active,
      handleClick,
      onMouseEnter,
      onMouseLeave,
    };
  },
};
</script>

<style lang='scss' scoped>
.my-menu-item {
  list-style-type: none;
  height: 56px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f3f3f3;
  }
}
</style>