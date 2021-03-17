<template>
  <div class="users-pane">
    <el-table :data="users" style="width: 100%" v-loading="loading">
      <el-table-column label="用户ID" prop="user_id" width="100" align="center"></el-table-column>
      <el-table-column label="账号" prop="username" width="100" align="center"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="300" align="center"></el-table-column>
      <el-table-column label="学校" prop="school" width="150" align="center"></el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="scope">
          <el-tag
            :key="role.role_id"
            v-for="role in scope.row.roles"
            closable
            size="mini"
            :type="role.role_name === 'admin' ? 'danger' : 'primary'"
            @close="handleCloseTag(scope.row,role)"
          >{{role.role_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入账号搜索" />
        </template>
        <template slot-scope="scope">
          <el-dropdown size="mini" type="primary" @command="handleCommand">
            <el-button type="primary" size="mini">
              授权
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :key="role.role_id"
                v-for="role in roles"
                :command="{
                    'role':role,
                    'index':scope.$index
                    }"
              >{{role.role_name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { userList, roleList, authUser, deleteUser } from '@/api/user.js'
export default {
  created() {
    this.fetchData()
    this.fetchRoleList()
  },
  watch: {
    currentPage: function () {
      this.fetchData()
    },
    pageSize: function () {
      this.fetchData()
    },
    totalCount: function () {
      this.fetchData()
    }
  },
  data() {
    return {
      search: '',
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false,
      authLoading: false,
      roles: [],
      users: [],
    }
  },
  methods: {
    handleCloseTag(user, role) {
      this.$confirm(`将撤销用户${user.username}的${role.role_name}权限，是否继续？`, '撤销', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.authLoading = true
        let data = {}
        data["user_id"] = user.user_id
        data["roles"] = JSON.parse(JSON.stringify(user.roles))
        let i
        for (i = 0; i < data["roles"].length; ++i) {
          if (role.role_id == data["roles"][i].role_id) {
            break
          }
        }
        data["roles"].splice(i, 1)
        authUser(data).
          then(() => {
            this.$message({
              type: 'success',
              message: '撤销成功',
            })
            user.roles.splice(i, 1)
            this.authLoading = false
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '撤销失败',
            })
            this.authLoading = false
          })
      }).catch(() => {

      })

    },
    handleDelete(index, row) {
      this.$confirm(`删除用户${row.username}，是否继续？`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {}
        data["user_id"] = row.user_id
        deleteUser(data).
          then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.users.splice(index, 1)
            this.totalCount--
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '删除失败，请重试'
            })
            console.log("delete user error:", err.response)
          })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleAuth() {

    },
    handleCommand(command) {
      console.log("command: ", command)
      this.$confirm(`将授予用户${this.users[command.index].username} ${command.role.role_name}权限，是否继续？`, '授权', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.authLoading = true
        var exist = false
        for (var i = 0; i < this.users[command.index].roles.length; ++i) {
          if (this.users[command.index].roles[i].role_id == command.role.role_id) {
            exist = true
            break
          }
        }
        if (exist == true) {
          this.$message({
            type: 'error',
            message: '该用户已有此权限'
          })
          this.authLoading = false
        } else {
          //   this.$message({
          //     type: 'info',
          //     message: '可授予'
          //   })
          let data = {}
          data["user_id"] = this.users[command.index].user_id
          data["roles"] = JSON.parse(JSON.stringify(this.users[command.index].roles))
          data["roles"].push(command.role)
          let userRoles = this.users[command.index].roles
          authUser(data).
            then(() => {
              this.$message({
                type: 'success',
                message: '授权成功'
              })
              userRoles.push(command.role)
              this.authLoading = false
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '授权失败'
              })
              console.log("users pane auth user:", err.response)
              this.authLoading = false
            })
        }
      })
    },
    fetchData() {
      let data = {}
      this.loading = true
      data['page_no'] = this.currentPage
      data['page_size'] = this.pageSize
      userList(data).then(res => {
        this.loading = false
        this.users = res.data.users
        this.totalCount = res.data.page_info.total_count
      }).catch(err => {
        this.loading = false
        this.users = null
        this.totalCount = 0
        this.$message({
          type: 'error',
          message: '获取数据失败，请重试'
        })
        console.log("users pane fetch data error:", err.response)
      })
    },
    fetchRoleList() {
      let data = {}
      roleList(data).
        then(res => {
          this.roles = res.data.roles
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '获取数据失败，请重试'
          })
          console.log("users pane fetch role list error:", err.response)
        })
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.users-pane {
  padding: 0 1%;
  text-align: center;
}
</style>