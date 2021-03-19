<template>
  <div>无权访问！</div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-title", "无权访问")
    this.$message({
      type: 'error',
      message: '无权访问，即将返回首页',
      onClose: function () {
        this.$router.push({
          path: '/home'
        })
      }
    })
  }
}
</script>