<template>
  <div class="security-pane">
    <el-form :model="passForm" status-icon :rules="passRules" ref="passForm" label-width="80px">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="passForm.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="passForm.newPass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkNewPass">
        <el-input type="password" v-model="passForm.checkNewPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="updateUserPass" :loading="editLoading">修改</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, updateUserInfo } from '@/api/user.js'
import EventBus from '@/EventBus.js'
export default {
  props: ['user'],
  methods: {
    resetForm() {
      this.$refs["passForm"].resetFields()
    },
    updateUserPass() {
      this.$confirm('修改登录密码, 是否继续?', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.editLoading = true
        if (this.checkOldPass() == true) {
          let data = {}
          let user = this.user
          user.password = this.passForm.newPass
          data["user_id"] = this.user.user_id
          data["user"] = user
          updateUserInfo(data).
            then(res => {
              this.editLoading = false
              var that = this
              this.$message({
                type: 'success',
                message: '修改成功，请重新登录',
                onClose: function () {
                  window.localStorage.removeItem("user")
                  EventBus.$emit("check-user")
                  that.$router.push({ name: 'home' })
                }
              })
            }).catch(err => {
              this.$message({
                type: 'error',
                message: '修改失败，请重试'
              })
            })
        } else {
          this.editLoading = false
          this.$message({
            type: 'error',
            message: '密码错误'
          })
        }
      }).catch(() => {

      })

    },
    checkOldPass() {
      let data = {}
      data["username"] = this.user.username
      data["password"] = this.passForm.oldPass
      var ok = true
      login(data).
        then(res => {
          ok = true
        }).catch(err => {
          ok = false
        })
      return ok
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passForm.checkNewPass !== '') {
          this.$refs.passForm.validateField('checkNewPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      editLoading: false,
      passForm: {
        oldPass: '',
        newPass: '',
        checkNewPass: '',
      },
      passRules: {
        oldPass: [
          { required: true, message: "请输入旧密码" }
        ],
        newPass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z]{6,}$/, message: '密码长度至少为6位，只可包含数字字母' }
        ],
        checkNewPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  }
}
</script>

<style scoped>
.security-pane {
  width: 50%;
}
</style>