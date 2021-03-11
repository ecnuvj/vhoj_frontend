<template>
  <div>
    <div>题目：{{ problem_id }}</div>
    <el-card class="info-card">
      <div class="info-block">
        <div class="info-title">题目描述：</div>
        <div class="info-content"></div>
      </div>
      <div class="info-block">
        <div class="info-title">输入：</div>
        <div class="info-content"></div>
      </div>
      <div class="info-block">
        <div class="info-title">输出：</div>
        <div class="info-content"></div>
      </div>
      <div class="info-block">
        <div class="info-title">样例输入：</div>
        <div></div>
      </div>
      <div class="info-block">
        <div class="info-title">样例输出：</div>
        <div class="info-content"></div>
      </div>
      <div class="info-block">
        <div class="info-title">来源：</div>
        <div class="info-content"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  name: "ProblemInfo",
  props: ['problem_id'],
  created() {
    EventBus.$emit("change-route", "/problem")
  }
}
</script>