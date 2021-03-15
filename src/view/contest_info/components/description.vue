<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="info-card" body-style="width:90%">
          <div class="info-block">
            <div class="info-title">比赛说明：</div>
            <div class="info-content">{{ contest.description }}</div>
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
              <span>{{ contest.creator.name }}</span>
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
            <time-counter
              :endTime="contest.start_time"
              @time-end="reload"
            ></time-counter>
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
import TimeCounter from './time_counter'
export default {
  components: {
    TimeCounter
  },
  props: ['contest'],
  methods: {
    reload() {
      this.$alert('', '比赛已经开始了', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.go(0)
        }
      })
    },
    formate(time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    }
  },
  computed: {
    time_last: function () {
      var ret = ''
      let st = new Date(this.contest.start_time)
      let et = new Date(this.contest.end_time)
      let leftTime = parseInt((et.getTime() - st.getTime()) / 1000)
      let d = parseInt(leftTime / (24 * 60 * 60))
      if (d > 0) {
        ret += `${d}天`
      }
      let h = parseInt(leftTime / (60 * 60) % 24)
      if (h > 0) {
        ret += `${h}小时`
      }
      let m = parseInt(leftTime / 60 % 60)
      if (m > 0) {
        ret += `${m}分`
      }
      let s = parseInt(leftTime % 60)
      if (s > 0) {
        ret += `${s}秒`
      }
      return ret
    }
  }
}
</script>


<style scoped>
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
  height: 150px;
  font-size: 20px;
}
.status-block {
  height: 100px;
  color: crimson;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>