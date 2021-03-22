<template>
  <div style="width:50%">
    <el-button @click="goFront">查看前台</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basic">
        <BasicPane :contest="contest" @update-contest="fetchData"></BasicPane>
      </el-tab-pane>
      <el-tab-pane label="题目集" name="problem">
        <ProblemPane :contest="contest" @update-contest="fetchData"></ProblemPane>
      </el-tab-pane>
      <el-tab-pane label="生成" name="participants">
        <UsersPane></UsersPane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
import BasicPane from './components/basic_pane'
import ProblemPane from './components/problem_pane'
import UsersPane from './components/users_pane'
import { contestShow } from '@/api/contest.js'
export default {
  name: 'ContestBack',
  props: ['contest_id'],
  components: {
    BasicPane,
    ProblemPane,
    UsersPane,
  },
  created() {
    EventBus.$emit("change-title", "比赛后台")
    EventBus.$emit("change-route", "/contest")
    this.fetchData()
  },
  data() {
    return {
      activeName: 'basic',
      contest: { problems: [] }
    }
  },
  methods: {
    goFront() {
      this.$router.push({
        path: '/contest/' + this.contest_id
      })
    },
    fetchData() {
      let data = {}
      data['contest_id'] = this.contest_id
      contestShow(data).then((res) => {
        this.contest = res.data.contest
      }).catch((err) => {
        this.$message.error('获取数据失败，请刷新重试')
      });
    }
  }
}
</script>