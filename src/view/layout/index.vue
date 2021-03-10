<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px" height="100%">
          <el-tabs tab-position="left" style="height: 100%">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>
