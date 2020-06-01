<template>
  <div class="home flex-column">
    <home-header @hideMore="hide"></home-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-loading v-if="loading" size="24px">加载中...</van-loading>
      <recommend v-show="more" :recommend="recommendList"></recommend>
      <home-card v-for="(item,index) in this.$store.state.HomeList" :key="index" :question="item"></home-card>
      <p class="more" v-if="more" @click="getMore">点击加载更多...</p>
    </van-pull-refresh>
  </div>
</template>

<script>
import { UseComponents } from "../../utils";
import { showHomeQuestion } from "../../network/question";

import HomeHeader from "./HomeHeader.vue";
import HomeCard from "./HomeCard.vue";
import Recommend from "./Recommend.vue";
import Vue from "vue";
import { PullRefresh, Toast, Loading } from "vant";
UseComponents(Vue, PullRefresh, Toast, Loading);

export default {
  name: "Home",
  data() {
    return {
      recommendList: [],
      count: 0,
      isLoading: false,
      loading: true,
      more: true
    };
  },
  mounted() {
    // 展示首页问题
    showHomeQuestion({
      username: this.$store.state.username
    }).then(res => {
      console.log(res.data);
      let result = res.data.result;
      this.loading = false;
      this.recommendList = res.data.recommend;
      this.$store.commit("HOME_LIST", {
        HomeList: result
      });
    });
  },
  methods: {
    // 上拉刷新
    onRefresh() {
      showHomeQuestion({
        username: this.$store.state.username
      }).then(res => {
        console.log(res.data);
        this.recommendList = res.data.recommend;
        let result = res.data.result;
        this.$store.commit("HOME_LIST", {
          HomeList: result
        });
        Toast("刷新成功");
        this.isLoading = false;
        this.more = true;
      });
    },
    // 下拉加载
    getMore() {
      showHomeQuestion({
        username: this.$store.state.username
      }).then(res => {
        let result = res.data.result;
        let arr = this.$store.state.HomeList;
        result.forEach(el => {
          arr.push(el);
        });
        this.$store.commit("HOME_LIST", {
          HomeList: arr
        });
      });
    },
    hide() {
      this.more = false;
    }
  },
  components: {
    HomeHeader,
    HomeCard,
    Recommend
  }
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.van-pull-refresh {
  height: 100%;
  overflow: auto;
  background: #f7f8fa;
}

.home .more {
  margin: 5px auto;
  text-align: center;
  color: #1989fa;
}
</style>