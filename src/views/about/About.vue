<template>
  <div class="about">
    <h3>关于作者</h3>
    <div class="about-content">{{ aboutContent }}</div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "About",
  setup(props) {
    const aboutContent = ref(
      `毕业于福州大学，曾于4399从事H5开发,
      擅长TypeScript、javaScript、Python等编程语言，
      熟悉Egret、Fairygui、 Vue、Express等框架的使用，
      熟悉sqlserver、oracle、mongodb等数据库的使用，
      如有相关工作欢迎联系!`
    );
    aboutContent.value = aboutContent.value.replace(/[\n ]/g, "");

    return { aboutContent };
  },
};
</script>

<style lang="scss" scoped>
.about {
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  padding: 30px 10px;
  @extend %base-shadow;

  .about-content {
    padding: 130px 40px;
    letter-spacing: 0.5px;
  }
}
</style>
