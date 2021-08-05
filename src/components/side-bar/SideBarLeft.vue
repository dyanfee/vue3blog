<template>
  <div class="side-bar">
    <card-info />
    <div ref="cardRef" :class="{ isfixed: isCardFixed }">
      <card-catalog />
    </div>
  </div>
</template>

<script>
import CardInfo from "components/card/CardInfo";
import CardCatalog from "components/card/CardCatalog";
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
export default {
  name: "SideBarLeft",
  components: {
    CardInfo,
    CardCatalog,
  },
  setup() {
    const isCardFixed = ref(false);

    const cardRef = ref("cardRef");
    let cardsOffsetTop = 0;
    onMounted(() => {
      cardsOffsetTop = cardRef.value.offsetTop;
      window.addEventListener("scroll", scrollHander);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", scrollHander);
    });

    function scrollHander() {
      let py = document.documentElement.scrollTop || document.body.scrollTop;
      if (!cardRef.value.style.width)
        cardRef.value.style.width = cardRef.value.offsetWidth + "px";
      isCardFixed.value = cardsOffsetTop < py + 80;

    }

    return {
      isCardFixed,
      cardRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  width: 260px;
  flex-shrink: 0;
  margin-right: 20px;
}
.isfixed {
  position: fixed;
  top: 80px;
}
</style>
