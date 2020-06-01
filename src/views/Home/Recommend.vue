<template>
  <div class="top-bar" @click="goShowAsk('a',current.questionId)">
    <div class="editor">
      <img src="../../assets/recommend.png" alt />编辑推荐：
      <span style="color:#0c539b;" v-if="current">{{current.questionTitle}}</span>
    </div>
    <my-scroller :data="recommend"></my-scroller>
  </div>
</template>

<script>
import MyScroller from "../../components/Scroller";

export default {
  name: "Recommend",
  created() {
    // 循环打印标题
    this.current = this.recommend[this.index];
    console.log(this.current);
    setInterval(() => {
      this.index++;
      if (this.index === this.recommend.length) {
        this.index = 0;
      }
      this.current = this.recommend[this.index];
    }, 5000);
  },
  data() {
    return {
      current: null,
      index: 0
    };
  },
  props: {
    recommend: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goShowAsk(event, questionId) {
      console.log(questionId);
      this.$router.push(`/showask/${questionId}`);
    }
  },
  components: {
    MyScroller
  }
};
</script>

<style>
.home .top-bar {
  width: 100%;
  height: 250px;
  font-size: 1.05rem;
}

.home .top-bar .editor {
  height: 30px;
  display: flex;
  align-items: center;
  color: #666666;
  margin: 10px 0 5px 0;
}

.home .top-bar .editor img {
  width: 20px;
  height: 20px;
  padding: 0 5px;
}
</style>