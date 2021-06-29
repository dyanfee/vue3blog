<template>
  <div class="icon-text">
    <icon v-if="isLeft" :name="i" />
    <div class="slot">
      <slot></slot>
    </div>
    <icon v-if="!isLeft" :name="name" />
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "IconText",
  props: {
    i: {
      type: String,
      default: "",
      required: true,
    },
    text: {
      type: String || Number,
      default: "",
    },
    position: {
      type: String,
      default: "left",
    },
  },
  setup(props) {
    const isLeft = computed(() => props.position === "left");
    return {
      isLeft,
    };
  },
};
</script>

<style lang='scss' scoped>
.icon-text {
  display: flex;
  align-content: center;
  justify-content: center;
  .slot {
    padding: 0 5px;
  }
}
</style>