<template>
  <div id="app">
    <header class="black"></header>
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
import { setHeight } from "./utils";

export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "vux-pop-in";
      } else {
        this.transitionName = "vux-pop-out";
      }
    }
  }
};
</script>

<style>
@import url(./style/common.css);

#app {
  width: 100%;
  height: 100%;
}

#app .black {
  width: 100%;
  height: 20px;
  background: black;
}
</style>
