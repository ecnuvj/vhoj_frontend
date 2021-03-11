<template>
  <div>contest page</div>
</template>
<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/contest")
  }
}
</script>