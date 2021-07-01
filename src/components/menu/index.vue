<template>
  <!-- <yf-transition> -->
    <div class="category">
      <CateItem
        class=""
        v-for="(item, index) in categories"
        :key="index"
        :item="item"
        @clickItem="clickItem"
        :curIndex="curIndex"
      >
        {{ item.name }}
      </CateItem>
    </div>
  <!-- </yf-transition> -->
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import CateItem from "./CateItem";
import YfTransition from "components/comm-transition";
export default {
  name: "Category",
  data() {
    return {
      categories: [
        { name: "首页", index: "/home" },
        { name: "分类", index: "/category" },
        { name: "归档", index: "/archives" },
        { name: "关于", index: "/about" },
      ],
    };
  },
  components: {
    CateItem,
    YfTransition,
  },
  watch: {},
  setup(props, ctx) {
    onMounted(() => {
      // const app = getCurrentInstance();
      // const route = app.appContext.config.globalProperties.$route;
      // console.log(route.path);
    });
    const curIndex = computed(() => {
      const app = getCurrentInstance();
      const route = app.appContext.config.globalProperties.$route;
      // console.log(route);
      return route.path;
    });
    function clickItem(item) {
      curIndex.value = item.id;
    }
    return {
      clickItem,
      curIndex,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.category {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>