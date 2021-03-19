<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>题目列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" id="top-card" body-style="width:800px">
      <div class="search-area">
        <div>查找题目：</div>
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
          <el-input
            placeholder="题目"
            v-model="title"
            maxlength="100px"
            size="small"
            class="search-item"
          >
            <template slot="prepend">题目：</template>
          </el-input>
        </div>
        <div>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            class="search-item"
            @click="fetchData"
          >搜索</el-button>
        </div>
      </div>
    </el-card>
    <div>
      <el-table :data="problems" style="width: 100%" v-loading="loading">
        <el-table-column label="状态" align="center" width="50">
          <template slot-scope="scope">
            <i class="fa fa-close" v-if="scope.row.status == 2" style="color: red"></i>
            <i class="fa fa-check" v-else-if="scope.row.status == 1" style="color: green"></i>
            <i class="fa fa-minus" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="problem_id" label="题号" align="center" width="100" sortable></el-table-column>
        <el-table-column prop="title" label="题目" align="center" sortable>
          <template slot-scope="scope">
            <router-link :to="'/problem/' + scope.row.problem_id">
              {{
              scope.row.title
              }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="通过率" align="center" width="250" :formatter="rate"></el-table-column>
      </el-table>
    </div>
    <div class="block">
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
import { problemList } from '@/api/problem.js'
export default {
  created() {
    EventBus.$emit("change-route", "/problem")
    EventBus.$emit("change-title", "题目列表")
    this.fetchData()
  },
  data() {
    return {
      problemId: '',
      title: '',
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      loading: false,
      problems: [],
    }
  },
  methods: {
    rate(row, column, cellValue, index) {
      var num = parseFloat(row.accepted)
      var total = parseFloat(row.submitted)
      if (isNaN(num) || isNaN(total)) {
        return "-"
      }
      var r = total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%"
      return r + "(" + num + "/" + total + ")"
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      let data = {}
      data['page_no'] = this.currentPage
      data['page_size'] = this.pageSize
      data['title'] = this.title
      data['problem_id'] = this.problemId
      this.loading = true
      problemList(data).
        then(res => {
          this.problems = res.data.problems
          this.totalCount = res.data.page_info.total_count
          this.loading = false
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '获取信息失败，请刷新重试'
          })
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
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
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
.block {
  margin-top: 30px;
}
</style>