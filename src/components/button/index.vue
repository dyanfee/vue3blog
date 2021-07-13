<template>
  <!-- 通用按钮样式封装 -->
  <div class="button-container">
    <button :class="btnCls">
      <slot />
    </button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "Mybutton",
  props: {
    plain: Boolean,
    disabled: Boolean,
    round: Boolean,
    circle: Boolean,
    padding: Boolean,
    type: {
      type: String,
      default: "default",
      validator: (val) => {
        return [
          "default",
          "primary",
          "success",
          "warning",
          "info",
          "danger",
          "text",
        ].includes(val);
      },
    },
    size: {
      type: String,
      default: "large",
      validator: (val) => {
        return ["large", "medium", "small", "mini","suit"].includes(val);
      },
    },
  },
  setup(props, { emit }) {
    const btnCls = computed(() => [
      "my-button",
      props.size ? `my-button--${props.size}` : "",
      props.type ? `my-button--${props.type}` : "",
      {
        "is-plain": props.plain,
        "is-disabled": props.disabled,
        "is-round": props.round,
        "is-circle": props.circle,
        "is-padding": props.padding,
      },
    ]);

    function clickBtn(e) {
      console.log("zzzzz");
    }

    return {
      btnCls,
      clickBtn,
    };
  },
};
</script>

<style lang='scss' scoped>
.button-container {
  padding: 4px;
  // display: flex;
  // justify-content: center;
}
.my-button {
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  border: none;
}
.my-button--default {
  background-color: transparent;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
  // background-color: '';
  color: #666;
  &:hover {
    background-color: #eee;
  }
}
.my-button--primary {
  background-color: $color-primary;
  &:hover {
    background-color: #0db2cf;
  }
}
.my-button--success {
  background-color: $color-success;
  &:hover {
    background-color: #84e087;
  }
}
.my-button--warning {
  background-color: $color-warning;
  &:hover {
    background-color: #ebaf56;
  }
}
.my-button--info {
  background-color: $color-info;
  &:hover {
    background-color: #cacaca;
  }
}
.my-button--danger {
  background-color: $color-danger;
  &:hover {
    background-color: #f39090;
  }
}
.my-button--text {
  background-color: transparent;
  color: $color-primary;
  &:hover {
    color: #18bbd8;
  }
}
.my-button--suit {
  padding: 10px 25px;
}
.my-button--large {
  padding: 10px 50px;
}
.my-button--medium {
  padding: 8px 40px;
}
.my-button--small {
  padding: 6px 30px;
}
.my-button--mini {
  padding: 4px 20px;
}
.is-round {
  border-radius: 18px;
}
.my-button--default.is-plain {
  background-color: #def3f6;
  color: $color-default;
  border: 1px solid $color-default;
  &:hover {
    background-color: #d8faff;
  }
}
.my-button--primary.is-plain {
  background-color: #d8f8fd;
  color: $color-primary;
  border: 1px solid $color-primary;
  &:hover {
    background-color: #b7e8f0;
  }
}
.my-button--success.is-plain {
  background-color: #dcffdd;
  color: $color-success;
  border: 1px solid $color-success;
  &:hover {
    background-color: #c6ffc8;
  }
}
.my-button--warning.is-plain {
  background-color: #fff1db;
  color: $color-warning;
  border: 1px solid $color-warning;
  &:hover {
    background-color: #ffe7c2;
  }
}
.my-button--info.is-plain {
  background-color: #fafafa;
  color: $color-info;
  border: 1px solid $color-info;
  &:hover {
    background-color: #eeeeee;
  }
}
.my-button--danger.is-plain {
  background-color: #fff3f3;
  color: $color-danger;
  border: 1px solid $color-danger;
  &:hover {
    background-color: #ffd1d1;
  }
}
.my-button.is-circle {
  padding: 12px;
  border-radius: 50%;
  display: flex;
}
</style>