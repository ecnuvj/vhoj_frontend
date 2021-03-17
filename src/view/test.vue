<template>
  <div class="testContainer">
    <!-- 跳转锚点  -->
    <a href="javascript:void(0)" @click="goAnchor('production')">
      作品 a标签
    </a>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <!-- // 跳转目的地 -->
    <div class="production-box" id="production">
      <span class="item-name">作品 跳转目的地</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TestAdmin",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goAnchor(id) {
      var anchor = document.getElementById(id);
      console.log("test0:anchor.offsetTop", anchor.offsetTop);
      // chrome
      document.body.scrollTop = anchor.offsetTop;
      console.log("test1:document.body.scrollTop", document.body.scrollTop);
      // firefox
      document.documentElement.scrollTop = anchor.offsetTop;
      console.log(
        "test2: document.documentElement.scrollTop",
        document.documentElement.scrollTop
      );
      // safari
      window.pageYOffset = anchor.offsetTop;
      console.log("test3:window.pageYOffset", window.pageYOffset);
    },
  },
};
</script>
<style scoped>
.item {
  width: 60%;
  height: 50px;
  margin: 20px 0;
  background-color: pink;
}
</style>
