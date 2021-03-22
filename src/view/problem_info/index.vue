<template>
  <div class="problem-info-container">
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/problem' }">题目列表</el-breadcrumb-item>
        <el-breadcrumb-item>题目详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="info-card">
          <div class="info-block">
            <div class="info-title">题目描述：</div>
            <div class="info-content">{{problem.description}}</div>
          </div>
          <div class="info-block">
            <div class="info-title">输入格式：</div>
            <div class="info-content">{{problem.input}}</div>
          </div>
          <div class="info-block">
            <div class="info-title">输出格式：</div>
            <div class="info-content">{{problem.output}}</div>
          </div>
          <div class="info-block">
            <div class="info-title">样例输入：</div>
            <pre class="info-content">{{problem.sample_input}}</pre>
          </div>
          <div class="info-block">
            <div class="info-title">样例输出：</div>
            <pre class="info-content">{{problem.sample_output}}</pre>
          </div>
          <div class="info-block">
            <div class="info-title">来源：</div>
            <div class="info-content"></div>
          </div>
          <div class="info-block" id="production">
            <div class="submit-title">提交代码</div>
            <div>
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
                    theme="chrome"
                    width="574"
                    height="400"
                  ></editor>
                </el-form-item>
              </el-form>
              <div slot="footer" class="submit-footer">
                <el-button
                  type="primary"
                  size="mini"
                  class="submit-footer-button"
                  @click="submitCode"
                >提交</el-button>
                <el-button size="mini" plain class="submit-footer-button">重置</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="height: 180px">
          <div class="right-block">
            <div class="constraint">
              <div class="condition">
                <span class="condition-title">时间限制</span>
                <span class="condition-content">{{problem.time_limit}}ms</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="condition">
                <span class="condition-title">空间限制</span>
                <span class="condition-content">{{problem.memory_limit}}kb</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="condition">
                <span class="condition-title">通过人数</span>
                <span class="condition-content">{{problem.accepted}}</span>
              </div>
              <el-divider direction="vertical"></el-divider>
              <div class="condition">
                <span class="condition-title">提交人数</span>
                <span class="condition-content">{{problem.submitted}}</span>
              </div>
            </div>
            <div>
              <el-button type="primary" @click="submitFormVisible = true" size="mini">
                <a href="javascript:void(0)" @click="goAnchor('production')">提交此题</a>
              </el-button>
              <el-button type="primary" size="mini" plain>评测记录</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- <el-dialog :visible.sync="submitFormVisible" title="提交">
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
    </el-dialog>-->
  </div>
</template>

<script>
import EventBus from "@/EventBus.js";
import { problemShow, problemSubmit } from '@/api/problem.js'
export default {
  name: "ProblemInfo",
  props: ["problem_id"],
  created() {
    EventBus.$emit("change-route", "/problem");
    //this.$alert(this.$route.query);
    this.fetchData()
  },
  components: {
    editor: require("vue2-ace-editor"),
  },
  computed: {
    lang: function () {
      if (this.submission.language == 1) {
        return "c_cpp";
      } else if (this.submission.language == 2) {
        return "java";
      }
    },
  },
  data() {
    return {
      submitFormVisible: false,
      formLabelWidth: "120px",
      problem: {},
      loading: false,
      submission: {
        problem_id: this.problem_id,
        language: "1",
        code: "",
      },
    };
  },
  methods: {
    submitCode() {
      let data = {}
      data['problem_id'] = this.submission.problem_id
      data['contest_id'] = this.$route.query.contestId
      data['source_code'] = this.submission.code
      data['language'] = this.submission.language
      this.loading = true
      problemSubmit(data).
        then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.loading = false
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '提交失败，请重试'
          })
          this.loading = false
        })
    },
    fetchData() {
      let data = {}
      data['problem_id'] = this.problem_id
      this.loading = true
      problemShow(data).
        then(res => {
          this.problem = res.data.problem
          this.loading = false
          EventBus.$emit("change-title", this.problem.title);
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取信息失败，请刷新重试'
          })
        })
    },
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
    goAnchor(id) {
      var anchor = document.getElementById(id);
      console.log("1==============", anchor);
      console.log("2==============", anchor.offsetTop);
      // this.$nextTick(() => {
      //   // document.body.scrollTop = anchor.offsetTop;
      //   // document.documentElement = anchor.offsetTop;
      //   // document.documentElement.scrollTop = anchor.offsetTop;

      //   console.log("3(1)==============", document.documentElement);
      //   console.log("4(1)==============", document.documentElement.scrollTop);
      //   // document.querySelector(".el-main").scrollTop = anchor.offsetTop;
      // });
      this.$nextTick(() => {
        document.querySelector(".problem-info-container").scrollTop =
          anchor.offsetTop;
      });

      // chrome
      document.body.scrollTop = anchor.offsetTop;
      console.log("3==============", document.body.scrollTop);
      // firefox
      console.log("4(2)==============", document.documentElement.scrollTop);
      document.documentElement.scrollTop = anchor.offsetTop;
      console.log("4==============", document.documentElement.scrollTop);
      // safari
      window.pageYOffset = anchor.offsetTop;
      console.log("5==============", window.pageYOffset);
    },
    // scroll(t) {
    //   console.log("跳转");
    //   document.body.scrollTo({
    //     // 通过offsetYop获取元素位置
    //     // -10是为了避免它直接滑动到屏幕顶部，怪丑的
    //     top: this.$refs[t].offsetTop - 10,
    //     behavior: "smooth", // 平滑滚动
    //   });
    //   console.log("跳转后");
    // },
    //     jump (index) {
    //     let jump = document.querySelectorAll('.d_jump')
    //     // 获取需要滚动的距离
    //     let total = jump[index].offsetTop
    //     // Chrome
    //     document.body.scrollTop = total
    //     // Firefox
    //     document.documentElement.scrollTop = total
    //     // Safari
    //     window.pageYOffset = total
    // },
  },
};
</script>

<style scoped>
.info-title {
  padding-top: 20px;
  font-size: 18px;
  color: #313131;
  line-height: 55px;
}
.info-content {
  font-size: 15px;
  color: #666;
  line-height: 24px;
  padding-bottom: 40px;
  border-bottom: #e6e6e6 solid 1px;
}
.submit-title {
  border-top: #e6e6e6 solid 2px;
  border-bottom: #e6e6e6 solid 2px;
  margin: 30px 0;
  padding-top: 20px;
  line-height: 55px;
  font-size: 18px;
  white-space: normal;
  font-weight: bold;
}
.submit-footer {
  width: 500px;
  margin-left: 100px;
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
}
.submit-footer-button {
  margin-left: 20px;
}
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
.condition-title {
  color: #313131;
  line-height: 20px;
  font-size: 15px;
}
.condition-content {
  text-align: center;
  font-size: 12px;
  color: #666;
}
.el-divider--vertical {
  height: auto;
}
.right-block {
  margin-top: 8%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
