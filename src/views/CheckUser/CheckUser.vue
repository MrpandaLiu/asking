<template>
  <div class="check-user">
    <nav-bar title="查看用户"></nav-bar>
    <div class="center-info" v-if="avatar">
      <div class="avatar flex1 flex-center">
        <img :src="avatar ? avatar + '?t=' + (new Date().getTime()) : '' " alt="avatar" />
      </div>
      <div class="username-intro flex-column">
        <h3>
          {{nickname}}
          <span style="color: #1989fa;" v-if="gender == 0">♂</span>
          <span style="color:pink;" v-else>♀</span>
        </h3>
        <div>{{profile}}</div>
      </div>
      <div class="flex1 flex-center"></div>
    </div>
    <div class="user-data" v-if="avatar">
      <div
        v-for="item in userInfo"
        :key="item.name"
        class="user-data-item flex1 flex-column flex-center"
      >
        <h3>{{item.val}}</h3>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkUser } from "../../network/user";
import { getTitle } from "../../utils";
import NavBar from "../../components/NavBar";

export default {
  name: "CheckUser",
  data() {
    return {
      nickname: "",
      gender: "",
      profile: "",
      avatar: "",
      coin: "",
      queCount: "",
      ansCount: "",
      title: "",
      userInfo: [
        {
          name: "称号",
          val: ""
        },
        {
          name: "硬币",
          val: ""
        },
        {
          name: "提问",
          val: ""
        },
        {
          name: "回答",
          val: ""
        }
      ]
    };
  },
  mounted() {
    let username = this.$route.params.username;
    checkUser({
      username: username
    }).then(res => {
      console.log(res.data);
      let user = res.data.result;
      this.nickname = user.nickname;
      this.profile = user.profile;
      this.gender = user.gender;
      this.userInfo[1].val = user.coin;
      this.avatar = user.avater;
      this.userInfo[2].val = user.queCount;
      this.userInfo[3].val = user.ansCount;

      this.userInfo[0].val = getTitle(this.userInfo[1].val);
    });
  },
  components: {
    NavBar
  }
};
</script>

<style>
.check-user {
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}

.center-info {
  width: 100%;
  height: 100px;
  background: white;
  display: flex;
  border-bottom: 1px solid #ddd;
}

.center-info .avatar img {
  width: 75%;
  max-width: 70px;
  height: 70%;
  border-radius: 50%;
}

.center-info .username-intro {
  flex: 2.3;
  justify-content: center;
  margin-left: 10px;
}

.center-info .username-intro > h3 {
  padding-bottom: 5px;
}

.center-info .username-intro > h3 span {
  font-size: 0.9rem;
  color: #1989fa;
}

.center-info .username-intro > div {
  color: #666666;
}

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
