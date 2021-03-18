<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>记录列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" id="top-card" body-style="width:100%">
      <div class="search-area">
        <div>
          <el-dropdown size="small" @command="handleStatusCommand">
            <el-input
              placeholder="结果"
              v-model="statusText"
              maxlength="60px"
              size="small"
              class="search-item"
              disabled
            >
              <template slot="prepend">
                判题状态：
                <i class="el-icon-arrow-down"></i>
              </template>
            </el-input>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="7">Accepted</el-dropdown-item>
              <el-dropdown-item command="9">Wrong Answer</el-dropdown-item>
              <el-dropdown-item command="8">Presentation Error</el-dropdown-item>
              <el-dropdown-item command="14">Compilation Error</el-dropdown-item>
              <el-dropdown-item command="13">Runtime Error</el-dropdown-item>
              <el-dropdown-item command="10">Time Limit Exceeded</el-dropdown-item>
              <el-dropdown-item command="11">Memory Limit Exceeded</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-input
            placeholder="题号"
            v-model="problemId"
            maxlength="100px"
            size="small"
            class="search-item"
          >
            <template slot="prepend">题号：</template>
          </el-input>
        </div>
        <div>
          <el-dropdown size="small" @command="handleLangCommand">
            <el-input
              placeholder="语言"
              v-model="languageText"
              maxlength="60px"
              size="small"
              class="search-item"
              disabled
            >
              <template slot="prepend">
                语言：
                <i class="el-icon-arrow-down"></i>
              </template>
            </el-input>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">C++</el-dropdown-item>
              <el-dropdown-item command="2">JAVA</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-input
            placeholder="提交人"
            v-model="creator"
            maxlength="100px"
            size="small"
            class="search-item"
          >
            <template slot="prepend">提交人：</template>
          </el-input>
        </div>
        <div>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            class="search-item"
            @click="searchData"
          >搜索</el-button>
        </div>
      </div>
    </el-card>
    <div>
      <el-table :data="submissions" style="width: 100%" v-loading="loading">
        <el-table-column prop="submission_id" label="提交ID" align="center" width="100"></el-table-column>
        <el-table-column prop="submit_time" label="提交时间" align="center"></el-table-column>
        <el-table-column label="判题状态" align="center">
          <template slot-scope="scope">{{scope.row.result.text}}</template>
        </el-table-column>
        <el-table-column label="题号" align="center" width="100">
          <template slot-scope="scope">
            <router-link :to="'/problem/' + scope.row.problem_id">
              {{
              scope.row.problem_id
              }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="time_cost" align="center" label="时间消耗" width="100"></el-table-column>
        <el-table-column prop="memory_cost" align="center" label="空间消耗" width="100"></el-table-column>
        <el-table-column prop="language.text" align="center" label="语言" width="100"></el-table-column>
        <el-table-column prop="username" align="center" label="提交者" width="100"></el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top: 30px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
import { submissionList } from '@/api/submission.js'
export default {
  created() {
    EventBus.$emit("change-route", "/status")
    EventBus.$emit("change-title", "记录列表")
    this.fetchData()
  },
  computed: {
    statusText: function () {
      switch (this.status) {
        case "7":
          return 'Accepted'
        case "9":
          return 'Wrong Answer'
        case "8":
          return 'Presentation Error'
        case "14":
          return 'Compilation Error'
        case "13":
          return 'Runtime Error'
        case "10":
          return 'Time Limit Exceeded'
        case "11":
          return 'Memory Limit Exceeded'
        default:
          return '全部状态'
      }
    },
    languageText: function () {
      switch (this.language) {
        case "1":
          return 'C++'
        case "2":
          return 'JAVA'
        default:
          return '全部语言'
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      problemId: this.$route.query.problem_id,
      creator: this.$route.query.creator,
      status: this.$route.query.status,
      language: this.$route.query.language,
      loading: false,
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
  },
  watch: {
    '$route'() {
      this.fetchData()
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleStatusCommand(command) {
      this.status = command
    },
    handleLangCommand(command) {
      this.language = command
    },
    searchData() {
      this.$router.push({
        path: '/status',
        query: {
          problem_id: this.problemId,
          creator: this.creator,
          status: this.status,
          language: this.language,
        }
      })

    },
    fetchData() {
      let data = {}
      data['username'] = this.creator
      data['problem_id'] = this.problemId
      data['status'] = this.status
      data['language'] = this.language
      data['page_size'] = this.pageSize
      data['page_no'] = this.currentPage
      console.log("data:", data)
      this.loading = true
      submissionList(data).
        then(res => {
          this.submissions = res.data.submissions
          this.totalCount = res.data.page_info.total_count
          this.loading = false
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '获取信息失败，请刷新重试'
          })
          this.submissions = []
          this.loading = false
          console.log("status error:", err.response)
        })
    }
  }
}
</script>

<style>
.box-card {
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

.search-area {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>