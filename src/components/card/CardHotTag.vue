<template>
  <base-card>
    <template v-slot:left>
      <div>最热标签</div>
    </template>
    <template v-slot:right>
      <router-link to="/tags">
        <span>所有标签</span>
      </router-link>
    </template>
    <template v-slot:content>
      <div class="tag-item" v-for="(item, index) in hotTags" :key="index">
        <tag size="medium" roundable>{{ item.tagName }}</tag>
      </div>
    </template>
  </base-card>
</template>

<script>
import Tag from "components/Tag";
import BaseCard from "./BaseCard";
import { ref } from "@vue/reactivity";
import { getHotTags } from "network/tags";
export default {
  name: "CardHotTag",
  components: {
    Tag,
    BaseCard,
  },
  setup(props) {
    const hotTags = ref([]);

    getHotTags()
      .then((res) => {
        hotTags.value = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      hotTags,
    };
  },
};
</script>

<style lang="scss" scoped>
span {
  @include text-hover;
}

.tag-item {
  margin: 2px 5px;
}
</style>
