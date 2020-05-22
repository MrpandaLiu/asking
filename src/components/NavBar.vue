<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
</template>

<script>
import { NavBar } from "vant";
import Vue from "vue";
Vue.use(NavBar);
export default {
  name: "NavBar",
  props: ["title"],
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.van-nav-bar__title {
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
}
</style>