<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/contest' }">比赛列表</el-breadcrumb-item>
        <el-breadcrumb-item>比赛详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="progress">
      <el-progress :percentage="percentage" :color="customColorMethod" :format="format"></el-progress>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="比赛说明" name="info">
        <description :contest="contest" :joined="joined"></description>
      </el-tab-pane>
      <el-tab-pane v-if="contest.status != 1 && joined == true" label="题目列表" name="list">
        <list :contest="contest"></list>
      </el-tab-pane>
      <el-tab-pane v-if="contest.status != 1 && joined == true" label="排行榜" name="rank">
        <rank :rank="rank" :rankLoading="rankLoading"></rank>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
import Description from './components/description'
import List from './components/list.vue'
import Rank from './components/rank.vue'
import { contestShow } from '@/api/contest.js'
import { contestRank } from '@/api/contest.js'
export default {
  name: "ContestInfo",
  props: ['contest_id'],
  components: {
    Description,
    Rank,
    List,
  },

  created() {
    EventBus.$emit("change-route", "/contest")
    EventBus.$emit("change-title", "比赛详情")
    this.fetchData()
  },
  methods: {
    format(percentage) {
      return '';
    },
    customColorMethod(percentage) {
      if (percentage < 50) {
        return '#67c23a';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#F56C6C';
      }
    },
    reload() {
      this.$alert("", "比赛已经结束了", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$router.go(0);
        },
      });
    },
    fetchRank() {
      let data = {}
      data['contest_id'] = this.contest.contest_id
      data['start_time'] = new Date(this.contest.start_time).getTime() / 1000
      this.rankLoading = true
      contestRank(data).then((res) => {
        this.rank = res.data.rank
        this.rankLoading = false
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: '获取排行失败'
        })
        this.rankLoading = false
      });
    },
    fetchData() {
      let data = {}
      data['contest_id'] = this.contest_id
      contestShow(data).then(res => {
        this.contest = res.data.contest
        this.joined = res.data.joined
        EventBus.$emit("change-title", this.contest.title)
        this.handleProgress()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '获取信息失败，请刷新重试'
        })
      })
    },
    handleClick(tab, event) {
      if (tab.name == "rank") {
        this.fetchRank()
      }
    },
    handleProgress() {
      if (this.contest.status == 3) {
        this.percentage = 100
      } else if (this.contest.status == 1) {
        this.percentage = 0
      } else {
        let time = setInterval(() => {
          let st = new Date(this.contest.start_time).getTime()
          let ed = new Date(this.contest.end_time).getTime()
          let now = new Date().getTime()
          if (now >= ed) {
            this.reload()
            clearInterval(time)
          } else {
            this.percentage = (now - st) / (ed - st) * 100
          }
        }, 500)
      }
    }
  },
  data() {
    return {
      activeName: "info",
      contest: {},
      rank: { problems: [], participants: [] },
      rankLoading: false,
      joined: true,
      percentage: 0,
    }
  },
}
</script>

<style scoped>
.progress {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>