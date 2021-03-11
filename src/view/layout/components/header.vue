<template>
  <div class="header">
    <div>
      <!-- <i
        :class="{
          'el-icon-s-fold': !isCollapse,
          'el-icon-s-unfold': isCollapse,
        }"
        @click="isCollapse = !isCollapse"
      ></i> -->
      <span>ecnu virtual online judge</span>
    </div>
    <div v-if="user != null" style="height: 100%">
      <el-dropdown>
        <div class="avatar-wrap">
          <img
            class="avatar"
            :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
          />
          <span
            >{{ user.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onsetting()">设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else>
      <el-button type="primary" plain @click="$emit('show-form', 'login')"
        >登录</el-button
      >
      <el-button type="primary" plain @click="$emit('show-form', 'register')"
        >注册</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  props: ['user'],
  methods: {
    logout() {
      window.localStorage.removeItem("user")
      this.$emit("update-user")
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
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  /* background-color: rgb(179, 192, 209); */
}
</style>