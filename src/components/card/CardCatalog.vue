<template>
  <base-card>
    <template #default>
      <div class="title">目录</div>
    </template>
    <template v-slot:content>
      
    </template>
  </base-card>
</template>

<script>
import BaseCard from "./BaseCard";
export default {
  name: "CardCatalog",
  components: {
    BaseCard,
  },
  setup(){
    
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
