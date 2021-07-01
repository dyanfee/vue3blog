<template>
  <!-- 对过渡动画封装 -->
  <transition mode="out-in" v-on="on">
    <slot />
  </transition>
</template>

<script>
import { hasClass, addClass, removeClass } from "@/utils";
export default {
  name: "YfTransition",
  props: {
    name: {
      type: String,
      default: "default",
    },
  },
  setup() {
    return {
      on: {
        // @before-enter="beforeEnter"
        // @enter="enter"
        // @after-enter="afterEnter"
        // @enter-cancelled="enterCancelled"
        // @before-leave="beforeLeave"
        // @leave="leave"
        // @after-leave="afterLeave"
        // @leave-cancelled="leaveCancelled"
        beforeEnter(el) {
          console.log("beforeEnter");
          el.style.opacity = 0.2;
        },
        enter(el, done) {
          console.log("enter");
          addClass(el, "comm-opacity-transition");
          el.style.opacity = 1;
          done();
        },
        afterEnter(el) {
          console.log("afterEnter");
          removeClass(el, "comm-opacity-transition");
          el.style.opacity = "";
        },
        beforeLeave(el) {
          console.log("beforeLeave");
          if (!el.dataset) el.dataset = {};
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth;
          el.style.width = el.scrollWidth + "px";
          el.style.overflow = "hidden";
        },
        leave(el) {
          console.log("leave");
          addClass(el, "comm-horizontal-collapse-transition");
          el.style.width = el.dataset.scrollWidth + "px";
        },
        afterLeave(el) {
          console.log("afterLeave");
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
// v-enter-from：定义进入过渡的开始状态。
// 在元素被插入之前生效，在元素被插入之后的下一帧移除。

// v-enter-active：定义进入过渡生效时的状态。
// 在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。
// 这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

// v-enter-to：定义进入过渡的结束状态。
// 在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

// v-leave-from：定义离开过渡的开始状态。
// 在离开过渡被触发时立刻生效，下一帧被移除。

// v-leave-active：定义离开过渡生效时的状态。
// 在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

// v-leave-to：离开过渡的结束状态。
// 在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被删除)，在过渡/动画完成之后移除。
</style>