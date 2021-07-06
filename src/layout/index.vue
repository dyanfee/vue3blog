<template>
  <div class="app-container">
    <div class="layout">
      <Header></Header>
      <div ref="mainContent" class="content">
        <side-bar-left v-if="showLeft" />
        <div class="main">
          <router-view />
        </div>
        <side-bar-right v-if="showRight" />
      </div>
      <base-footer />
    </div>
  </div>
</template>


<script>
import { ref, provide, onMounted } from "vue";
import { mapGetters } from "vuex";
import Header from "components/header";
import { resizeMixin, resizeHandler } from "./resizeHandler";
import YfTransition from "components/comm-transition";
import BaseFooter from "components/BaseFooter";
import SideBarLeft from "components/side-bar/SideBarLeft";
import SideBarRight from "components/side-bar/SideBarRight";
export default {
  name: "Layout",
  mixins: [resizeMixin],
  components: {
    Header,
    YfTransition,
    BaseFooter,
    SideBarLeft,
    SideBarRight,
  },
  computed: {
    ...mapGetters(["plateform"]),
  },
  setup(props, ctx) {
    const mainContent = ref("mainContent");
    const showLeft = ref(true);
    const showRight = ref(true);

    // 钩子函数
    onMounted(() => {
      resizeHandler(({ width }) => {
        let mainStyle = mainContent.value.style;
        mainStyle.maxWidth = "";
        mainStyle.padding = "100px 0 0";
        if (width > 1280) {
          mainStyle.width = "1280px";
          showLeft.value = showRight.value = true;
        } else if (width > 992) {
          mainStyle.maxWidth = "992px";
          showLeft.value = false;
          showRight.value = true;
        } else {
          mainStyle.width = width + "px";
          mainStyle.maxWidth = "640px";
          mainStyle.padding = "70px 5px 0";
          showLeft.value = showRight.value = false;
        }
      });
    });

    provide("resize", {
      resizeHandler,
    });
    return {
      mainContent,
      showLeft,
      showRight,
    };
  },
  beforeRouteUpdate(to, from, next) {

    next();
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
  .content {
    display: flex;
    margin: 0 auto;
    padding-top: 100px;
    min-height: 80vh;
    flex: 1;
    width: 100%;
    .main {
      width: 100%;
    }
    .right-content {
      width: 300px;
      border: 1px tan solid;
      flex-shrink: 0;
      margin-left: 20px;
    }
  }
}
</style>