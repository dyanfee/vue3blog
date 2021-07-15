<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-link" to="/admin">
      <img src="~/assets/img/logo_60.png" />
      <h1 class="sidebar-title">管理后台</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SideBarLogo",
  data() {
    return {
      logo: "@/assets/img/logo_60.png",
    };
  },
};
</script>

<style lang='scss' scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #e0e6f5;
  text-align: center;
  overflow: hidden;
  .sidebar-link {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 10px;
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    .sidebar-title {
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }
}
</style>