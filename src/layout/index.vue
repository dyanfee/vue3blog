<template>
  <div class="app-container">
    <div class="layout">
      <Header></Header>

      <div ref="mainContent" class="content">
        <div v-if="showLeft" class="left-content">left-content</div>
        <div class="main">
          <router-view />
        </div>
        <div v-if="showRight" class="right-content">right-content</div>
      </div>
      <div class="footer">
        <h1>footer</h1>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, provide, onMounted } from "vue";
import { mapGetters } from "vuex";
import Header from "components/header";
import { resizeMixin, resizeHandler } from "./resizeHandler";
import YfTransition from "components/comm-transition";

export default {
  name: "Layout",
  mixins: [resizeMixin],
  components: {
    Header,
    YfTransition,
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
        let vnode = mainContent.value;
        vnode.style && (vnode.style.maxWidth = "");
        vnode.style && (vnode.style.padding = "100px 0 0");
        if (width > 1280) {
          vnode.style && (vnode.style.width = "1280px");
          showLeft.value = showRight.value = true;
        } else if (width > 992) {
          vnode.style && (vnode.style.width = "992px");
          showLeft.value = false;
          showRight.value = true;
        } else {
          vnode.style && (vnode.style.width = width + "px");
          vnode.style && (vnode.style.maxWidth = "640px");
          vnode.style && (vnode.style.padding = "70px 5px 0");
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
    // console.log("33333", to);
    // console.log("----", to.path);
    next();
  },
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
  .content {
    display: flex;
    margin: 0 auto;
    // margin-top: 100px;
    padding-top: 100px;
    min-height: 80vh;
    flex: 1;
    width: 100%;
    .left-content {
      width: 300px;
      border: 1px teal solid;
      flex-shrink: 0;
      margin-right: 20px;
    }
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
  .footer {
    display: flex;
    align-content: center;
    justify-content: center;
    height: 120px;
    border: 2px thistle solid;
  }
}
</style>