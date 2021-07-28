<template>
  <div class="header">
    <div class="header-logo">
      <img src="~assets/img/logo_60.png" alt="" srcset="" />
    </div>
    <div class="header-main">
      <Category />
    </div>
    <div class="header-other">
      <div v-if="!isLogin">
        <router-link to="/login">
          <span> 登录 </span>
        </router-link>
        <router-link to="/register">
          <span>注册</span>
        </router-link>
      </div>
      <div v-else>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ nickName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="toAdmin">
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item command="logOut">
                <router-link to="/"> 退出登录 </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "components/menu";
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Header",
  components: {
    Category,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLogin = computed(() => store.getters.isLogin);
    const nickName = computed(() => store.getters.nickName);

    const handleCommand = (e) => {
      if (e == "logOut") {
        store.dispatch("logOut");
      }
    };
    function toAdmin() {
      router.push({
        path: "/admin",
      });
    }
    return {
      nickName,
      isLogin,
      handleCommand,
      toAdmin,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  background-color: #fff;
  height: 60px;
  font-size: 14px;
  box-shadow: 0 2px 12px rgba($color: #000, $alpha: 0.1);
  display: flex;
  z-index: 99;
  .header-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    margin-left: 20px;
    img {
      height: 50px;
      width: 50px;
    }
  }
  .header-main {
    display: flex;
    width: 100%;
  }
  .header-other {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: $color-high-text;
      padding: 0 0.5em;
      &:hover {
        color: $color-high-text-hover;
      }
    }
    &:last-child {
      margin-right: 30px;
    }
  }
}
</style>
