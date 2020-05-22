<template>
  <div class="login flex-column">
    <div class="pic">
      <img src="@/assets/logo.png" alt />
    </div>
    <login-form :hidshow="hidshow"></login-form>
    <div class="nav" v-show="hidshow">
      还没账号？
      <router-link to="/user/register">点这里</router-link>
    </div>
  </div>
</template>

<script>
import { checkUser } from "../../network/user";

import LoginForm from "./LoginForm";
import { Notify } from "vant";
import Vue from "vue";
Vue.use(Notify);

export default {
  name: "Login",
  data() {
    return {
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true //显示或者隐藏footer
    };
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };

    if (localStorage.getItem("user")) {
      console.log(this.$store.state.username);
      checkUser({
        username: this.$store.state.username
      }).then(res => {
        const code = res.data.errno;
        const msg = res.data.msg;
        const user = res.data.result;
        console.log(res.data);
        if (code === 0) {
          Notify({ type: "success", message: "登录成功" });
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
          this.$router.push("/home");
        } else {
          Notify({ type: "danger", message: msg });
        }
      });
    }
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  },
  components: {
    LoginForm
  }
};
</script>

<style>
.login {
  align-items: center;
  width: 100%;
  height: 100%;
}

.login .pic {
  margin-top: 15%;
  width: 30%;
}

.login .pic img {
  width: 100%;
  height: 100%;
}

.nav {
  font-size: 1.2rem;
}

.nav a {
  color: #072b4e;
}
</style>