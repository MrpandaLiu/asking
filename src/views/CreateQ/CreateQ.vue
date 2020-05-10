<template>
  <div class="create-q">
    <warn-nav-bar title="创建问题"></warn-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="title"
        name="title"
        label="标题"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请输入标题' }]"
      />
      <van-field name="isBox" label="设为问题箱">
        <template #input>
          <van-switch v-model="isBox" size="20" />
        </template>
      </van-field>
      <van-field
        v-show="!isBox"
        v-model="tag"
        name="tag"
        label="标签"
        placeholder="请从下列选择一个该问题所属的标签"
        readonly
        :rules="[{ required: true, message: '请选择一个标签' }]"
      />
      <!-- 选择标签 -->
      <div class="tags" v-show="!isBox" v-for="(item,index) in tags" :key="index">
        <van-tag @click="chooseTag(item)" plain size="large" type="primary">{{item}}</van-tag>
      </div>
      <div class="flex1 put-img" v-show="!isBox">
        <van-button class="v-btn" round type="info" size="small" @click="clickFile">上传配图</van-button>
        <span style="color:green;" v-if="file">上传配图成功</span>
        <input class="file" type="file" @change="afterRead" ref="inputer" />
      </div>
      <van-field
        v-model="content"
        rows="4"
        autosize
        name="content"
        label="问题描述"
        type="textarea"
        maxlength="100"
        placeholder="对问题的补充，请输入问题的描述"
        show-word-limit
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">发布问题</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { UseComponents } from "../../utils";
import { addQuestion, addBox } from "../../network/question";

import WarnNavBar from "../../components/WarnNavBar";
import Vue from "vue";
import {
  Form,
  Field,
  Switch,
  Button,
  RadioGroup,
  Radio,
  Tag,
  Toast
} from "vant";
UseComponents(Vue, Form, Field, Switch, Button, RadioGroup, Radio, Tag, Toast);

export default {
  name: "CreateQ",
  data() {
    return {
      title: "", // 标题
      tag: "生活", // 所属标签
      content: "", // 内容
      isBox: false, // 是否为问题箱
      file: null, // 文件
      tags: [
        // 可选标签
        "生活",
        "学习",
        "情感",
        "游戏",
        "科技",
        "数码",
        "影视",
        "二次元",
        "音乐",
        "舞蹈",
        "人文社科"
      ]
    };
  },
  methods: {
    onSubmit() {
      if (!this.isBox) {
        let form = new window.FormData();
        form.append("img", this.file);
        form.append("username", this.$store.state.username);
        form.append("questionTitle", this.title);
        form.append("tag", this.tag);
        form.append("questionContent", this.content);
        addQuestion(form).then(res => {
          console.log(res.data);
          let code = res.data.errno,
            msg = res.data.msg;
          Toast(msg);
          if (code === 0) {
            this.$store.commit("ADDQUE");
            console.log(this.$store.state.queCount);
            this.$router.push("/user/center");
          }
        });
      } else {
        addBox({
          username: this.$store.state.username,
          boxTitle: this.title,
          boxContent: this.content
        }).then(res => {
          console.log(res.data);
          let code = res.data.errno,
            msg = res.data.msg;
          Toast(msg);
          if (code === 0) {
            this.$router.push("/user/center");
          }
        });
      }
    },
    chooseTag(item) {
      this.tag = item;
    },
    afterRead() {
      this.file = this.$refs.inputer.files[0]; // 获取文件
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
.create-q {
  width: 100%;
  height: 100%;
  background: #f7f8fa;
}

.create-q .tags {
  display: inline-block;
  margin: 10px;
}

.create-q .put-img {
  padding: 5px;
  background: white;
}

.create-q .v-btn {
  margin-left: 10px;
  margin-right: 10px;
}

.create-q .file {
  display: none;
  margin: 10px 0 10px 0;
}
</style>