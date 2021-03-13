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
            <el-button type="info" plain size="small">
              {{ statusText }}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部</el-dropdown-item>
              <el-dropdown-item command="未开始">未开始</el-dropdown-item>
              <el-dropdown-item command="进行中">进行中</el-dropdown-item>
              <el-dropdown-item command="已结束">已结束</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-input
            placeholder="比赛名称"
            v-model="contestName"
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
            v-model="creator"
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
            >搜索</el-button
          >
        </div>
      </div>
    </el-card>
    <div>
      <el-table :data="contests" style="width: 100%">
        <el-table-column label="状态" align="center" width="50">
          <template slot-scope="scope">
            <i class="fa fa-minus" v-if="scope.row.status == 1"></i>
            <i
              class="fa fa-check"
              v-else-if="scope.row.status == 2"
              style="color: green"
            ></i>
            <i class="fa fa-close" v-else style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="比赛名称" align="center">
          <template slot-scope="scope">
            <router-link :to="'/contest/' + scope.row.id">{{
              scope.row.title
            }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="比赛时间"
          align="center"
          width="350"
          :formatter="contestTime"
        >
        </el-table-column>
        <el-table-column
          prop="problem_num"
          label="题数"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column label="创建者" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.creator.name }}</span>
          </template>
        </el-table-column>
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
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/contest")
    EventBus.$emit("change-title", "比赛列表")
  },
  data() {
    return {
      contests: [
        {
          id: 1000,
          title: "first contest",
          problem_num: 12,
          start_time: "2021-03-12 00:00:00",
          end_time: "2021-03-12 05:00:00",
          creator: {
            name: "bqx"
          },
          status: 1
        },
        {
          id: 1030,
          title: "second contest",
          problem_num: 12,
          start_time: "2021-03-12 00:00:00",
          end_time: "2021-03-12 05:00:00",
          creator: {
            name: "bqx"
          },
          status: 2,
        },
        {
          id: 1020,
          title: "third contest",
          problem_num: 12,
          start_time: "2021-03-12 00:00:00",
          end_time: "2021-03-12 05:00:00",
          creator: {
            name: "bqx"
          },
          status: 3,
        },
        {
          id: 1000,
          title: "first contest",
          problem_num: 12,
          start_time: "2021-03-12 00:00:00",
          end_time: "2021-03-12 05:00:00",
          creator: {
            name: "bqx"
          },
          status: 1
        }
      ],
      statusText: "比赛状态",
      contestName: '',
      creator: '',
      pageSize: 5,
      currentPage: 1,
      totalCount: 100,
    }
  },
  methods: {
    contestTime(row, column, cellValue, index) {
      return row.start_time + "~" + row.end_time
    },
    handleCommand(command) {
      this.statusText = command
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>
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
</style>