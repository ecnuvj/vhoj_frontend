<template>
  <div>
    <el-form :model="submission">
      <el-form-item label="题目" :label-width="formLabelWidth">
        <el-input v-model="submission.problem_id" autocomplete="off" disabled style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="语言" :label-width="formLabelWidth">
        <el-input v-model="submission.language.text" disabled style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-input v-model="submission.result.text" disabled style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="提交者" :label-width="formLabelWidth">
        <el-input v-model="submission.username" disabled style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="代码" :label-width="formLabelWidth">
        <editor
          v-model="submission.code"
          @init="editorInit"
          :lang="lang"
          theme="chrome"
          width="574"
          height="400"
        ></editor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { submissionCode } from '@/api/submission.js'
import EventBus from '@/EventBus.js'
export default {
  name: "SubmissionInfo",
  props: ['submission_id'],
  created() {
    EventBus.$emit("change-route", "/status")
    EventBus.$emit("change-title", "记录详情")
    this.fetchData()
  },
  computed: {
    lang: function () {
      if (this.language == 1) {
        return "c_cpp";
      } else if (this.language == 2) {
        return "java";
      }
    }
  },
  components: {
    editor: require("vue2-ace-editor"),
  },
  data() {
    return {
      language: 2,
      submission: {},
      formLabelWidth: "120px"
    }
  },
  methods: {
    editorInit: function () {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/mode/c_cpp");
      require("brace/mode/java");
      require("brace/theme/chrome");
      require("brace/theme/github");
      require("brace/snippets/javascript"); //snippet
    },
    fetchData() {
      let data = {}
      data['submission_id'] = this.submission_id
      submissionCode(data).then(res => {
        this.submission = res.data.submission
        this.language = res.data.submission.language.code
      }).catch(err => {

      })
    }
  }
}
</script>