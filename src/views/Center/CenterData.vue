<template>
  <!-- 四项数据栏 -->
  <div class="user-data">
    <div class="user-data-item flex1 flex-column flex-center">
      <h3>{{title}}</h3>
      <div>称号</div>
    </div>
    <div class="user-data-item flex1 flex-column flex-center">
      <h3>{{this.$store.state.coin}}</h3>
      <div>硬币</div>
    </div>
    <div class="user-data-item flex1 flex-column flex-center">
      <h3>{{$store.state.queCount}}</h3>
      <div>提问</div>
    </div>
    <div class="user-data-item flex1 flex-column flex-center">
      <h3>{{$store.state.ansCount}}</h3>
      <div>回答</div>
    </div>
  </div>
</template>

<script>
import { checkUser } from "../../network/user";
import { getTitle } from "../../utils";

export default {
  name: "CenterData",
  data() {
    return {
      title: "" // 称号
    };
  },
  created() {
    if (!this.$store.state.coin) {
      checkUser({
        username: this.$store.state.username
      }).then(res => {
        console.log(res.data);
        let user = res.data.result;
        this.$store.commit("USER_INFO", {
          username: user.username,
          nickname: user.nickname,
          password: user.password,
          profile: user.profile,
          gender: String(user.gender),
          avatar: user.avater
        });
        this.$store.commit("USER_DATA", {
          coin: user.coin,
          queCount: user.queCount,
          ansCount: user.ansCount
        });
        this.userInfo[0].val = getTitle(user.coin);
      });
    }
  },
  mounted() {
    this.title = getTitle(this.$store.state.coin);
  }
};
</script>

<style>
.user-data {
  width: 100%;
  height: 100px;
  display: flex;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-data .user-data-item > div {
  padding-top: 5px;
  color: #858585;
}
</style>