<template>
  <base-tag name="标签">
    <div class="tags-content">
      <card-tag
        @click="clickTag(tag)"
        v-for="tag in tags"
        :key="tag.id"
        :item="tag"
      ></card-tag>
    </div>
  </base-tag>
</template>

<script>
import BaseTag from "components/base-catetag";
import CardTag from "components/card/CardTag";
import { getTagsList } from "network/tags";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "Tags",
  components: {
    CardTag,
    BaseTag,
  },
  setup(props) {
    const tags = ref([]);
    const router = useRouter();


    
    getTagsList().then((res) => {
      const data = res.body;
      let max = 0;
      // 查找最多的标签
      data.reduce((pre, cur) => {
        if (cur.count > max) max = cur.count;
      }, 0);
      // 每项都加上最多数量
      data.forEach((element) => {
        element.max = max;
      });
      tags.value = data;
    });


    function clickTag(item) {
      const query = {
        id: item.id,
        type: "1",
        name: item.name,
      };
      router.push({
        path: "cateTagDetail",
        query,
      });
    }
    return {
      tags,
      clickTag,
    };
  },
};
</script>

<style lang="scss" scoped>
.tags-content {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  align-content: flex-start;
  flex-wrap: wrap;
}
</style>
