<script>
import { h } from "@vue/runtime-core";
import Icon from "@/components/Icon"; // svg组件
export default {
  name: "Item",
  functional: true,
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
  render() {
    const { icon, title } = this;
    const vnodes = [];
    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        // vnodes.push(<icon name={icon} />);
        vnodes.push(<Icon name={icon} />);
        // vnodes.push(h(`icon`, { name: icon }));
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
