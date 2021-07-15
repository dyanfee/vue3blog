<template>
  <div>
    <icon v-if="icon" :name="icon" />
    <span v-if="title">{{ title }}</span>
  </div>
</template>


<script>
import { h } from "vue";
export default {
  name: "Item",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  // setup(props) {
  //   console.log(props.icon, props.title);
  //   const vnodes = [];
  //   if (props.icon) {
  //     vnodes.push(<icon name={props.icon} />);
  //   }
  //   if (props.title) {
  //     vnodes.push(<span slot="title">{props.title}</span>);
  //   }
  //   return () => {
  //     console.log(vnodes);
  //     h(vnodes);
  //   };
  // },
  // render() {
  //   // const vnodes = [];
  //   // if (this.icon) {
  //   //   vnodes.push(<icon name={this.icon} />);
  //   // }
  //   // if (this.title) {
  //   //   vnodes.push(<span slot="title">{this.title}</span>);
  //   // }
  //   // return h(vnodes);
  //   if (this.icon) {
  //     h("icon", { name: 'edit' });
  //   }
  //   // if (this.title) {
  //   //   h("span", { name: this.icon });
  //   // }
  // },
};
</script>

<style lang='scss' scoped>
</style>