<template>
  <div class="rankContainer">
    <el-table
      :data="participants"
      border
      :cell-style="TableCellStyle"
      style="width:100%"
      v-loading="rankLoading"
    >
      <el-table-column prop="rank" label="排行" width="80" align="center"></el-table-column>
      <el-table-column prop="username" label="昵称" width="180" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="score" label="得分" width="80" align="center"></el-table-column>
      <el-table-column prop="penalty" label="罚时" width="80" align="center"></el-table-column>
      <el-table-column
        v-for="items in problems"
        :key="items.index"
        :label="items.problem_order  + ' (' + items.accepted + '/' + items.submitted + ')'"
        :prop="'problems.' + items.problem_order + '.submit_time'"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.problems[items.problem_order].submit_time}}</span>
            <br />
            <span>{{'(' + scope.row.problems[items.problem_order].submit_count + ')'}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  name: "",
  components: {},
  props: ['rank', 'rankLoading'],
  data() {
    return {
      problems: [
        //构建表头

      ],
      participants: [
        //构建数据
        // {
        //   user_id: "9",
        //   username: "bqx",
        //   rank: "1",
        //   score: "9",
        //   penalty: "1000",
        //   A: {
        //     problem_id: 1,
        //     submit_count: 3, //提交次数
        //     status: 1, //第一个通过
        //     submit_time: "2:30:00",
        //   },
        //   B: {
        //     problem_id: 2,
        //     submit_count: 3,
        //     status: 2, //通过
        //     submit_time: "2:30:00",
        //   },
        //   C: {
        //     problem_id: 3,
        //     submit_count: 0,
        //     status: 3, //未提交
        //     submit_time: "2:30:00",
        //   },
        // },
        // {
        //   user_id: "10",
        //   username: "tcg",
        //   rank: "2",
        //   score: "8",
        //   penalty: "1300",
        //   A: {
        //     problem_id: 1,
        //     submit_count: 4,

        //     status: 4, //提交未通过
        //     submit_time: "2:30:00",
        //   },
        //   B: {
        //     problem_id: 2,
        //     submit_count: 3,

        //     status: 2, //通过
        //     submit_time: "2:30:00",
        //   },
        //   C: {
        //     problem_id: 3,
        //     submit_count: 0,
        //     status: 3, //未提交
        //     submit_time: "2:30:00",
        //   },
        // },
      ],
    };
  },
  computed: {},
  watch: {
    rank: function () {
      this.problems = this.rank.problems
      this.participants = this.rank.participants
    }
  },
  created() {
    //this.fetchData()
  },
  mounted() { },
  methods: {

    TableCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex >= 0 && columnIndex >= 4) {
        var prop = column.label.split(" ", 1)
        console.log("row:", row)
        console.log(row.problems[prop[0]].status)
        switch (row.problems[prop[0]].status) {
          case 1:
            return "background-color: #5291FF"
          case 2:
            return 'background-color: #BBDDFF'
          case 3:
            return ''
          case 4:
            return 'background-color: #FFDDDD'
        }
      }
    },
    a(column) {
      console.log("222:", column);
      console.log("333:", column.property);
    },
  },
};
</script>
<style scoped>
.cell-grey {
  background-color: grey;
}
.cell-deep-green {
  background-color: green;
}
.cell-green {
  background-color: greenyellow;
}
.cell-red {
  background-color: red;
}
</style>
