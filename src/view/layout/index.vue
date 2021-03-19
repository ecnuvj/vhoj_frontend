<template>
  <div class="layoutConatiner">
    <el-container class="layout">
      <el-aside width="auto">
        <MyAside />
      </el-aside>
      <el-container>
        <el-header class="header" height="100px">
          <MyHeader :user="user" @show-form="showForm" @update-user="getUserInfo" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="注册信息" :visible.sync="showRegisterForm" width="40%">
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerRules"
        ref="registerForm"
        label-width="80px"
        class="demo-registerForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="registerForm.school"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="registerLoading" @click="submitForm('registerForm')">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </div>
    </el-dialog>
    <el-dialog title="登录" :visible.sync="showLoginForm" width="40%">
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="loginForm">
        <el-form-item label="账号" prop="username" :label-width="labelWidth">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :label-width="labelWidth">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="loginLoading" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyAside from "./components/aside";
import MyHeader from "./components/header";
import EventBus from "@/EventBus.js";
import { login, register } from "@/api/user.js";
export default {
  name: "Layout",
  data() {
    //callback必须调用！
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        pass: "",
        checkPass: "",
        username: "",
        email: "",
        school: "",
      },
      registerRules: {
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{6,}$/,
            message: "密码长度至少为6位，只可包含数字字母",
          },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
          {
            pattern: /^[0-9a-zA-Z]{1,20}$/,
            message: "账号只可包含数字字母，且不得大于20位",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱地址",
          },
        ],
        school: [],
      },
      loginForm: {
        username: "",
        pass: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "change" },
          {
            pattern: /^[0-9a-zA-Z]{0,20}$/,
            message: "账号只可包含数字字母，且不得大于20位",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            pattern: /^[0-9a-zA-Z]{6,}$/,
            message: "密码长度至少为6位，只可包含数字字母",
          },
        ],
      },
      user: null,
      showLoginForm: false,
      showRegisterForm: false,
      labelWidth: "80px",
      loginLoading: false,
      registerLoading: false,
    };
  },
  created() {
    EventBus.$on("check-user", () => {
      this.getUserInfo()
    })
    EventBus.$on("user-login", () => {
      this.showLoginForm = true
    })
    this.getUserInfo()
  },
  components: {
    MyAside,
    MyHeader,
  },
  methods: {
    login() {
      this.loginLoading = true;
      let data = {};
      data["username"] = this.loginForm.username;
      data["password"] = this.loginForm.pass;
      login(data)
        .then((res) => {
          console.log(res);
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          this.getUserInfo();
          this.loginLoading = false;
          this.closeForm();
          this.$message({
            type: "success",
            message: "登录成功",
          });
        })
        .catch((err) => {
          this.loginLoading = false;
          this.$message.error("用户名或密码错误");
          console.log(err.response);
          console.log("login error:", err);
        });
    },
    register() {
      this.registerLoading = true;
      let data = {};
      let user = {};
      user["username"] = this.registerForm.username;
      user["password"] = this.registerForm.pass;
      user["email"] = this.registerForm.email;
      user["school"] = this.registerForm.school;
      data["user"] = user;
      register(data)
        .then((res) => {
          console.log(res);

          this.closeForm();
          this.showForm("login");
          this.$message({
            type: "success",
            message: "注册成功，请登录",
          });
          this.loginForm.username = this.registerForm.username;
          this.loginForm.pass = this.registerForm.pass;
          this.registerLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
          this.$message.error("注册失败，账户名已存在");
          this.registerLoading = false;
        });
    },
    getUserInfo() {
      var u = window.localStorage.getItem("user");
      if (u == null || u === undefined) {
        this.user = null;
      } else {
        try {
          this.user = JSON.parse(u);
        } catch (err) {
          console.log("local storage error:", err);
          this.user = null;
          window.localStorage.removeItem("user");
        }
      }
    },
    showForm(type) {
      if (type == "login") {
        this.showLoginForm = true;
      }
      if (type == "register") {
        this.showRegisterForm = true;
      }
    },
    closeForm() {
      this.showLoginForm = false;
      this.showRegisterForm = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName == "loginForm") {
            this.login();
          }
          if (formName == "registerForm") {
            this.register();
          }
          //   this.closeForm();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
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
  background-color: #ffffff;
  color: #333;
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
