<template>
  <base-card>
    <template v-slot:left>
      {{ title }}
    </template>
    <template v-slot:content>
      <div class="card-text" v-if="text">{{ text }}</div>
      <ul class="card-items" v-if="items">
        <li v-for="item in items" :key="item">
          {{ item }}content content contentntent content contentntent content
          contentntent content contentntent content content
        </li>
      </ul>
    </template>
  </base-card>
</template>

<script>
import BaseCard from "./BaseCard";
export default {
  name: "CardComm",
  props: {
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    text: {
      type: String,
      default: "",
    },
  },
  components: {
    BaseCard,
  },
};
</script>

<style lang='scss' scoped>
.card-text {
  letter-spacing: 0.5px;
}
.card-items {
  line-height: 1.3;
  font-size: 14px;
}
ul > li {
  @include text-hover($color-high-text-h);
  list-style: none;
  padding-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>