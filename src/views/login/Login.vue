<template>
  <div class="login">
    <div class="login-header">
      <img src="~assets/img/logo_60.png" alt="" srcset="" />
    </div>
    <div class="login-mark">Sign in to Blog</div>
    <div class="login-window">
      <div class="login-input">
        <label for="login_field">用户名或邮箱</label>
        <input
          class="login-input_area"
          type="text"
          name="login"
          v-model="username"
          placeholder="请输入用户名或邮箱"
        />
      </div>
      <div class="login-input">
        <div class="login-pwd-label">
          <label for="password">密码</label>
          <span>Forgot password?</span>
        </div>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="请输入密码"
        />
      </div>
      <button @click="clickLogin">Sign in</button>
    </div>
    <div class="login-to-signup">
      没有账号？
      <span> 去注册 </span>
    </div>
  </div>
  <base-footer />
</template>

<script>
import { ref } from "@vue/reactivity";
import BaseFooter from "components/BaseFooter";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  components: {
    BaseFooter,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    function clickLogin() {
      if (!username.value) {
        console.log("用户名不能为空");
        return;
      }
      if (!password.value) {
        console.log("密码不能为空");
        return;
      }
      store
        .dispatch("login", {
          username: username.value,
          password: password.value,
        })
        .then(
          (reslove) => {
            router.replace("/home");
          },
          (err) => {
            console.error(err);
          }
        );
    }
    return {
      username,
      password,
      clickLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
span {
  @include text-hover;
}
.login {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  .login-header {
    padding-top: 32px;
    padding-bottom: 24px;

    img {
      height: 50px;
      width: 50px;
    }
  }

  .login-mark {
    font-size: 24px;
    padding-bottom: 20px;
    font-weight: 300;
    letter-spacing: -0.5px;
  }

  .login-window {
    display: flex;
    flex-direction: column;
    height: 230px;
    width: 310px;
    background-color: #f6f8fa;
    border: 1px solid rgba($color: #999, $alpha: 0.1);
    border-radius: 5px;
    padding: 22px;
    font-size: 14px;

    .login-input {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      padding-bottom: 20px;

      input {
        height: 30px;
        font-size: 14px;
        outline-style: none;
        vertical-align: middle;
        border: 1px solid rgba($color: #999, $alpha: 0.1);
        border-radius: 6px;
        margin-top: 12px;
        display: inline-block;
        font-family: "Microsoft soft";
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        padding-left: 10px;
        &:focus {
          box-shadow: 0 0 5px $color-high-text;
          border: 1px solid $color-high-text;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
          -webkit-text-fill-color: #666; // 修改输入字体颜色
          font-size: 14px;
        }
      }

      .login-pwd-label {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 12px;
        }
      }
    }
    button {
      padding: 8px 0;
      background-color: $color-high-text;
      border: none;
      border-radius: 6px;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: $color-high-text-hover;
      }
    }
  }

  .login-to-signup {
    @include border;
    height: 52px;
    width: 310px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>