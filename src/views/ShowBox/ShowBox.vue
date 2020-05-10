<template>
  <div class="show-box">
    <nav-bar title="查看问题箱"></nav-bar>
    <div class="box-title">
      <h2 class="h2">{{title}}</h2>
      <div class="author">
        <strong>来自：</strong>匿名
      </div>
      <div class="author">
        <strong>时间：</strong>
        {{time}}
      </div>
    </div>
    <div class="answer-border flex-center">
      <div class="answer">
        <div>{{content}}</div>
      </div>
    </div>
    <van-pagination v-model="currentPage" :page-count="count" mode="simple" />
  </div>
</template>

<script>
import { boxAnsList } from "../../network/answer";

import NavBar from "../../components/NavBar";
import Vue from "vue";
import { Pagination, Toast } from "vant";

Vue.use(Pagination);
Vue.use(Toast);
export default {
  name: "ShowBox",
  data() {
    return {
      title: "",
      currentPage: 1, // 当前页
      boxList: [], //回复列表
      count: 0,
      content: "",
      time: ""
    };
  },
  watch: {
    currentPage: function() {
      this.content = this.boxList[this.currentPage - 1].boxAcontent;
      this.time = this.boxList[this.currentPage - 1].boxAtime;
    }
  },
  mounted() {
    let id = this.$route.params.boxid;
    this.title = this.$route.params.title;
    boxAnsList({
      boxId: Number(id)
    }).then(res => {
      console.log(res.data);
      let code = res.data.errno;
      if (code === 0) {
        this.boxList = res.data.result;
        this.content = this.boxList[0].boxAcontent;
        this.time = this.boxList[0].boxAtime;
        this.count = this.boxList.length;
      } else {
        Toast("获取失败");
      }
    });
  },
  components: {
    NavBar
  }
};
</script>

<style>
.show-box {
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}

.show-box .box-title {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.show-box .box-title .author {
  margin-left: 20px;
  color: #666666;
  padding-bottom: 20px;
}

.show-box .answer-border {
  margin: 15px auto;
  width: 92%;
  height: 400px;
  background: #daeafa;
  border-radius: 15px;
}

.show-box .answer-border .answer {
  width: 80%;
  height: 80%;
  background: white;
}

.show-box .answer-border .answer > div {
  padding: 10px;
  text-indent: 1em;
  font-size: 1.05rem;
  line-height: 150%;
}
</style>