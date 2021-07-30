<template>
  <div class="card-tag">
    <div class="card-tag-content" :style="{ 'font-size': size, color: color }">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { rand } from "@/utils";
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
    const { id, count, max } = props.item;

    const size = computed(() => {
      return Math.floor((count / max) * 20 + 20) + "px";
    });
    const color = computed(() => {
      const n = "0x" + id.substr(0, 6);
      return "#" + Math.floor((rand(n) / n) * "0xffffff").toString(16);
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
  margin-bottom: 10px;
}
</style>
