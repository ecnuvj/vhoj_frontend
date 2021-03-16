<template>
  <div class="aside-container" @mouseenter="openAside" @mouseleave="closeAside">
    <el-menu :default-active.sync="route" router class="el-menu-aside" :collapse="isCollapse">
      <el-menu-item index="/home">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/problem">
        <i class="el-icon-tickets"></i>
        <span slot="title">题目</span>
      </el-menu-item>
      <el-menu-item index="/contest">
        <i class="el-icon-medal-1"></i>
        <span slot="title">比赛</span>
      </el-menu-item>
      <el-menu-item index="/status">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">记录</span>
      </el-menu-item>
      <el-menu-item index="/user/info">
        <i class="el-icon-user"></i>
        <span slot="title">个人</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  name: "MyAside",
  data() {
    return {
      isCollapse: true,
      route: '/home'
    }
  },
  created() {
    EventBus.$on("change-route", (route) => {
      this.route = route
    })
  },
  methods: {
    closeAside() {
      this.isCollapse = true
    },
    openAside() {
      this.isCollapse = false
    }
  }
}
</script>

<style scoped>
.el-menu-aside:not(.el-menu--collapse) {
  height: 100%;
  width: 150px;
}
.el-menu-aside {
  height: 100%;
}
.aside-container {
  height: 100%;
  width: auto;
}
</style>