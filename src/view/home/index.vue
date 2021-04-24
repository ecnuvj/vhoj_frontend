<template>
  <div class="homeContainer">
    <div class="banner">
      <el-carousel indicator-position="outside" height="80vh" width="100%">
        <el-carousel-item v-for="item in imagesList" :key="item.url">
          <img :src="item.url" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="rightCard">
      <el-card class="box-card calendar">
        <el-calendar v-model="value"></el-calendar>
      </el-card>
      <el-card class="box-card everyday">
        <el-input v-model="input" placeholder="请输入题号" class="problemNumber"></el-input>
        <el-button type="primary" plain>跳转题目</el-button>
        <el-button type="danger" plain>随机一题</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
import EventBus from "@/EventBus.js";
export default {
  created() {
    EventBus.$emit("change-route", "/home");
    EventBus.$emit("change-title", "ecnu virtual online judge");
  },
  data() {
    return {
      imagesList: [
        { url: require("../../assets/1.jpg") },
        { url: require("../../assets/2.jpg") },
        { url: require("../../assets/3.jpg") },
      ],
      options: {},
      input: "",
      value: new Date(),
    };
  },
  components: {},
  methods: {},

  mounted() { },
};
</script>
<style scoped>
.homeContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80vh;
}
.banner {
  width: 68%;
}
.rightCard {
  width: 27%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.calendar {
  height: 60%;
  margin-bottom: 50px;
}

.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 16px 10px 10px 10px;
  height: 7px;
}

.everyday {
  height: 30%;
}
.problemNumber {
  margin: 20px 0;
}
.is-selected {
  color: #1989fa;
}
</style>
