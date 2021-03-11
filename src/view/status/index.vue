<template>
  <div>status page</div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/status")
  }
}
</script>