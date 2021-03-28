<template>
  <div>
    <div>
      <el-button @click="open">生成</el-button>
      <download-excel class="export-excel-wrapper" :data="users" :fields="fields" :name="fileName">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button>导出</el-button>
      </download-excel>
    </div>
    <el-table :data="users" v-loading="loading">
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { contestGenerate, contestParticipants } from '@/api/contest.js'
export default {
  props: ['contestId'],
  create() {
    this.fetchData()
  },
  data() {
    return {
      fileName: '比赛' + this.contestId + '参赛用户.xls',
      loading: false,
      users: [],
      fields: {
        "账号": "username",
        "密码": "password"
      }
    }
  },
  methods: {
    fetchData() {
      let data = {}
      data['contest_id'] = Number(this.contestId)
      this.loading = true
      contestParticipants(data).then(res => {
        this.loading = false
        this.users = res.data.users
      }).catch(err => {
        this.loading = false
        this.$message.error("获取数据失败，请刷新重试")
      })
    },
    generate(value) {
      if (value >= 200) {
        this.$message({
          type: 'error',
          message: '数量不能超过200'
        })
        return
      }
      let data = {}
      data['contest_id'] = Number(this.contestId)
      data['generate_count'] = Number(value)
      this.loading = true
      contestGenerate(data).then(res => {
        this.loading = false
        this.users = this.users.concat(res.data.users)
        //this.fetchData()
        this.$message({
          type: 'success',
          message: '生成成功'
        })
      }).catch(err => {
        this.loading = false
        this.$message.error("生成失败")
        console.log(err)
      })
    },
    open() {
      this.$prompt('请输入生成数量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[1-9][0-9]*/
      }).then(({ value }) => {
        this.generate(value)
      }).catch(() => {

      });
    }
  }
}
</script>

<style scoped>
</style>