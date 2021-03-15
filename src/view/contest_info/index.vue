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
    EventBus.$emit("change-title", "比赛：" + this.contest_id)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name, event);
    }
  },
  data() {
    return {
      activeName: "info",
      contest: {
        contest_id: this.contest_id,
        title: 'test contest',
        description: '这是一场比赛',
        start_time: '2021-03-15 00:00:00',
        end_time: '2021-03-15 05:00:00',
        creator: {
          name: "bqx"
        },
        problem_ids: [
          1, 2, 3
        ],
        problems: [
          {
            problem_id: 1,
            title: 'this is a problem',
            status: 1,
            order: 'A',
            submitted: 100000,
            accepted: 987
          },
          {
            problem_id: 2,
            title: 'this is a problem too',
            status: 2,
            order: 'B',
            submitted: 100000,
            accepted: 987
          }, {
            problem_id: 3,
            title: '.....',
            status: 3,
            order: 'C',
            submitted: 100000,
            accepted: 987
          }
        ],
        status: 2
      }
    }
  }
}
</script>