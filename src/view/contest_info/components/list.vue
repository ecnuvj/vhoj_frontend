<template>
  <div>
    <el-table :data="contest.problems" style="width: 100%">
      <el-table-column label="状态" align="center" width="50">
        <template slot-scope="scope">
          <i class="fa fa-minus" v-if="scope.row.status == 1"></i>
          <i
            class="fa fa-check"
            v-else-if="scope.row.status == 2"
            style="color: green"
          ></i>
          <i class="fa fa-close" v-else style="color: red"></i>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="题号" align="center" width="100">
      </el-table-column>
      <el-table-column prop="title" label="题目" align="center">
        <template slot-scope="scope">
          <router-link
            :to="{
              path: `/problem/${scope.row.problem_id}`,
              query: { contestId: contest.contest_id },
            }"
            >{{ scope.row.title }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column
        label="通过率"
        align="center"
        width="250"
        :formatter="rate"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['contest'],
  methods: {
    rate(row, column, cellValue, index) {
      var num = parseFloat(row.accepted)
      var total = parseFloat(row.submitted)
      if (isNaN(num) || isNaN(total)) {
        return "-"
      }
      var r = total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%"
      return r + "(" + num + "/" + total + ")"
    }
  }
}
</script>