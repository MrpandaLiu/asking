<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive key="rv1">
        <router-view v-if="$route.meta.isKeepAlive" class="router-view" />
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.isKeepAlive" class="router-view" key="rv2" />
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
        //this.transitionName = "vux-pop-in";
        this.transitionName = "slide-left";
      } else {
        //this.transitionName = "vux-pop-out";
        this.transitionName = "slide-right";
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
</style>
