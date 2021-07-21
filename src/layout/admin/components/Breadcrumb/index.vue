<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { pathToRegexp, compile } from "path-to-regexp";
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";

export default {
  setup() {
    const levelList = ref([]);
    const route = useRoute();
    const router = useRouter();
    getBreadcrumb();
    watch(route, () => {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      getBreadcrumb();
    });
    function getBreadcrumb() {
      let matched = route.matched.filter((item) => item.meta && item.meta.title);
      matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    }

    function pathCompile(path) {
      const { params } = route;
      var toPath = compile(path);
      return toPath(params);
    }
    function handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      console.log(pathCompile(path));
      router.push(pathCompile(path));
    }
    return {
      levelList,
      handleLink,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
