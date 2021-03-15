<template>
  <div>home page</div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/home")
    EventBus.$emit("change-title", "ecnu virtual online judge")
  },
  data() {
    return {
      code: '#inlcude<bits/stdc++.h>',
      lang: 'html',
      options: {

      }
    }
  },
  components: {

  },
  methods: {

  },
  mounted() {
  }
}
</script>