<template>
  <div>
    <el-form ref="problemsForm" status-icon :model="problemsForm">
      <el-form-item
        v-for="(problem, index) in problemsForm.problems"
        :label="'题目' + problem.problem_order"
        :prop="'problems.'+index"
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
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { contestProblemsUpdate } from '@/api/contest.js'
import { problemList } from '@/api/problem.js'
export default {
  props: ['contest'],
  watch: {
    contest: function () {
      this.resetForm()
    }
  },
  created() {
    this.resetForm()
  },
  methods: {
    submitForm() {
      this.$refs['problemsForm'].validate((valid) => {
        if (valid) {
          this.editLoading = true
          let data = {}
          data['contest_id'] = this.contest.contest_id
          data['problems'] = this.problemsForm.problems
          contestProblemsUpdate(data).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$emit("update-contest")
            this.editLoading = false
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '修改失败，请重试'
            })
            this.editLoading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm() {
      this.problemsForm.problems = JSON.parse(JSON.stringify(this.contest.problems))
    },
    removeProblem(index) {
      let len = this.problemsForm.problems.length
      if (len == 1) {
        return
      }
      this.problemsForm.problems.splice(index, 1)
      len--
      for (let i = index; i < len; i++) {
        let order = this.problemsForm.problems[i].problem_order
        this.problemsForm.problems[i].problem_order = String.fromCharCode(order.charCodeAt() - 1)
      }
    },
    addProblem() {
      let len = this.problemsForm.problems.length
      let order = 'A'
      if (len != 0) {
        let tmpOrder = this.problemsForm.problems[len - 1].problem_order
        order = String.fromCharCode(tmpOrder.charCodeAt() + 1)
      }

      this.problemsForm.problems.push({
        problem_order: order,
        problem_id: '',
        title: '',
      })
    },
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
    return {
      rule: [
        { required: true, message: '题号不能为空', trigger: 'blur' },
        { validator: checkProblem, trigger: 'blur' },
      ],
      problemsForm: {
        problems: []
      }
    }
  }
}
</script>
