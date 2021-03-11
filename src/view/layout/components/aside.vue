<template>
  <div class="aside-container" @mouseenter="openAside" @mouseleave="closeAside">
    <el-menu default-active="1" class="el-menu-aside" :collapse="isCollapse">
      <el-menu-item index="1">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-tickets"></i>
        <span slot="title">题目</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-medal-1"></i>
        <span slot="title">比赛</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">记录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MyAside",
  data() {
    return {
      isCollapse: true,
    }
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