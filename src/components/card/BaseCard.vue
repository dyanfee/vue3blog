<template>
  <div class="base-card">
    <div class="card-header">
      <div class="title">
        <slot name="left" />
      </div>
      <slot />
      <div>
        <slot name="right" />
      </div>
    </div>
    <div class="card-contents">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
};
</script>

<style lang='scss' scoped>
.card-header {
  @include border-bottom;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;

  .title {
    font-size: 16px;
    font-weight: bold;
  }
}
.card-contents {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 15px;
  white-space: pre-wrap;
  line-height: 1.5;
  width: 100%;
}
</style>