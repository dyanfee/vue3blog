<template>
  <div class="side-bar">
    <card-info />
  </div>
</template>

<script>
import CardInfo from "components/card/CardInfo";
export default {
  name: "SideBarLeft",
  components: {
    CardInfo,
  },
};
</script>

<style lang='scss' scoped>
.side-bar {
  width: 300px;
  flex-shrink: 0;
  margin-right: 20px;
}
</style>