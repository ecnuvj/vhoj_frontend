<template>
  <div class="rankContainer">
    排行榜
    <el-table :data="participants" border :cell-class-name="TableCellStyle">
      <el-table-column prop="rank" label="排行" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="昵称"
        width="180"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="score" label="得分" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="penalty"
        label="罚时"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        v-for="items in problems"
        :key="items.index"
        :label="items.problem_order"
        :prop="items.problem_order + '.submit_time'"
        width="80"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      problems: [
        //构建表头
        {
          problem_id: 1,
          problem_order: "A",
          rate: "3 / 6",
        },
        {
          problem_id: 2,
          problem_order: "B",
          rate: "3 / 6",
        },
        {
          problem_id: 3,
          problem_order: "C",
          rate: "3 / 6",
        },
      ],
      participants: [
        //构建数据
        {
          user_id: "9",
          username: "bqx",
          rank: "1",
          score: "9",
          penalty: "1000",
          A: {
            problem_id: 1,
            submit_count: 3, //提交次数
            status: 1, //第一个通过
            submit_time: "2:30:00",
          },
          B: {
            problem_id: 2,
            submit_count: 3,
            status: 2, //通过
            submit_time: "2:30:00",
          },
          C: {
            problem_id: 3,
            submit_count: 0,
            status: 3, //未提交
            submit_time: "2:30:00",
          },
        },
        {
          user_id: "10",
          username: "tcg",
          rank: "2",
          score: "8",
          penalty: "1300",
          A: {
            problem_id: 1,
            submit_count: 4,

            status: 4, //提交未通过
            submit_time: "2:30:00",
          },
          B: {
            problem_id: 2,
            submit_count: 3,

            status: 2, //通过
            submit_time: "2:30:00",
          },
          C: {
            problem_id: 3,
            submit_count: 0,
            status: 3, //未提交
            submit_time: "2:30:00",
          },
        },
      ],
      tableData: [
        {
          rank: "1",
          team: "agsjbvvkszl kzhfsl first",
          score: "9",
          penalty: "1295",
        },
        {
          rank: "2",
          team: "zxyer",
          score: "8",
          penalty: "1295",
        },
        {
          rank: "3",
          team: "Three_Sbs",
          score: "7",
          penalty: "1295",
        },
        {
          rank: "4",
          team: "TooFarTooClose",
          score: "7",
          penalty: "1295",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    TableCellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log("row", row);
      // console.log("column", column);
      // console.log("rowIndex", rowIndex);
      // console.log("columnIndex", columnIndex);
      // if(columnIndex === 5){
      // if(row.goodsname == '测试'){
      //     return 'cell-grey';
      // }
    },
    a(column) {
      console.log("222:", column);
      console.log("333:", column.property);
    },
  },
};
</script>
<style scoped>
</style>
