<template>
  <div class="side-bar">
    <card-comm v-if="notice" title="公告栏" :text="notice" />
    <card-hot-tag />
    <card-comm title="点赞最多" :items="likesItems" />
    <card-comm title="浏览最多" :items="viewsItems" />
    <card-comment title="最近评论" :items="recentComments" />
  </div>
</template>

<script>
import CardHotTag from "components/card/CardHotTag";
import CardComm from "components/card/CardComm";
import CardComment from "components/card/CardComment";
import { getHomeInfo } from "network/article";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
export default {
  name: "SideBarRight",
  components: {
    CardHotTag,
    CardComm,
    CardComment,
  },
  setup() {
    // const notice = ref("");
    const store = useStore();
    const likesItems = ref([]);
    const viewsItems = ref([]);
    const recentComments = ref([]);

    const notice = computed(() => {
      return (store.getters.info.notice && store.getters.info.notice.content) || "";
    });

    getHomeInfo().then((res) => {
      const data = res.body;
      likesItems.value = data.likes || [];
      viewsItems.value = data.views || [];
      recentComments.value = data.recentComments || [];
    });

    return {
      notice,
      viewsItems,
      likesItems,
      recentComments,
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  width: 300px;
  flex-shrink: 0;
  margin-left: 20px;
}
</style>
