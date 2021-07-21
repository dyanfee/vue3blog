<template>
  <div ref="toastuiEditor"></div>
</template>
<script>
import Editor from "@toast-ui/editor";
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted, watch } from "@vue/runtime-core";
import "@toast-ui/editor/dist/toastui-editor.css";
import useOptions from "./option";
export default {
  name: "MdEditor",
  props: {
    previewStyle: {
      type: String,
    },
    height: {
      type: String,
    },
    initialEditType: {
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
    const toastuiEditor = ref("");
    const { options } = useOptions(props, emit);

    // console.log(options);
    let editor = null;

    watch(
      () => props.height,
      (val) => {
        console.log(val);
        editor.setHeight(val);
      }
    );
    onMounted(() => {
      editor = createEditor();
      emit("editor", editor);
    });
    function createEditor() {
      return new Editor({
        el: toastuiEditor.value,
        ...options,
      });
    }
    function invoke(methodName, ...args) {
      let result = null;

      if (editor[methodName]) {
        result = editor[methodName](...args);
      }

      return result;
    }

    function destroyed() {
      Object.keys(options.events).forEach((event) => {
        editor.off(event);
      });
      editor.destroy();
    }
    onUnmounted(() => {
      destroyed();
    });
    return {
      toastuiEditor,
      invoke,
    };
  },
};
</script>
