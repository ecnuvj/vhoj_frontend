<template>
  <div class="header">
    <div class="page-title">
      <span>{{ title }}</span>
    </div>
    <div v-if="user != null" class="user-info">
      <el-dropdown>
        <div class="avatar-wrap">
          <img
            class="avatar"
            :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
          />
          <span style="color: white">
            {{ user.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="userInfo">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else>
      <el-button type="primary" plain @click="$emit('show-form', 'login')">登录</el-button>
      <el-button type="primary" plain @click="$emit('show-form', 'register')">注册</el-button>
    </div>
  </div>
</template>

<script>
import EventBus from "@/EventBus.js"
export default {
  name: "MyHeader",
  props: ['user'],
  data() {
    return {
      title: "ecnu virtual online judge"
    }
  },
  created() {
    EventBus.$on("change-title", (title) => {
      this.title = title
    })
  },
  methods: {
    logout() {
      this.$confirm('退出当前账号, 是否继续?', '登出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem("user")
        this.$emit("update-user")
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type: 'info',
          message: '登出成功'
        })
      }).catch(() => {

      })
    },
    userInfo() {
      this.$router.push({
        name: 'userInfo'
      })
    }
  }
}
</script>

<style scoped>
.avatar-wrap {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  /* background-color: rgb(179, 192, 209); */
}
.user-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.page-title {
  height: 80%;
  color: aliceblue;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>