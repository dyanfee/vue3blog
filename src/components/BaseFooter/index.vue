<template>
  <div class="footer">
    <div class="footer-header footer-item">
      <icon-text i="copyright">2021</icon-text>
      <icon-text i="admin">
        <span>dyanfee</span>
      </icon-text>
    </div>
    <div class="footer-item">生活不止眼前的苟且，还有诗和远方的田野。</div>
    <div class="footer-item">
      <span>渝ICP备20000492号-1</span>
    </div>
  </div>
</template>

<script>
import IconText from "components/Icon/IconText.vue";
export default {
  name: "Footer",
  components: {
    IconText,
  },
};
</script>

<style lang="scss" scoped>
span {
  @include text-hover;
}
.footer {
  // position: absolute;
  // bottom: 0px;
  // width: 100%;
  display: flex;
  flex-direction: column;
  // align-content: center;
  font-size: 14px;
  margin-top: 20px;
  // height: 90px;
  // border: 2px thistle solid;
  // background-color: #fff;

  .footer-item {
    display: flex;
    justify-content: center;
    padding-top: 10px;

    & > * {
      padding-left: 10px;
    }
  }
  & > :last-child {
    padding-bottom: 10px;
  }
}
</style>