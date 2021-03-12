<template>
  <div class="layoutConatiner">
    <el-container class="layout">
      <el-aside width="auto">
        <MyAside />
      </el-aside>
      <el-container>
        <el-header class="header" height="100px">
          <MyHeader
            :user="user"
            @show-form="showForm"
            @update-user="getUserInfo"
          />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="注册信息" :visible.sync="showRegisterForm">
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerRules"
        ref="registerForm"
        label-width="100px"
        class="demo-registerForm"
      >
        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="registerForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="登录" :visible.sync="showLoginForm">
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="昵称" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="loginForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import MyAside from "./components/aside"
import MyHeader from "./components/header"

export default {
  name: "Layout",
  data() {
    //callback必须调用！
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'));
      }
      callback()
    };
    var loginUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'));
      }
      callback()
    };
    var loginPass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      }
      callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        pass: '',
        checkPass: '',
        username: ''
      },
      registerRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      },
      loginForm: {
        username: '',
        pass: '',
      },
      loginRules: {
        username: [
          { validator: loginUsername, trigger: 'blur' }
        ],
        pass: [
          { validator: loginPass, trigger: 'blur' }
        ]
      },
      user: null,
      showLoginForm: false,
      showRegisterForm: false,
    }
  },
  mounted() {
    window.localStorage.removeItem("user")
    this.getUserInfo()
  },
  components: {
    MyAside,
    MyHeader,
  },
  methods: {
    login() {
      var user = { name: "bqx" }
      window.localStorage.setItem(
        "user",
        JSON.stringify(user)
      )
      this.getUserInfo()
    },
    register() {

    },
    getUserInfo() {
      var u = window.localStorage.getItem("user")
      console.log(u)
      if (u == null) {
        this.user = null
      } else {
        this.user = JSON.parse(u)
      }
    },
    showForm(type) {
      if (type == "login") {
        this.showLoginForm = true
      }
      if (type == "register") {
        this.showRegisterForm = true
      }
    },
    closeForm() {
      this.showLoginForm = false
      this.showRegisterForm = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          if (formName == "loginForm") {
            this.login()
          }
          if (formName == "registerForm") {
            this.register()
          }
          this.closeForm();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.layoutConatiner {
  height: 100%;
  width: 100%;
}
.layout {
  height: calc(100vh);
  width: calc(100vw);
}
.el-header,
.el-footer {
  background-color: #0d366b;
  color: #333;
  text-align: center;
}

.header {
  height: 150px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
