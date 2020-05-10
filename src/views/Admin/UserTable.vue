<template>
  <div class="table">
    <my-table :type="type" :tableRule="tableRule1" :function="handleGetListUser"></my-table>
  </div>
</template>

<script>
import MyTable from "../../components/MyTable";
import { getListUser } from "../../network/admin";

export default {
  name: "Table",
  data() {
    return {
      type: 1,
      tableRule1: [
        {
          name: "用户名",
          key: "username"
        },
        {
          name: "昵称",
          key: "nickname"
        },
        {
          name: "密码",
          key: "password"
        },
        {
          name: "个性签名",
          key: "profile"
        },
        {
          name: "性别",
          key: "gender"
        },
        {
          name: "硬币",
          key: "coin"
        },
        {
          name: "头像",
          key: "avater"
        },
        {
          name: "最后登录时间",
          key: "lastSign"
        },
        {
          key: "queCount",
          name: "问题数"
        },
        {
          name: "回答数",
          key: "ansCount"
        }
      ]
    };
  },
  methods: {
    handleGetListUser(that, index, table) {
      getListUser({
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
  overflow: auto;
  display: flex;
}
</style>