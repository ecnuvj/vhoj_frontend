<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    Date.prototype.toLocaleString = function () {   // 重写日期函数格式化日期
      return `${this.getFullYear()}-${this.getMonth() + 1 >= 10 ? (this.getMonth() + 1) : '0' + (this.getMonth() + 1)}-${this.getDate() >= 10 ? this.getDate() : '0' + this.getDate()} ${this.getHours() >= 10 ? this.getHours() : '0' + this.getHours()}:${this.getMinutes() >= 10 ? this.getMinutes() : '0' + this.getMinutes()}:${this.getSeconds() >= 10 ? this.getSeconds() : '0' + this.getSeconds()}`;
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
}
</style>
