<template>
  <div class="side-bar">
    <card-info />
    <card-catalog />
  </div>
</template>

<script>
import CardInfo from "components/card/CardInfo";
import CardCatalog from "components/card/CardCatalog";
export default {
  name: "SideBarLeft",
  components: {
    CardInfo,
    CardCatalog,
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  width: 300px;
  flex-shrink: 0;
  margin-right: 20px;
}
</style>
