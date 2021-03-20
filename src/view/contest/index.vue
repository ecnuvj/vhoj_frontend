<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>比赛列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" id="top-card" body-style="width:100%">
      <div class="search-area">
        <div>
          <el-dropdown size="small" @command="handleCommand">
            <el-button type="primary" plain size="small">
              {{ statusText }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{'text':'全部','code':0}">全部</el-dropdown-item>
              <el-dropdown-item :command="{'text':'未开始','code':1}">未开始</el-dropdown-item>
              <el-dropdown-item :command="{'text':'进行中','code':2}">进行中</el-dropdown-item>
              <el-dropdown-item :command="{'text':'已结束','code':3}">已结束</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-input
            placeholder="比赛名称"
            v-model="searchCondition.title"
            maxlength="100px"
            size="small"
            class="search-item"
          >
            <template slot="prepend">比赛名称：</template>
          </el-input>
        </div>
        <div>
          <el-input
            placeholder="创建者"
            v-model="searchCondition.creator_name"
            maxlength="100px"
            size="small"
            class="search-item"
          >
            <template slot="prepend">创建者：</template>
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
      <el-table
        :data="contests"
        style="width: 100%"
        class="contest-list"
        :default-sort="{ prop: 'date', order: 'descending' }"
        v-loading="loading"
      >
        <el-table-column label="状态" align="center" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">未开始</span>
            <span v-else-if="scope.row.status == 2" style="color: green">进行中</span>
            <span v-else style="color: red">已结束</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="比赛名称" align="center" width="200">
          <template slot-scope="scope">
            <router-link :to="'/contest/' + scope.row.contest_id">
              {{
              scope.row.title
              }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          align="left"
          sortable
          prop="start_time"
          width="200"
          :formatter="timeFormat"
        ></el-table-column>
        <el-table-column label="结束时间" align="left" sortable prop="end_time" :formatter="timeFormat"></el-table-column>
        <el-table-column prop="problem_count" label="题数" align="center" width="100"></el-table-column>
        <el-table-column label="创建者" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.creator.username }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top: 30px; float: right">
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
import EventBus from "@/EventBus.js";
import { contestList } from "@/api/contest.js"
export default {
  created() {
    EventBus.$emit("change-route", "/contest");
    EventBus.$emit("change-title", "比赛列表");
    this.fetchData()
  },
  data() {
    return {
      contests: [],
      statusText: "比赛状态",
      loading: false,
      pageSize: 5,
      currentPage: 1,
      totalCount: 0,
      searchCondition: {
        status: 0,
        title: '',
        creator_name: '',
      }
    };
  },
  methods: {
    timeFormat(row, column, cellValue) {
      var t = new Date(cellValue)
      return t.toLocaleString()
    },
    handleCommand(command) {
      this.statusText = command.text;
      this.searchCondition.status = command.code
      console.log(command)
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData()
    },
    fetchData() {
      let data = {}
      data['search_condition'] = this.searchCondition
      data['page_no'] = this.currentPage
      data['page_size'] = this.pageSize
      this.loading = true
      contestList(data).then(res => {
        this.contests = res.data.contests
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
  },
};
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

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
.contest-list {
  padding: 0 20px;
}
</style>
