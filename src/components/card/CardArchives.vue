<template>
  <article class="post">
    <header class="post-header">
      <div class="post-meta">
        <time datetime="2019-12-17T10:36:37+08:00">{{
          $filters.formatDate(item.createTime, "yyyy-MM-dd")
        }}</time>
      </div>
      <h2 class="post-title">{{ item.title }}</h2>
    </header>
  </article>
</template>

<script>
export default {
  name: "CardArchives",
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
.post {
  width: 100%;
  border-bottom: 1px dashed #ccc;
  display: flex;

  .post-header {
    display: flex;
    align-items: center;
    padding: 10px 0;
    width: 100%;
    
    .post-title {
      width: 100%;
      font-size: 16px;
      font-weight: normal;
      line-height: 2;
      padding: 20px;
    }
    .post-meta {
      padding-left: 10px;
      font-size: 12px;
      flex-shrink: 0;
    }

    &:hover {
      color: #262a30;

      &::before {
        background: #262a30;
      }
    }
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      flex-shrink: 0;
      margin-left: -1px;
      background: #bbb;
      border-radius: 50%;
      z-index: 1;
    }
  }

  &:hover {
    // background: #262a30;
    border-bottom-color: #262a30;
  }
}
</style>
