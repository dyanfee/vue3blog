<template>
  <transition mode="">

  </transition>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@mixin triangleMixin ($direction) {
  background-color: inherit;
  border: inherit;
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  
  @if( $direction == left ) {
    transform: rotate(45deg);
  } @else if( $direction == right ) {
    transform: rotate(-135deg);
  } @else if( $direction == down ) {
    transform: rotate(-45deg);
  } @else {
    transform: rotate(135deg);
  }
}
</style>