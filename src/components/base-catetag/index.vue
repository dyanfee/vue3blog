<template>
  <div class="base-catetag">
    <div class="cls-header">
      <h1>{{ name }}</h1>
    </div>
    <!--  内容插槽  -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.base-catetag {
  background-color: #fff;
  min-height: 80vh;
  @extend %base-shadow;
  .cls-header {
    width: 100%;
    text-align: center;
    padding: 20px 20px 0;
    & > h1 {
      padding-bottom: 10px;
      border-bottom: 3px #eee solid;
    }
  }
}
</style>
