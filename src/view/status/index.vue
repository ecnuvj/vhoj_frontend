<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>记录列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table :data="submissions" style="width: 100%">
        <el-table-column prop="id" label="提交ID" align="center" width="100">
        </el-table-column>
        <el-table-column prop="submit_time" label="提交时间" align="center">
        </el-table-column>
        <el-table-column prop="status" label="判题状态" align="center">
        </el-table-column>
        <el-table-column label="题号" align="center" width="100">
          <template slot-scope="scope">
            <router-link :to="'/problem/' + scope.row.problem_id">{{
              scope.row.problem_id
            }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="time_cost"
          align="center"
          label="时间消耗"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="memory_cost"
          align="center"
          label="空间消耗"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="language"
          align="center"
          label="语言"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="creator"
          align="center"
          label="提交者"
          width="100"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/status")
    EventBus.$emit("change-title", "记录列表")
  },
  data() {
    return {
      submissions: [
        {
          id: 1000,
          submit_time: "2021-03-11 00:00:00",
          status: "accepted",
          problem_id: 1000,
          time_cost: "200ms",
          memory_cost: "384m",
          language: "C++",
          creator: "bqx"
        }
      ]
    }
  }
}
</script>