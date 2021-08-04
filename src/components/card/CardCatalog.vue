<template>
  <base-card v-show="catalog.length">
    <template #default>
      <div class="title">目录</div>
    </template>
    <template v-slot:content>
      <ul class="catalog-list">
        <li
          v-for="(item, index) in catalog"
          :key="item.nodeId"
          @click="clickCatalog(item)"
        >
          <span :class="{ active: item.nodeId == activeId }">{{
            `${index + 1}. ` + item.title
          }}</span>
          <ul class="catalog-sub">
            <li
              v-for="(child, ind) in item.children"
              :key="child.nodeId"
              @click.stop="clickCatalogSub(child)"
            >
              <span :class="{ active: child.nodeId == activeId }">{{
                `${index + 1}.${ind + 1}. ` + child.title
              }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </base-card>
</template>

<script>
import { on, off } from "common/event";
import BaseCard from "./BaseCard";
import { onUnmounted, ref } from "@vue/runtime-core";
export default {
  name: "CardCatalog",
  components: {
    BaseCard,
  },
  setup() {
    const catalog = ref([]);
    const activeId = ref(null);
    on("genCatalog", initCatalog);
    window.addEventListener("scroll", scrollHander);
    function initCatalog(data) {
      // 接收到的是数组，需要提取
      catalog.value = data[0];
      if (data[0].length) activeId.value = catalog.value[0].nodeId;
    }

    function clickCatalog(item) {
      // console.log(item);
      jump(item);
    }
    function clickCatalogSub(item) {
      // console.log(item);
      jump(item);
    }
    function jump(item) {
      activeId.value = item.nodeId;
      // 60 是header 栏的偏移值
      document.documentElement.scrollTop = item.offsetTop - 60;
      // document.documentElement.scrollTo(0, item.offsetTop - 60);
    }
    function scrollHander() {
      if (!catalog.value.length) return;
      const curTop = document.documentElement.scrollTop;
      if (curTop <= catalog.value[0].offsetTop)
        return (activeId.value = catalog.value[0].nodeId);
      const list = catalog.value;
      const len = list.length;
      // 查找一级目录
      for (let i = len - 1; i >= 0; i--) {
        const curItem = list[i];
        if (curItem.offsetTop < curTop) {
          const childList = curItem.children;
          const childLen = childList.length;
          // 查找二级目录
          for (let j = childLen - 1; j >= 0; j--) {
            const childItem = childList[j];
            if (childItem.offsetTop < curTop) {
              return (activeId.value = childItem.nodeId);
            }
          }
          return (activeId.value = curItem.nodeId);
        }
      }
    }
    onUnmounted(() => {
      off("genCatalog", initCatalog);
      window.removeEventListener("scroll", scrollHander);
    });

    return {
      catalog,
      clickCatalog,
      clickCatalogSub,
      activeId,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
span {
  color: $color-high-text;
  border-bottom: 1px rgba($color-high-text, 0.5) solid;
}
.active {
  $c: rgba(#aa4e27, 0.9);
  color: $c;
  border-bottom: 1px $c solid;
}
.catalog-list {
  cursor: pointer;
  font-size: 14px;

  li {
    list-style: none;
    line-height: 20px;
  }

  .catalog-sub {
    padding-left: 0.5em;
  }
}
</style>
