<template>
  <div>
    <!-- 比赛说明 -->
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="info-card" body-style="width:90%">
          <div class="info-block">
            <div class="info-title">比赛说明：</div>
            <p class="info-content">{{ contest.description }}</p>
            <div class="info-title">为什么我的程序过了样例却没有得100分？</div>
            <p
              class="info-content"
            >在试题中，样例只是满足问题描述的一组可能的输入和与其对应的输出。程序对于样例运行正确只表示在这一种情况下是正确的，可能在更复杂的情况下是错误的。在评测的时候，评测系统会使用多种不同的输入对程序进行评测，只有通过了所有的数据才会认为程序是正确的。</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin-bottom: 30px">
          <div class="right-block">
            <div class="block-row">
              <span>比赛编号</span>
              <span>{{ contest.contest_id }}</span>
            </div>
            <div class="block-row">
              <span>创建者</span>
              <span>{{ contest.creator.username }}</span>
            </div>
            <div class="block-row">
              <span>开始时间</span>
              <span>{{ contest.start_time }}</span>
            </div>
            <div class="block-row">
              <span>结束时间</span>
              <span>{{ contest.end_time }}</span>
            </div>
            <div class="block-row">
              <span>比赛时长</span>
              <span>{{ time_last }}</span>
            </div>
          </div>
        </el-card>
        <el-card>
          <div v-if="contest.status == 1" class="counter">
            <time-counter :endTime="contest.start_time" @time-end="reload"></time-counter>
            <el-button type="success">加入比赛</el-button>
          </div>
          <div v-else-if="contest.status == 2" class="status-block">
            <span>比赛进行中</span>
          </div>
          <div v-else class="status-block">
            <span>比赛已结束</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TimeCounter from "./time_counter";
export default {
  components: {
    TimeCounter,
  },
  props: ["contest"],

  methods: {
    reload() {
      this.$alert("", "比赛已经开始了", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$router.go(0);
        },
      });
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    },
  },
  computed: {
    time_last: function () {
      var ret = "";
      let st = new Date(this.contest.start_time);
      let et = new Date(this.contest.end_time);
      let leftTime = parseInt((et.getTime() - st.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      if (d > 0) {
        ret += `${d}天`;
      }
      let h = parseInt((leftTime / (60 * 60)) % 24);
      if (h > 0) {
        ret += `${h}小时`;
      }
      let m = parseInt((leftTime / 60) % 60);
      if (m > 0) {
        ret += `${m}分`;
      }
      let s = parseInt(leftTime % 60);
      if (s > 0) {
        ret += `${s}秒`;
      }
      return ret;
    },
  },
};
</script>


<style scoped>
/* p {
  text-indent: 2em;
} */
.info-title {
  padding-top: 20px;
  font-size: 18px;
  color: #313131;
  line-height: 55px;
}
.info-content {
  font-size: 15px;
  color: #666;
  line-height: 24px;
  padding-bottom: 40px;
}
.right-block {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
}
.block-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
}
.counter {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 120px;
  font-size: 20px;
}
.status-block {
  height: 90px;
  color: crimson;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
