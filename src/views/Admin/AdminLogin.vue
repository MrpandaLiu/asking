<template>
  <div>
    <div class="admin-login flex-column flex-center">
      <h2 style="color:#1989fa;">Asking后台管理系统</h2>
      <van-form @submit="onSubmit">
        <van-field
          v-model="adminName"
          name="adminName"
          placeholder="请输入管理员名"
          :rules="[{ required: true, message: '请填写管理员名' }]"
        />
        <van-field
          v-model="adminPassword"
          type="password"
          name="adminPassword"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 36px;">
          <van-button block type="info" size="normal" native-type="submit">登 录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 引入方法
import { adminLogin } from "../../network/admin";
import { UseComponents } from "../../utils";
// 引入组件
import { Form, Button, Field, Notify } from "vant";
import Vue from "vue";
UseComponents(Vue, Form, Button, Field, Notify);

export default {
  name: "AdminLogin",
  data() {
    return {
      adminName: "", //管理员名
      adminPassword: "" // 密码
    };
  },
  props: ["hidshow"],

  mounted() {
    console.log(this.$route);
  },
  methods: {
    onSubmit(values) {
      adminLogin(values).then(res => {
        const code = res.data.errno;
        const user = res.data.result;
        const msg = res.data.msg;
        console.log(res.data);
        if (code === 0) {
          Notify({ type: "success", message: "登录成功" });
          this.$store.commit("USER_INFO", {
            username: user.adminName,
            nickname: user.adminName,
            password: user.adminPassword,
            profile: user.profile,
            gender: String(user.gender),
            avatar: user.avater
          });
          this.$router.push("/admin");
        } else {
          Notify({ type: "danger", message: msg });
        }
      });
    }
  }
};
</script>

<style scoped>
.admin-login {
  width: 500px;
  height: 100%;
  background: #f7f8fa;
  margin: 0 auto;
}

.admin-login .van-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin-login .van-field {
  width: 150%;
  margin-top: 1.5rem;
}

.admin-login .van-button {
  width: 300%;
  font-size: 1rem;
  border-radius: 0.3rem;
}

.admin-login .van-form > div:nth-child(3) {
  display: flex;
  justify-content: center;
}
</style>