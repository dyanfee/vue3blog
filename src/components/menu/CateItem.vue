<template>
  <router-link
    :class="{ active: isActive }"
    :to="item.index"
    class="cate-item"
    @click="click"
  >
    <slot></slot>
  </router-link>
</template>

<script>
import { computed } from "vue";
export default {
  name: "CateItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    curIndex: {
      type: String,
      default: 1,
    },
  },
  emits: ["clickItem"],
  setup(props, ctx) {
    const isActive = computed(() => props.curIndex === props.item.index);
    function click() {
      ctx.emit("clickItem", props.item);
    }
    return {
      click,
      isActive,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.cate-item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  color: $color-text-tint;
  max-width: 90px;
  height: 100%;
  box-sizing: border-box;
  -webkit-transition: border-color 0.5s, background-color 0.3s, color 0.3s;
  transition: border-color 0.5s, background-color 0.3s, color 0.3s;
  border-bottom: 2px solid transparent;
  &:hover {
    color: $color-text-hover;
  }
  &.active {
    color: $color-text-hover;
    border-bottom: 2px $color-high-text solid;
  }
}
</style>