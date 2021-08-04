<template>
  <div ref="toastuiEditorViewer"></div>
</template>
<script>
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import { ref } from "@vue/reactivity";
import { inject, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import "@toast-ui/editor/dist/toastui-editor.css";
import useOptions from "./option";
import event from "common/event";
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
        initCatalog();
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
      initCatalog();
    });

    function initCatalog() {
      // 提取目录
      setTimeout(() => {
        const c = viewer.preview.previewContent;
        // 生成树结构
        const ret = genTree(c);
        // 将目录通知给对应模块
        event.emit("genCatalog", ret);
      }, 100);
    }

    function getTitle(c, deep = 2) {
      let tmp = [];
      const patt = new RegExp(`H[1-${deep}]`);
      for (let i = 0; i < c.children.length; i++) {
        const node = c.children[i];
        if (~node.nodeName.search(patt)) {
          // console.log(node.nodeName.substr(1, 2));
          tmp.push({
            title: node.innerText,
            offsetTop: node.offsetTop,
            nodeId: node.dataset.nodeid,
            level: node.nodeName.substr(1, 2),
            children: [],
          });
        }
      }
      return tmp;
    }
    function genTree(content) {
      // 获取目录结构
      let tmp = getTitle(content);
      let ret = [];
      tmp.reduce((pre, cur, arr) => {
        if (cur.level == "1") {
          ret.push(cur);
          return cur;
        }
        if (cur.level == "2") {
          if (!pre) return;
          pre.children.push(cur);
          return pre;
        }
      }, 0);
      return ret;
    }

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
      event.emit("genCatalog", []);
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
