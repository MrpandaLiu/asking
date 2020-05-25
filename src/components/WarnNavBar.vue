<template>
  <div class="black">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar, Dialog } from "vant";
import Vue from "vue";
Vue.use(NavBar);
Vue.use(Dialog);
export default {
  name: "NavBar",
  props: ["title"],
  methods: {
    onClickLeft() {
      Dialog.confirm({
        title: "确认退出",
        message: "中途退出不会保存，请确保数据已经保存"
      })
        .then(() => {
          // on confirm
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style>
.van-nav-bar__title {
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
}

.black {
  width: 100%;
  padding-top: 25px;
  background: #ffffff;
}
</style>