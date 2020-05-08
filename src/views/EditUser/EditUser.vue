<template>
  <div class="editUser">
    <warn-nav-bar title="修改资料"></warn-nav-bar>
    <h2 class="h2">修改头像</h2>
    <div class="edit-header">
      <div class="flex1 flex-center">
        <img :src="avatar ? avatar + '?t=' + (new Date().getTime()) : '' " alt />
      </div>
      <div class="flex1 flex-center">
        <van-button round type="primary" @click="clickFile">上传新头像</van-button>
        <input class="file" type="file" @change="afterRead" ref="inputer" />
      </div>
    </div>
    <h2 class="h2">修改信息</h2>
    <van-cell-group>
      <van-field v-model="username" label="用户名" disabled />
      <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="password" type="password" label="密码" />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="profile"
        rows="2"
        autosize
        label="简介"
        type="textarea"
        maxlength="20"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
    <br />
    <van-button type="info" size="large" round @click="changeInfo">确认修改</van-button>
  </div>
</template>

<script>
import { UseComponents } from "../../utils";
import { uploadAvatar, updateInfo } from "../../network/user";
import WarnNavBar from "../../components/WarnNavBar";
import Vue from "vue";
import {
  Uploader,
  Field,
  CellGroup,
  Button,
  RadioGroup,
  Radio,
  Notify
} from "vant";
UseComponents(
  Vue,
  Uploader,
  Field,
  CellGroup,
  Button,
  RadioGroup,
  Radio,
  Notify
);

export default {
  name: "EditUser",
  data() {
    return {
      username: this.$store.state.username,
      nickname: this.$store.state.nickname,
      password: this.$store.state.password,
      gender: this.$store.state.gender, // 性别
      profile: this.$store.state.profile,
      file: "", // 头像文件
      avatar: this.$store.state.avatar // 当前头像
    };
  },
  methods: {
    afterRead() {
      this.file = this.$refs.inputer.files[0]; // 获取文件
      this.formData = new window.FormData();
      this.formData.append("avater", this.file);
      this.formData.append("username", this.$store.state.username);
      //console.log(this.formData.get("file"));
      uploadAvatar(this.formData).then(res => {
        console.log(res.data);
        let code = res.data.errno,
          url = res.data.url,
          msg = res.data.msg;
        if (code === 0) {
          this.avatar = url;
          Notify({ type: "success", message: "头像修改成功" });
          this.$store.commit("AVATAR", {
            avatar: this.avatar
          });
          this.$router.push("/home");
        } else if (code === 1) {
          Notify({ type: "danger", message: msg });
        } else {
          Notify({ type: "danger", message: "头像更新失败" });
        }
      });
    },
    changeInfo() {
      updateInfo({
        username: this.$store.state.username,
        nickname: this.nickname,
        password: this.password,
        gender: Number(this.gender),
        profile: this.profile
      }).then(res => {
        let [code, msg] = [res.data.errno, res.data.msg];
        this.$store.commit("USER_INFO", {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
          profile: this.profile,
          gender: this.gender,
          avatar: this.avatar
        });
        if (code === 0) {
          Notify({ type: "success", message: msg });
          this.$router.push("/home");
        } else {
          Notify({ type: "danger", message: msg });
        }
      });
    },
    clickFile() {
      this.$refs.inputer.click();
    }
  },
  components: {
    WarnNavBar
  }
};
</script>

<style>
.editUser {
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}

.editUser .file {
  width: 50%;
  display: none;
}

.editUser .edit-header {
  width: 100%;
  height: 140px;
  display: flex;
  background: white;
}

.editUser .edit-header > :first-child img {
  width: 45%;
  height: 60%;
  border-radius: 50%;
}
</style>