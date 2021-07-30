<template>
  <div class="cate-card">
    <div class="cate-card-header">{{ item.name }}</div>
    <!-- <div class="cate-card-desc">前端的技术哈哈哈哈急急急急急急</div> -->
    <div class="cate-card-content">{{ item.count || 0 }}篇文章</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.cate-card {
  max-height: 120px;
  width: 180px;
  padding: 0 20px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  background-color: #fff;
  border: 1px #eee solid;
  border-radius: 5px;
  transition: all 0.3s;
  margin-top: 10px;
  &:hover {
    @extend %base-shadow;
  }
  .cate-card-header {
    font-size: 22px;
    padding-top: 20px;
  }
  .cate-card-desc {
    white-space: pre-wrap;
    padding: 15px;
    font-size: 14px;
    color: #999;
  }
  .cate-card-content {
    color: $color-high-text;
    font-size: 14px;
    padding: 30px 0 20px;
  }
}
</style>
