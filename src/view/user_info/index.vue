<template>
  <div>
    <div class="title">
      <div class="avatar">
        <el-avatar
          :size="120"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </div>
      <div class="username">
        <span>{{user.username}}</span>
      </div>
    </div>
    <div class="tabs-panes">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="basic">
          <BasicPane :user="user" @update-user="getUserInfo"></BasicPane>
        </el-tab-pane>
        <el-tab-pane label="安全设置" name="security">
          <SecurityPane :user="user"></SecurityPane>
        </el-tab-pane>
        <el-tab-pane v-if="checkRole('creator')" label="比赛管理" name="contest">比赛管理</el-tab-pane>
        <el-tab-pane v-if="checkRole('admin')" label="用户管理" name="users">
          <UsersPane></UsersPane>
        </el-tab-pane>
        <el-tab-pane v-if="checkRole('admin')" label="题目管理" name="problems">题目管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api/user.js'
import EventBus from '@/EventBus.js'
import BasicPane from './components/basic_pane'
import SecurityPane from './components/security_pane'
import UsersPane from './components/users_pane'
export default {
  components: { BasicPane, SecurityPane, UsersPane },
  created() {
    EventBus.$emit("change-route", "/user/info")
    EventBus.$emit("change-title", "个人中心")
    this.getUserInfo()
  },
  data() {

    return {
      user: {},
      activeName: 'basic',

    }
  },
  methods: {
    checkRole(role) {
      for (var i = 0; i < this.user.roles.length; i++) {
        if (this.user.roles[i].role_name == role) {
          return true
        }
      }
      return false
    },
    handleClick(tab, event) {

    },

    getUserInfo() {
      try {
        let user = JSON.parse(window.localStorage.getItem("user"))
        if (user) {
          this.user = user
          let data = {}
          userInfo(data).
            then(res => {
              this.user = res.data.user
              window.localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
              )
              console.log("user info:", res)
            }).catch(err => {
              console.log(err.response)
              this.$message({
                type: 'error',
                message: '获取信息失败，请刷新重试'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请先登录'
          })
          this.$router.push({
            name: 'home'
          })
        }
      } catch (err) {
        window.localStorage.removeItem("user")
        this.$message({
          type: 'error',
          message: '请先登录'
        })
        this.$router.push({
          name: 'home'
        })
      }
    },
  }
}
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
}
.avatar {
  margin: 0 20px;
}
.username {
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  font-weight: bolder;
}

.tabs-panes {
  margin: 30px;
}
</style>