<template>
  <div class="admin">
    <admin-header></admin-header>
    <main>
      <nav class="flex-column">
        <router-link
          tag="div"
          v-for="item in navList"
          :key="item.url"
          class="nav-item"
          :to="item.url"
        >{{item.name}}</router-link>
      </nav>
      <div class="admin-table">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader";

export default {
  name: "Admin",
  data() {
    return {
      navList: [
        {
          name: "用户一览",
          url: "/admin/user"
        },
        {
          name: "提问一览",
          url: "/admin/question"
        }
      ]
    };
  },
  components: {
    AdminHeader
  }
};
</script>

<style scoped>
.admin {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

.admin main {
  width: 100%;
  height: 100%;
  display: flex;
}

.admin main nav {
  width: 150px;
  background: #1989fa;
  align-items: center;
  flex-shrink: 0;
}

.admin main nav .nav-item {
  width: 90%;
  margin: 20px 0 10px 0;
  padding: 10px 5px 10px 0;
  text-align: center;
  background: white;
  border-radius: 10px;
  color: #135699;
  box-shadow: black 1px 1px 1px;
}

.admin main .admin-table {
  flex: 1;
  background: #f7f8fa;
  flex-shrink: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
}
</style>