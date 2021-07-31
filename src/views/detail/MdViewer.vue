<template>
  <div ref="toastuiEditorViewer"></div>
</template>
<script>
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import { ref } from "@vue/reactivity";
import { inject, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import "@toast-ui/editor/dist/toastui-editor.css";
import useOptions from "./option";
export default {
  name: "MdEditor",
  props: {
    height: {
      type: String,
    },
    initialValue: {
      type: String,
    },
    options: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const toastuiEditorViewer = ref("");
    const { options } = useOptions(props, emit);
    let viewer = null;
    const { resizeHandler } = inject("resize");
    watch(
      () => props.initialValue,
      (val) => {
        viewer.setMarkdown(val);
      }
    );
    watch(
      () => props.height,
      (val) => {
        console.log(val);
        viewer.setHeight(val);
      }
    );
    onMounted(() => {
      viewer = createEditor();
      resizeHandler(({ width }) => {
        // viewer.setMarkdown(props.initialValue);
      });
    });
    function createEditor() {
      return new Viewer({
        el: toastuiEditorViewer.value,
        ...options,
      });
    }
    function invoke(methodName, ...args) {
      let result = null;

      if (viewer[methodName]) {
        result = viewer[methodName](...args);
      }

      return result;
    }

    function destroyed() {
      Object.keys(options.events).forEach((event) => {
        viewer.off(event);
      });
      viewer.destroy();
    }
    onUnmounted(() => {
      destroyed();
    });
    return {
      toastuiEditorViewer,
      invoke,
    };
  },
};
</script>

<style lang="scss">
.toastui-editor-contents {
  font-size: 14px;
  font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
  white-space: pre-wrap;
}
.toastui-editor-contents code {
  font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
}
</style>
