<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contest' }">比赛列表</el-breadcrumb-item>
        <el-breadcrumb-item>比赛详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="比赛说明" name="info">
        <description :contest="contest"></description>
      </el-tab-pane>
      <el-tab-pane v-if="contest.status != 1" label="题目列表" name="list">
        <list :contest="contest"></list>
      </el-tab-pane>
      <el-tab-pane v-if="contest.status != 1" label="排行榜" name="rank">
        <rank></rank>
      </el-tab-pane>
      <el-tab-pane v-if="true" label="后台管理" name="admin">
        <admin :contest="contest"></admin>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
import Description from './components/description'
import List from './components/list.vue'
import Rank from './components/rank.vue'
import Admin from './components/admin.vue'
import { contestShow } from '@/api/contest.js'
export default {
  name: "ContestInfo",
  props: ['contest_id'],
  components: {
    Description,
    Rank,
    List,
    Admin
  },

  created() {
    EventBus.$emit("change-route", "/contest")
    EventBus.$emit("change-title", "比赛详情")
    this.fetchData()
  },
  methods: {
    fetchData() {
      let data = {}
      data['contest_id'] = this.contest_id
      contestShow(data).then(res => {
        this.contest = res.data.contest
        EventBus.$emit("change-title", this.contest.title)
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '获取信息失败，请刷新重试'
        })
      })
    },
    handleClick(tab, event) {
      console.log(tab.name, event);
    }
  },
  data() {
    return {
      activeName: "info",
      contest: {}
    }
  }
}
</script>