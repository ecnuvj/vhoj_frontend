<template>
  <div>
    <div>
      <el-form :inline="true" :model="crawl" class="demo-form-inline">
        <el-form-item label="来源OJ">
          <el-select v-model="crawl.oj" placeholder="来源OJ">
            <el-option label="POJ" :value="1"></el-option>
            <el-option label="HDU" :value="2"></el-option>
            <el-option label="JSK" :value="25"></el-option>
            <el-option label="MXT" :value="26"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题号">
          <el-input v-model="crawl.problem_id" placeholder="题号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onCrawl" :loading="crawling">爬取</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="problems"
      style="width: 100%"
      class="contest-list"
      :default-sort="{ prop: 'updated_at', order: 'descending' }"
      v-loading="loading"
    >
      <el-table-column prop="raw_problem_id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="题目名称" align="center"></el-table-column>
      <el-table-column label="来源OJ" align="center" prop="remote_oj"></el-table-column>
      <el-table-column prop="remote_problem_id" label="远程OJ题号" align="center"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间" align="center" :formatter="timeFormat"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="goToProblem(scope.row)">跳转题目</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
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
import { problemRawList, problemCrawl, queryCrawl } from '@/api/problem'
export default {
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      crawl: {
        oj: "",
        problem_id: "",
      },
      problems: [],
      loading: false,
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      crawling: false,
    }
  },
  methods: {
    onCrawl() {
      let data = {
        remote_oj: this.crawl.oj,
        remote_problem_id: this.crawl.problem_id
      }
      this.crawling = true
      problemCrawl(data).then(res => {
        console.log("crawl========", res)
        this.crawling = false
        let instance = this.$loading({
          fullscreen: true,
          text: '正在爬取中',
          lock: true,
        })
        let finished = false
        let rawId = res.data.raw_problem_id
        let query = setInterval(() => {
          if (finished == true) {
            instance.close()
            clearInterval(query)
          }
          queryCrawl({ rawId: rawId }).then(res => {
            if (finished == true) {
              return
            }
            if (res.data.status == 2) {
              finished = true
              instance.close()
              this.$message.success("爬取成功")
              this.fetchData()
            } else if (res.data.status == 3) {
              finished = true
              instance.close()
              this.$message.error("爬取失败，题目不存在")
            }
          }).catch(err => {
            finished = true
            console.log("query crawl err=======", err)
          })
        }, 1000)
      }).catch(err => {
        this.$message.error("发送爬取请求失败")
        this.crawling = false
      })
    },
    goToProblem(row) {
      this.$router.push({
        path: '/problem/' + row.problem_id
      })
    },
    timeFormat(row, column, cellValue) {
      var t = new Date(cellValue)
      return t.toLocaleString()
    },
    fetchData() {
      let data = {
        page_no: this.currentPage,
        page_size: this.pageSize
      }
      this.loading = true
      problemRawList(data).then((result) => {
        this.problems = result.data.raw_problems
        this.totalCount = result.data.page_info.total_count
        this.loading = false
      }).catch((err) => {
        this.$message.error("获取数据失败")
        this.loading = false
        console.log("err: ", err)
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
  }
}
</script>

<style scoped>
.page {
  margin-top: 30px;
  float: right;
}
</style>