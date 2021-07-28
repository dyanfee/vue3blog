<template>
  <base-cate name="分类">
    <div ref="cateContent" class="category-content">
      <card @click="clickItem(item)" v-for="item in items" :key="item.id" :item="item" />
      <div
        v-for="(virtualItem, index) in virtualItems"
        :key="index"
        style="width: 180px"
      ></div>
    </div>
  </base-cate>
</template>

<script>
import Card from "components/card/CardCategory";
import BaseCate from "components/base-catetag";
import { getCategoryList } from "network/article";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "Category",
  components: {
    Card,
    BaseCate,
  },
  setup() {
    const items = ref([]);
    const cateContent = ref({});
    const virtualItems = ref(0);
    const router = useRouter();
    getCategoryList().then((res) => {
      items.value = res.body;
      resetLayout();
    });

    /* 计算需要补充的元素个数 */
    function resetLayout() {
      let clientWidth = cateContent.value.clientWidth;
      // 子元素宽度
      const itemWidth = 180;
      const itemNum = items.value.length;
      // 每行几个元素
      const line = parseInt(clientWidth / itemWidth);
      // 需要补几个空元素
      virtualItems.value = line - (itemNum % line);
    }

    function clickItem(item) {
      console.log(item);
      const query = {
        id: item.id,
        type: "0",
        name: item.name,
      };
      router.push({
        path: "cateTagDetail",
        query,
      });
    }
    return {
      items,
      cateContent,
      virtualItems,
      clickItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.category-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 20px 10px;
}
</style>
