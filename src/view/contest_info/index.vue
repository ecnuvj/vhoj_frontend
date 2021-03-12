<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contest' }"
          >比赛列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>比赛详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  name: "ContestInfo",
  props: ['contest_id'],
  created() {
    EventBus.$emit("change-route", "/contest")
    EventBus.$emit("change-title", "比赛：" + this.contest_id)
  }
}
</script>