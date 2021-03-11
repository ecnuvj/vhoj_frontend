<template>
  <div>home page</div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/home")
    console.log("home created")
  },
  mounted() {
    console.log("home mounted")
  }
}
</script>