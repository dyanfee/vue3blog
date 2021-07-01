<template>
  <transition name="zoom-in-center">
    <div
      ref="tagContent"
      :style="{ backgroundColor: color, borderRadius: round + 'px' }"
      :class="tag"
      @click="handleClick"
    >
      <slot />
      <icon v-if="closeable" class="tag-icon" name="x" @click="handleClose" />
    </div>
  </transition>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";

export default {
  name: "Tag",
  props: {
    closeable: Boolean,
    roundable: Boolean,
    color: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "small",
      validator: (val) => {
        return ["mini", "medium", "small", "large"].indexOf(val) !== -1;
      },
    },
    effect: {
      type: String,
      default: "light",
      validator: (val) => {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      },
    },
  },
  setup(props, { emit }) {
    const tagContent = ref("");
    const tag = computed(() => {
      return [
        props.size ? `tag-${props.size}` : "",
        "tag",
        props.roundable ? "tag-round" : "",
      ];
    });
    const round = computed(() => {
      if (props.roundable) {
        const height = tagContent.value.offsetHeight;
        return height || 0;
      }
      return 3;
    });
    function handleClose(e) {
      e.stopPropagation();
      emit("close", e);
    }
    const handleClick = (event) => {
      ctx.emit("click", event);
    };
    return {
      tag,
      handleClose,
      tagContent,
      round,
    };
  },
};
</script>

<style lang='scss' scoped>
.tag {
  position: relative;
  background-color: #ecf5ff;
  border-color: #d9ecff;
  display: inline-block;
  line-height: 1.5;
  color: $color-high-text;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;

  .tag-icon {
    position: relative;
    overflow: hidden;
    top: -1px;
    right: -5px;
  }
  &.tag-large {
    font-size: 14px;
    padding: 5px 16px;
  }
  &.tag-medium {
    font-size: 12px;
    padding: 4px 14px;
  }
  &.tag-small {
    font-size: 10px;
    padding: 2px 12px;
  }
  &.tag-mini {
    font-size: 10px;
    padding: 0 10px;
  }
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: $color-high-text;
    color: #fff;
  }
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