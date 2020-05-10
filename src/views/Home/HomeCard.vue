<template>
  <div class="home-card" @click="goShowAsk('a',question.questionId)">
    <div>
      <h3>
        <img v-if="question.questionView>50" src="../../assets/hot.png" alt />
        {{question.questionTitle}}
      </h3>
    </div>
    <div class="author">
      <img
        @click="checkUser(question.username)"
        :src="question.userAvater ? question.userAvater + '?t=' + (new Date().getTime()) : '' "
        alt
      />
      <div style="color:#535353;">{{question.nickname}}</div>
    </div>
    <div class="question-intro">{{question.questionContent}}</div>
    <div class="question-img">
      <img :src="question.img" alt />
    </div>
    <div class="question-info">
      <span>{{question.questionView}} 浏览</span> ·
      <span>{{question.commentCount}} 评论</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: ["question"],
  methods: {
    goShowAsk(event, questionId) {
      console.log(questionId);
      this.$router.push(`/showask/${questionId}`);
    },
    checkUser(username) {
      this.$router.push(`/checkuser/${username}`);
      window.event.stopPropagation();
    }
  }
};
</script>

<style>
.home-card {
  margin-top: 10px;
  width: 100%;
  background: white;
  border-top: 1px solid rgb(238, 236, 236);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.home-card > div {
  padding: 10px 10px 0 10px;
}

.home-card h3 {
  font-weight: 550;
}

.home-card h3 img {
  width: 22px;
  height: 22px;
  padding-right: 5px;
}

.home-card .author {
  display: flex;
  align-items: center;
  font-size: 1.05rem;
}

.home-card .author img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

/* .home-card .question-img {
  height: 200px;
} */

.home-card .question-img img {
  width: 95%;
  height: 100%;
}

.home-card .question-intro {
  color: #666666;
}

.home-card .question-info {
  color: #999999;
  margin-bottom: 15px;
}
</style>