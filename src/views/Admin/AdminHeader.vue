<template>
  <header class="flex-center">
    <div class="header-container">
      <h2 style="color:white;">Asking后台管理系统</h2>
      <div>
        欢迎，{{this.$store.state.nickname}}
        <span class="quit" @click="quit">退出</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AdminHeader",
  methods: {
    quit() {
      window.localStorage.removeItem("user");
      this.$router.push("/admin/login");
    }
  }
};
</script>

<style scoped>
.admin header {
  width: 100%;
  height: 70px;
  background: #1989fa;
  border-bottom: 1px solid white;
  box-shadow: black 1px 1px 1px;
}

.admin header .header-container {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin header .header-container .quit {
  color: rgb(175, 9, 9);
  margin-left: 10px;
}
</style>