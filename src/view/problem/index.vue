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
            v-model="input1"
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
            v-model="input2"
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
            >搜索</el-button
          >
        </div>
      </div>
    </el-card>
    <div>
      <el-table :data="problems" style="width: 100%">
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
        <el-table-column
          prop="id"
          label="题号"
          align="center"
          width="100"
          sortable
        >
        </el-table-column>
        <el-table-column prop="title" label="题目" align="center" sortable>
          <template slot-scope="scope">
            <router-link :to="'/problem/' + scope.row.id">{{
              scope.row.title
            }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="通过率"
          align="center"
          width="250"
          :formatter="rate"
        >
        </el-table-column>
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
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/problem")
    EventBus.$emit("change-title", "题目列表")
  },
  data() {
    return {
      input1: '',
      input2: '',
      pageSize: 10,
      currentPage: 1,
      totalCount: 100,
      problems: [
        {
          status: 1,
          id: 1000,
          title: 'aaaaaaaaaaaaaaaaaa',
          submitted: 100000,
          accepted: 50090
        },
        {
          status: 2,
          id: 1005,
          title: 'aaaagggaaaaaaaaaaaa',
          submitted: 100000,
          accepted: 57000
        },
        {
          status: 1,
          id: 1008,
          title: 'aaaaaaalllaaaaaaaa',
          submitted: 100000,
          accepted: 578
        },
        {
          status: 3,
          id: 1011,
          title: 'aaaaaaaaaaaajjkjaa',
          submitted: 100000,
          accepted: 987
        }
      ]
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
    },
    handleCurrentChange(val) {
      this.currentPage = val
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