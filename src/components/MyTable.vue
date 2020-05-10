<template>
  <div style="height:auto;">
    <table>
      <!-- 表格头 -->
      <tr>
        <th>
          <div style="width:50px;">序号</div>
        </th>
        <th v-for="th in tableRule" :key="th.key">
          <div>{{th.name}}</div>
        </th>
        <th>
          <div>操作</div>
        </th>
      </tr>
      <!-- 表格体 -->
      <tr v-for="(item,index) in tableData" :key="index">
        <td>
          <div style="width:50px;">{{index+1}}</div>
        </td>
        <td v-for="th in tableRule" :key="th.name">
          <div v-if="isPic(th.name)" style="color:#1989fa;" @click="showPic(item[th.key])">查看</div>
          <!-- 点击展示详情 -->
          <div v-else @click="mouseClick($event,item[th.key])">{{item[th.key]}}</div>
        </td>
        <td style="display:flex;width:150px;">
          <div
            v-if="isQuestion()"
            @click="goAnswer(item.questionId)"
            style="color:#1989fa; flex:1;"
          >详情</div>
          <div style="color:red; flex:1;" @click="deleteItem(item)">删除</div>
        </td>
      </tr>
    </table>
    <!-- 分页器 -->
    <div style="width:400px;position:fixed;bottom: 50px; left: 200px;">
      <van-pagination
        @change="goPage"
        v-model="currentPage"
        :total-items="total"
        :show-page-size="3"
        force-ellipses
      />
    </div>
    <div class="msg" ref="msg" v-show="isShow">{{noticeMsg}}</div>
  </div>
</template>

<script>
import { deleteUser, deleteQuestion, deleteAnswer } from "../network/admin";
import { UseComponents } from "../utils";
import Vue from "vue";
import { Pagination, ImagePreview, Dialog, Toast } from "vant";
UseComponents(Vue, Pagination, ImagePreview, Dialog, Toast);

export default {
  name: "MyTable",
  props: ["type", "tableRule", "function"],
  data() {
    return {
      tableData: [], // 表格展示数据的数组
      currentPage: 0, // 当前页
      total: 0, // 数据总数
      isShow: false, // 详情是否展示
      noticeMsg: "" // 详情内容
    };
  },
  mounted() {
    // 初始化数据
    this.function(this, this.currentPage, this.tableData);
  },
  methods: {
    // 判断是否照片类型
    isPic(name) {
      return ["头像", "图片"].includes(name);
    },
    // 判断是否问题表格
    isQuestion() {
      return this.type === 2;
    },
    // 展示图片
    showPic(url) {
      ImagePreview({
        images: [url],
        closeable: true
      });
    },
    // 删除一条数据项
    deleteItem(item) {
      Dialog.confirm({
        title: "删除",
        message: "确认删除"
      })
        .then(() => {
          // 用户
          if (this.type === 1) {
            deleteUser({
              username: item.username
            }).then(res => {
              let code = res.data.errno,
                msg = res.data.msg;
              if (code === 0) {
                Toast.success(msg);
                this.function(this, 0, this.tableData);
              } else {
                Toast.fail(msg);
              }
            });
          }
          // 问题
          else if (this.type === 2) {
            deleteQuestion({
              questionId: item.questionId
            }).then(res => {
              let code = res.data.errno,
                msg = res.data.msg;
              if (code === 0) {
                Toast.success(msg);
                this.function(this, 0, this.tableData);
              } else {
                Toast.fail(msg);
              }
            });
          }
          // 回答
          else if (this.type === 3) {
            deleteAnswer({
              answerId: item.answerId
            }).then(res => {
              let code = res.data.errno,
                msg = res.data.msg;
              if (code === 0) {
                Toast.success(msg);
                this.function(this, 0, this.tableData);
              } else {
                Toast.fail(msg);
              }
            });
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    // 点击展示详情
    mouseClick(e, val) {
      this.$refs.msg.style["top"] = e.pageY + "px";
      this.$refs.msg.style["left"] = e.pageX + "px";
      this.isShow = true;
      this.noticeMsg = val;
    },
    // 跳转到问题对应的回答列表页
    goAnswer(id) {
      this.$router.push("/admin/answer/" + id);
    },
    // 翻页
    goPage() {
      this.isShow = false;
      this.function(this, this.currentPage, this.tableData);
    }
  }
};
</script>

<style>
.table table tr th {
  background: #1989fa;
  color: white;
}

.table table tr th > div {
  width: 150px;
  height: 35px;
  line-height: 35px;
}

.table table tr td > div {
  width: 150px;
  padding: 12px 0 12px 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg {
  position: absolute;
  padding: 5px;
  border-radius: 5px;
  z-index: 9999;
  background: skyblue;
}
</style>