<template>
  <div :class="tag">
    <slot />
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "Tag",
  props: {
    closeable: Boolean,
    effect: {
      type: String,
      default: "light",
      validator: (val) => {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      },
    },
  },
  setup(props) {
    const tag = computed(() => {
      return ["tag"];
    });

    return {
      tag,
    };
  },
};
</script>

<style lang='scss' scoped>
.tag {
  background-color: #ecf5ff;
  border-color: #d9ecff;
  display: inline-block;
  height: 22px;
  padding: 0 10px;
  line-height: 18px;
  font-size: 12px;
  color: $color-high-text;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
.zoom-in-center-enter-active,
.zoom-in-center-leave-active {
  -webkit-transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.zoom-in-center-enter,
.zoom-in-center-leave-active {
  opacity: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}
</style>