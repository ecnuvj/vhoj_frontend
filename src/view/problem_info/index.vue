<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/problem' }"
          >题目列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>题目详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="info-card">
          <div class="info-block">
            <div class="info-title">题目描述：</div>
            <div class="info-content"></div>
          </div>
          <div class="info-block">
            <div class="info-title">输入：</div>
            <div class="info-content"></div>
          </div>
          <div class="info-block">
            <div class="info-title">输出：</div>
            <div class="info-content"></div>
          </div>
          <div class="info-block">
            <div class="info-title">样例输入：</div>
            <div></div>
          </div>
          <div class="info-block">
            <div class="info-title">样例输出：</div>
            <div class="info-content"></div>
          </div>
          <div class="info-block">
            <div class="info-title">来源：</div>
            <div class="info-content"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="height: 180px">
          <div class="right-block">
            <div class="constraint">
              <div class="condition">
                <span>时间限制</span>
                <span>1s</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="condition">
                <span>空间限制</span>
                <span>256m</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="condition">
                <span>通过人数</span>
                <span>77777</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="condition">
                <span>提交人数</span>
                <span>8888888</span>
              </div>
            </div>
            <div>
              <el-button type="primary" @click="submitFormVisible = true"
                >提交</el-button
              >
              <el-button type="primary">记录</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="submitFormVisible" title="提交">
      <el-form :model="submission">
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input
            v-model="submission.problem_id"
            autocomplete="off"
            disabled
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="语言" :label-width="formLabelWidth">
          <el-select v-model="submission.language" placeholder="请选择语言">
            <el-option label="C++" value="1"></el-option>
            <el-option label="JAVA" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码" :label-width="formLabelWidth">
          <editor
            v-model="submission.code"
            @init="editorInit"
            :lang="lang"
            theme="github"
            width="500"
            height="400"
          ></editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >提 交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'
export default {
  name: "ProblemInfo",
  props: ['problem_id'],
  created() {
    EventBus.$emit("change-route", "/problem")
    EventBus.$emit("change-title", "题目：" + this.problem_id)
    this.$alert(this.$route.query)
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  computed: {
    lang: function () {
      if (this.submission.language == 1) {
        return "c_cpp"
      } else if (this.submission.language == 2) {
        return "java"
      }
    }
  },
  data() {
    return {
      submitFormVisible: false,
      formLabelWidth: '120px',
      submission: {
        problem_id: this.problem_id,
        language: '1',
        code: ''
      }
    }
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript')    //language
      require('brace/mode/less')
      require('brace/mode/c_cpp')
      require('brace/mode/java')
      require('brace/theme/chrome')
      require('brace/theme/github')
      require('brace/snippets/javascript') //snippet
    }
  }
}
</script>

<style scoped>
.constraint {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 50px;
}
.condition {
  width: 23%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: rgb(40, 42, 43);
}
.el-divider--vertical {
  height: auto;
}
.right-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>