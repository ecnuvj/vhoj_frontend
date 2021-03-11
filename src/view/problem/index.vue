<template>
  <div>
    <div class="search-area">
      <div>
        <el-input placeholder="题号" v-model="input1">
          <template slot="prepend">题号：</template>
        </el-input>
      </div>
      <div>
        <el-input placeholder="题目" v-model="input1">
          <template slot="prepend">题目：</template>
        </el-input>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div>
      <el-table :data="problems" style="width: 100%">
        <el-table-column label="状态">
          <template slot-scope="scope" align="center">
            <i class="fa fa-minus"></i>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="题号" sortable> </el-table-column>
        <el-table-column prop="title" label="题目" sortable> </el-table-column>
        <el-table-column label="通过率">
          <template slot-scope="scope" align="center">
            <div>{{ scope.row.accepted }}/{{ scope.row.submitted }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import EventBus from '@/EventBus.js'
export default {
  created() {
    EventBus.$emit("change-route", "/problem")
  },
  data() {
    return {
      problems: [
        {
          status: 1,
          id: 1000,
          title: 'aaaaaaaaaaaaaaaaaa',
          submitted: 100000,
          accepted: 50000
        },
        {
          status: 1,
          id: 1005,
          title: 'aaaagggaaaaaaaaaaaa',
          submitted: 100000,
          accepted: 50000
        },
        {
          status: 1,
          id: 1008,
          title: 'aaaaaaalllaaaaaaaa',
          submitted: 100000,
          accepted: 50000
        },
        {
          status: 1,
          id: 1011,
          title: 'aaaaaaaaaaaajjkjaa',
          submitted: 100000,
          accepted: 50000
        }
      ]
    }
  }
}
</script>

<style scoped>
.search-area {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 100px;
  margin-right: 100px;
}
</style>