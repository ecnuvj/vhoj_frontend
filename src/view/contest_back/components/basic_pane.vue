<template>
  <div>
    <el-form ref="basicForm" status-icon :model="basicForm" label-width="80px">
      <el-form-item
        label="比赛名称"
        prop="title"
        :rules="{required:true,message:'请输入比赛名称',trigger:'blur'}"
      >
        <el-input v-model="basicForm.title"></el-input>
      </el-form-item>
      <el-form-item label="比赛描述">
        <el-input type="textarea" v-model="basicForm.description"></el-input>
      </el-form-item>
      <el-form-item label="比赛时间" prop="time" :rules="timeRule">
        <div class="block">
          <el-date-picker
            v-model="basicForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">修改</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { contestUpdate } from '@/api/contest.js'
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
  data() {
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
      basicForm: {
        title: '',
        description: '',
        time: []
      },
      timeRule: [
        { required: true, validator: checkTime, trigger: 'blur' }
      ],
      editLoading: false,
    }
  },
  methods: {
    resetForm() {
      this.basicForm.title = this.contest.title
      this.basicForm.description = this.contest.description
      this.basicForm.time = [new Date(this.contest.start_time), new Date(this.contest.end_time)]
    },
    submitForm() {
      this.$refs['basicForm'].validate((valid) => {
        if (valid) {
          this.editLoading = true
          let data = {}
          data['start_time'] = this.basicForm.time[0].getTime() / 1000
          data['end_time'] = this.basicForm.time[1].getTime() / 1000
          data['title'] = this.basicForm.title
          data['description'] = this.basicForm.description
          data['contest_id'] = this.contest.contest_id
          contestUpdate(data).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$emit("update-contest")
            this.editLoading = false
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '创建失败，请重试'
            })
            this.editLoading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
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