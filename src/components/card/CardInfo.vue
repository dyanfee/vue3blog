<template>
  <div class="base-card">
    <img class="avatar" src="~assets/img/logo_60.png" alt="" srcset="" />
    <div class="nick-name">Dyanfee</div>
    <div class="my-info">
      <icon-text i="map-pin">重庆市</icon-text>
      <icon-text i="activity">开发工程师</icon-text>
    </div>
    <div class="motto">千里之行,始于足下</div>
    <div class="blog-info">
      <div class="blog-info_item">
        <span>222</span>
        <div>文章</div>
      </div>
      <div class="blog-info_item">
        <span>2000</span>
        <div>评论</div>
      </div>
      <div class="blog-info_item">
        <span>3333</span>
        <div>点赞</div>
      </div>
    </div>
    <div class="contact-info">
      <icon-text @click="mailTo" :title="'mail -> ' + mail" i="mail"
        >E-Mail</icon-text
      >
      <icon-text i="github" @click="toGithub" :title="github">GitHub</icon-text>
    </div>
  </div>
</template>

<script>
import IconText from "components/Icon/IconText.vue";
export default {
  name: "CardInfo",
  components: {
    IconText,
  },
  setup(props) {
    const mail = "dyanfee@foxmail.com";
    const github = "github.com/dyanfee";
    function mailTo() {
      const elink = document.createElement("a");
      elink.href = `mailto:${mail}`;
      elink.style.display = "none";
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
    }
    function toGithub() {
      window.open(`https://${github}`, "_blank");
    }
    return {
      mail,
      github,
      mailTo,
      toGithub,
    };
  },
};
</script>

<style lang='scss' scoped>
span {
  @include text-hover;
}
.avatar {
  width: 60px;
  height: 60px;
  position: absolute;
  top: -30px;
  border-radius: 30px;
  // box-shadow: 0 0 3px $color-high-text;
  transition: all 1s ease-in-out;
  &:hover {
    transform: rotate(360deg) scale(1.2);
  }
}
.nick-name {
  font-size: 20px;
  font-weight: 700;
  padding-top: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba($color: $color-high-text, $alpha: 0.3);
  display: flex;
  justify-content: center;
  width: 100%;
}
.my-info {
  display: flex;
  font-size: 16px;
  padding-top: 10px;
  & > div {
    padding: 3px 5px;
  }
}
.motto {
  padding-top: 16px;
}
.blog-info {
  display: flex;
  padding-top: 16px;

  .blog-info_item {
    padding: 0 15px;
    border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
    & > div {
      padding-top: 8px;
    }
    &:first-child {
      border-left: none;
    }
  }
}
.contact-info {
  display: flex;
  padding-top: 25px;
  font-weight: bold;
  width: 100%;
  justify-content: space-around;
  & > * {
    cursor: pointer;
  }
}
</style>