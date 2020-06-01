<template>
  <div class="home-header">
    <div class="flex1 flex-center">
      <select class="select" v-model="select">
        <option v-for="(item,index) in optlist" :key="index" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class="header-center">
      <van-search
        v-model="value"
        placeholder="请输入问题标题或标签/问题箱id"
        input-align="center"
        @search="onSearch"
      />
    </div>
    <div class="flex1">
      <img
        :src="$store.state.avatar ? $store.state.avatar + '?t=' + (new Date().getTime()) : '' "
        @click="linkTo('/user/center')"
        alt
      />
    </div>
  </div>
</template>

<script>
import { SearchQuestion, SearchBox } from "../../network/question";

import Vue from "vue";
import { Search, Toast } from "vant";
Vue.use(Search);
Vue.use(Toast);

export default {
  name: "HomeHeader",
  data() {
    return {
      value: "", //搜索值
      select: "", //选中类型
      optlist: [
        // 选择列表
        {
          id: "1",
          name: "问题"
        },
        {
          id: "2",
          name: "问题箱"
        },
        {
          id: "3",
          name: "标签"
        }
      ]
    };
  },
  mounted() {
    // 给下拉选项框一个默认选项
    this.select = this.optlist[0].id;
  },
  methods: {
    onSearch(val) {
      if (val) {
        this.$emit("hideMore");
      }
      if (this.select === "1") {
        console.log(val);
        SearchQuestion({
          index: val
        }).then(res => {
          let code = res.data.errno;
          if (code === 0) {
            this.$store.commit("HOME_LIST", {
              HomeList: res.data.result
            });
            console.log(this.$store.state.HomeList);
          } else {
            Toast("没有符合的问题");
          }
        });
      } else if (this.select === "2") {
        SearchBox({
          index: val
        }).then(res => {
          console.log(res.data);
          let code = res.data.errno;
          if (code === 0) {
            let boxid = res.data.result.boxId;
            this.$router.push(`/answerbox/${boxid}`);
          } else {
            Toast("没有符合的问题箱");
          }
        });
      }
    },
    linkTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style>
.home .home-header {
  width: 100%;
  height: 3.8rem;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 25px;
  background: #ffffff;
}

.home .home-header .header-center {
  flex: 4;
}

.home .home-header > :nth-child(3) img {
  padding-left: 5%;
  padding-top: 6%;
  width: 70%;
  max-width: 50px;
  height: 80%;
  max-height: 55px;
  border-radius: 50%;
}

.home .select {
  background: #f7f8fa;
  border: none;
  height: 34px;
  margin-left: 10px;
  font-size: 0.9rem;
  color: #a3a4a6;
  border-radius: 0.3rem;
}
</style>