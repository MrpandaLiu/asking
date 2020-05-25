<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div v-if="hidshow" style="margin: 36px;">
      <van-button block type="info" size="normal" native-type="submit">登 录</van-button>
    </div>
  </van-form>
</template>

<script>
// 引入方法
import { sendLoginMsg } from "../../network/user";
import { UseComponents } from "../../utils";
// 引入组件
import { Form, Button, Field, Toast } from "vant";
import Vue from "vue";
UseComponents(Vue, Form, Button, Field, Toast);

export default {
  name: "LoginForm",
  data() {
    return {
      username: "", //用户名
      password: "" // 密码
    };
  },
  props: ["hidshow"],

  mounted() {
    console.log(this.$route);
  },
  methods: {
    onSubmit(values) {
      sendLoginMsg(values).then(res => {
        const code = res.data.errno;
        const user = res.data.result;
        const msg = res.data.msg;
        console.log(res.data);
        if (code === 0) {
          Toast("登录成功");
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
          if (localStorage.getItem("path")) {
            this.$router.push(localStorage.getItem("path"));
            localStorage.removeItem("path");
          } else {
            this.$router.push("/home");
          }
        } else {
          Toast(msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.login .van-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login .van-field {
  width: 150%;
  margin-top: 1.5rem;
}

.login .van-button {
  width: 300%;
  font-size: 1rem;
  border-radius: 0.3rem;
}

.login .van-form > div:nth-child(3) {
  display: flex;
  justify-content: center;
}
</style>