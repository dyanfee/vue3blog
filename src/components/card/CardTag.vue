<template>
  <div class="card-tag">
    <div class="card-tag-content" :style="{ 'font-size': size, color: color }">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    item: {
      type: Object,
      detfault() {
        return {};
      },
    },
  },
  setup(props) {
    const size = computed(() => {
      return Math.floor(Math.random() * 30 + 20) + "px";
    });
    const color = computed(() => {
      // console.log(Math.floor(Math.random() * "0xffffff").toString(16));
      return "#" + Math.floor(Math.random() * "0xffffff").toString(16);
    });
    return { size, color };
  },
};
</script>

<style lang="scss" scoped>
.card-tag {
  flex-grow: 0;
  height: 50px;
  line-height: 1;
  display: flex;
  align-items: flex-end;
  padding: 0 5px;
  padding-bottom: 5px;

}
</style>
