<template>
  <div class="table">
    <my-table :type="type" :tableRule="tableRule1" :function="handleGetListQuestion"></my-table>
  </div>
</template>

<script>
import MyTable from "../../components/MyTable";
import { getListQuestion } from "../../network/admin";

export default {
  name: "Table",
  data() {
    return {
      type: 2,
      tableRule1: [
        {
          name: "问题ID",
          key: "questionId"
        },
        {
          name: "用户名",
          key: "username"
        },
        {
          name: "昵称",
          key: "nickname"
        },
        {
          name: "头像",
          key: "userAvater"
        },
        {
          name: "问题标题",
          key: "questionTitle"
        },
        {
          name: "问题内容",
          key: "questionContent"
        },
        {
          name: "标签",
          key: "tag"
        },
        {
          name: "图片",
          key: "img"
        },
        {
          name: "创建时间",
          key: "questionTime"
        },
        {
          name: "浏览量",
          key: "questionView"
        },
        {
          name: "回答数",
          key: "commentCount"
        }
      ]
    };
  },
  created() {
    console.log(this.$route.path);
  },
  methods: {
    handleGetListQuestion(that, index, table) {
      getListQuestion({
        pageIndex: index,
        pageSize: this.$store.state.pageNum
      }).then(res => {
        that.total = res.data.pageTotal;
        that.tableData = res.data.list;
      });
    }
  },
  components: {
    MyTable
  }
};
</script>

<style>
.table {
  width: 95%;
  height: 95%;
  overflow: auto;
  display: flex;
}
</style>