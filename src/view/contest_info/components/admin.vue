<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="title">基本信息:</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="比赛名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="比赛描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="比赛时间">
            <div class="block">
              <el-date-picker
                v-model="form.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-table :data="contest.problems" style="width: 100%">
          <el-table-column label="题号" prop="order"> </el-table-column>
          <el-table-column label="题目" prop="title"> </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="handleAdd(scope.$index, scope.row)"
              ></el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="handleDelete(scope.$index, contest.problems)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: ['contest'],
  data() {
    return {
      form: {
        name: '',
        description: '',
        time: []
      }
    }
  },
  methods: {
    handleDelete(index, rows) {
      rows.splice(index, 1)
    },
    handleAdd(index, row) {

    }
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bolder;
}
</style>