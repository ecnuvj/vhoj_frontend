<template>
  <div class="basic-pane">
    <el-form :model="basicForm" status-icon :rules="basicRules" ref="basicForm" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="basicForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="roles">
        <el-tag :key="role" v-for="role in roles" style="margin-right:10px">{{role}}</el-tag>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="basicForm.email"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-input v-model="basicForm.school"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="updateUserInfo" :loading="editLoading">修改</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateUserInfo } from '@/api/user.js'
export default {
  props: ['user'],
  watch: {
    user: function () {
      console.log("basic pane watch user")
      this.resetForm()
    }
  },
  created() {
    this.resetForm()
  },
  data() {
    return {
      editLoading: false,
      roles: [],
      basicForm: {
        username: '',
        email: '',
        school: '',
      },
      basicRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱地址' }
        ]
      },
    }
  },
  methods: {
    resetForm() {
      this.basicForm.username = this.user.username
      this.basicForm.email = this.user.email
      this.basicForm.school = this.user.school
      this.roles = []
      for (var i = 0; i < this.user.roles.length; ++i) {
        this.roles.push(this.transRole(this.user.roles[i].role_name))
      }
    },
    transRole(role) {
      switch (role) {
        case "admin": {
          return "管理员"
        }
        case "creator": {
          return "比赛创建"
        }
        case "generator": {
          return "比赛生成用户"
        }
        case "normal": {
          return "普通用户"
        }
        case "reviewer": {
          return "代码查看"
        }
      }
    },
    updateUserInfo() {
      this.$confirm('修改个人信息, 是否继续?', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.editLoading = true
        let user = this.user
        user.email = this.basicForm.email
        user.school = this.basicForm.school
        let data = {}
        console.log("update user info:", user)
        data["user_id"] = this.user.user_id
        data["user"] = user
        updateUserInfo(data).
          then(res => {
            console.log("basic pane update user res:", res)
            window.localStorage.setItem(
              "user",
              JSON.stringify(res.data.user)
            )
            this.$emit("update-user")
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.editLoading = false
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
            this.editLoading = false
            console.log("basic pane edit fail:", err)
          })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.basic-pane {
  width: 50%;
}
</style>