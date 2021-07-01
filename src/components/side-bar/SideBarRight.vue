<template>
  <div class="side-bar">
    <card-comm title="公告栏" :text="notice" />
    <card-hot-tag />
    <card-comm title="最近推荐" :items="items" />
    <card-comm title="浏览最多" :items="items" />
    <card-comment title="最近评论" :items="items" />
  </div>
</template>

<script>
import CardHotTag from "components/card/CardHotTag";
import CardComm from "components/card/CardComm";
import CardComment from "components/card/CardComment";
export default {
  name: "SideBarRight",
  components: {
    CardHotTag,
    CardComm,
    CardComment,
  },
  setup() {
    const notice =
      "开发中 有问题请联系哦有问题请联系哦有问题请联系哦有问题请联系哦";
    const items = [1, 2, 3, 4, 5, 6];
    return {
      notice,
      items,
    };
  },
};
</script>

<style lang='scss' scoped>
.side-bar {
  width: 300px;
  flex-shrink: 0;
  margin-left: 20px;
}
</style>