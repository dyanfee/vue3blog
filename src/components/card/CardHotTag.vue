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
      <div class="tag-item" v-for="item in 10" :key="item">
        <tag size="medium" roundable>{{ item }}标签</tag>
      </div>
    </template>
  </base-card>
</template>

<script>
import Tag from "components/Tag";
import BaseCard from "./BaseCard";
export default {
  name: "CardHotTag",
  components: {
    Tag,
    BaseCard,
  },
};
</script>

<style lang='scss' scoped>
span {
  @include text-hover;
}

.tag-item {
  margin: 2px 5px;
}
</style>