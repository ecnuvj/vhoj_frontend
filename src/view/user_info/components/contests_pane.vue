<template>
  <div>
    <el-button type="primary" @click="createContest">创建比赛</el-button>
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
          <router-link :to="'/contest/back/' + scope.row.contest_id">
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
    <el-dialog title="创建比赛" :visible.sync="dialogFormVisible">
      <div class="title">基本信息:</div>
      <el-form ref="contestForm" status-icon :model="contest" label-width="80px">
        <el-form-item
          label="比赛名称"
          prop="title"
          :rules="{required:true,message:'请输入比赛名称',trigger:'blur'}"
        >
          <el-input v-model="contest.title"></el-input>
        </el-form-item>
        <el-form-item label="比赛描述">
          <el-input type="textarea" v-model="contest.description"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" prop="time" :rules="timeRule">
          <div class="block">
            <el-date-picker
              v-model="contest.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            ></el-date-picker>
          </div>
        </el-form-item>
        <div class="title">题目集：</div>
        <el-form-item
          v-for="(problem, index) in contest.problems"
          :label="'题目' + problem.problem_order"
          :prop="'problems.' + index"
          :key="index"
          :rules="rule"
        >
          <el-input v-model="problem.problem_id" style="width:30%" placeholder="请输入题号">
            <template slot="prepend">题号</template>
          </el-input>
          <el-input v-model="problem.title" style="width:40%" disabled>
            <template slot="prepend">标题</template>
          </el-input>
          <el-button @click.prevent="removeProblem(index)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addProblem">新增题目</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('contestForm')" :loading="createLoading">立即创建</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { problemList } from '@/api/problem.js'
import { contestCreate, contestUser } from '@/api/contest.js'
export default {
  name: 'ContestsPane',
  created() {
    this.fetchData()
  },
  data() {
    var checkProblem = (rule, value, callback) => {
      console.log(value)
      if (value.problem_id === '') {
        callback(new Error('请输入题号'))
        return
      }
      let data = {}
      data['problem_id'] = value.problem_id
      data['page_no'] = 1
      data['page_size'] = 1
      problemList(data).then(res => {
        if (res.data.problems.length == 0) {
          callback(new Error('暂无此题'))
        } else {
          value.title = res.data.problems[0].title
          callback()
        }
      }).catch(err => {
        callback(new Error('暂无此题'))
      })
    };
    var checkTime = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入比赛时间'))
      } else {
        if (value[0].getTime() < new Date().getTime()) {
          callback(new Error('比赛时间不得早于当前时间'))
        }
        callback()
      }
    }
    return {
      contests: [],
      loading: false,
      createLoading: false,
      dialogFormVisible: false,
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      rule: [
        { required: true, message: '题号不能为空', trigger: 'blur' },
        { validator: checkProblem, trigger: 'blur' },
      ],
      timeRule: [
        { required: true, validator: checkTime, trigger: 'blur' }
      ],
      contest: {
        name: '',
        description: '',
        time: [],
        problems: [
          {
            problem_order: 'A',
            problem_id: '',
            title: '',
          }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.fetchData()
    },
    fetchData() {
      let data = {}
      data['page_no'] = this.currentPage
      data['page_size'] = this.pageSize
      this.loading = true
      contestUser(data).then(res => {
        this.contests = res.data.contests
        this.totalCount = res.data.page_info.total_count
        this.loading = false
      }).catch(err => {
        this.$message.error('获取数据失败，请刷新重试')
        this.loading = false
      })
    },
    submitForm(formName) {
      console.log("contest:", this.contest)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createLoading = true
          let data = {}
          data = this.contest
          data['start_time'] = this.contest.time[0].getTime() / 1000
          data['end_time'] = this.contest.time[1].getTime() / 1000
          contestCreate(data).then(res => {
            this.contests.push(res.data.contest)
            this.createLoading = false
            this.dialogFormVisible = false
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '创建失败，请重试'
            })
            this.createLoading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeProblem(index) {
      let len = this.contest.problems.length
      if (len == 1) {
        return
      }
      this.contest.problems.splice(index, 1)
      len--
      for (let i = index; i < len; i++) {
        let order = this.contest.problems[i].problem_order
        this.contest.problems[i].problem_order = String.fromCharCode(order.charCodeAt() - 1)
      }
    },
    addProblem() {
      let len = this.contest.problems.length
      let order = 'A'
      if (len != 0) {
        let tmpOrder = this.contest.problems[len - 1].problem_order
        order = String.fromCharCode(tmpOrder.charCodeAt() + 1)
      }

      this.contest.problems.push({
        problem_order: order,
        problem_id: '',
        title: '',
      })
    },
    timeFormat(row, column, cellValue) {
      var t = new Date(cellValue)
      return t.toLocaleString()
    },
    handleSelect(item) {
      console.log(item)
    },
    createContest() {
      this.dialogFormVisible = true
    },
    querySearchAsync(queryString, cb) {
      //console.log(queryString)
      if (typeof queryString == "undefined" || queryString == null || queryString == "") {
        cb([])
        return
      }
      let data = {}
      data['title'] = queryString
      data['page_no'] = 1
      data['page_size'] = 5
      var result = []
      problemList(data).then((res) => {
        result = res.data.problems.map(item => {
          return { value: item.title }
        })
        cb(result)
      }).catch((err) => {
        cb([{ value: '暂无此题' }])
      });
    },
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bolder;
}
</style>