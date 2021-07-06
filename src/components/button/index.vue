<template>
  <div
    class="my-button"
    :style="[`border: 1px solid ${color}`, `color:${color}`]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Mybutton",
  props: {
    fill: Boolean,
    color: {
      type: String,
      default: "#000",
    },
    border: Boolean,
  },
  setup(props, { emit }) {
    function clickBtn(e) {
      console.log("zzzzz");
    }
    return {
      clickBtn,
    };
  },
};
</script>

<style lang='scss' scoped>
.my-button {
  padding: 10px 50px;
  font-size: 14px;
}
</style>