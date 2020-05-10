<template>
  <div class="table flex-column">
    <h2>问题Id:{{this.$route.params.id}}</h2>
    <my-table :type="type" :tableRule="tableRule1" :function="handleGetListAnswer"></my-table>
  </div>
</template>

<script>
import MyTable from "../../components/MyTable";
import { getListAnswer } from "../../network/admin";

export default {
  name: "Table",
  data() {
    return {
      type: 3,
      tableRule1: [
        {
          name: "回答ID",
          key: "answerId"
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
          name: "回答内容",
          key: "answerContent"
        },
        {
          name: "获赞数",
          key: "thumb"
        },
        {
          name: "创建时间",
          key: "answerTime"
        }
      ]
    };
  },
  created() {
    console.log(this.$route.path);
  },
  methods: {
    handleGetListAnswer(that, index, table) {
      getListAnswer({
        questionId: Number(this.$route.params.id),
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

.table h2 {
  padding-bottom: 5px;
  color: #1989fa;
}
</style>