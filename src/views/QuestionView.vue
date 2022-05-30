<template>
  <div class="boxcent">
    <div class="box">
      <div class="alitem written">
        <p class="examination">适用考试：</p>
        <p class="type1">全部(34)</p>
        <p class="type1">期中考试(14)</p>
        <p class="type1">期末考试(18)</p>
        <p class="type1">其他考试(2)</p>
      </div>
      <div class="alitem written">
        <p class="examination">试卷类型：</p>
        <p class="type">全部</p>
        <p class="type">考生统考</p>
        <p class="type">随机顺序</p>
        <p class="type">考试异卷</p>
      </div>
      <div class="alitem format">
        <div class="formation">策略组卷</div>
        <div class="formation">手动组卷</div>
        <div class="formation" @click="renderList">导入试卷</div>
        <el-input
          class="ipt"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>
    <div class="box-shadow test" v-for="item in data" :key="item.id">
      <div class="aaa box-shadow" :id="item.id">
        <div class="alitem textlis">
          <p>创建时间 ：{{ getTime(item.createdAt) }}</p>
          <p class="text-tex">{{getType(item.type)}}</p>
          <p class="text-text">{{getLevel(item.level)}}</p>
          <p class="text-text1">使用次数:18次</p>
          <p class="icon">
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="50%"
              :before-close="handleClose"
            >
              <div>
                <p>
                  <label for="">题目类型：</label>
                  <input type="text" name="" id="" v-model="type" />
                </p>
                <p>
                  <label for="">题目标题：</label>
                  <input type="text" name="" id="" v-model="title" />
                </p>
                <p>
                  <label for="">选项a：</label>
                  <input type="text" name="" id="" v-model="optiona" />
                </p>
                <p>
                  <label for="">选项b：</label>
                  <input type="text" name="" id="" v-model="optionb" />
                </p>
                <p>
                  <label for="">选项c：</label>
                  <input type="text" name="" id="" v-model="optionc" />
                </p>
                <p>
                  <label for="">选项d：</label>
                  <input type="text" name="" id="" v-model="optiond" />
                </p>
                <p>
                  <label for="">答案：</label>
                  <input type="text" name="" id="" v-model="answer" />
                </p>
                <p>
                  <label for="">难度系数：</label>
                  <input type="text" name="" id="" v-model="difficulty" />
                </p>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="revisionQuestion"
                  >确 定</el-button
                >
              </span>
            </el-dialog>

            <span
              class="el-icon-upload mr-5"
              @click="dialogVisible = true"
            ></span>
            <span class="el-icon-delete mr-5" @click="deleteData"></span>
          </p>
        </div>
        <div class="textconent">
          <input type="checkbox" name="" id="" />
          {{ item.title }}
        </div>
        <div class="question">
          <div class="distance">
            <input type="radio" name="" id="" />
            <span>{{ item.questionA }}</span>
          </div>
          <div class="mr-40">
            <input type="radio" name="" id="" />
            <span>{{ item.questionB }}</span>
          </div>
          <div class="mr-40">
            <input type="radio" name="" id="" />
            <span>{{ item.questionC }}</span>
          </div>
          <div class="mr-40">
            <input type="radio" name="" id="" />
            <span>{{ item.questionD }}</span>
          </div>
        </div>
        <div class="answer">
          答案：<span>{{ item.answer }}</span>
        </div>
        <p class="tt"></p>
        <div class="answers">
          <p class="texte">
            所属知识点:
            <span class="mr-20">知识点1</span>
            <span class="mr-20">知识点2</span>
            <span class="mr-20">知识点3</span>
          </p>
          <p class="texte">解析： <span class="mr-20">这是解析内容</span></p>
        </div>
        <div class="gao"></div>
      </div>
    </div>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { questionList, questiondalete, questionModify } from "@/api/api";
export default {
  data() {
    return {
      data: "",
      list: "",
      questionId: "",
      dialogVisible: false,
      type: "",
      title: "",
      optiona: "",
      optionb: "",
      optionc: "",
      optiond: "",
      answer: "",
      difficulty: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  created() {
    this.renderList();
  },
  methods: {
    getTime(time) {
      console.log(time);
      var a = new Date(); 
      time=a.getFullYear()+'/'+a.getMonth()+'/'+a.getDate()+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds()
      return time;
    },
    getType(val){
      switch(val){
         case 1:
            return'单';
      }
    },
    getLevel(val){
      switch(val){
         case 1:
            return'单';
         case 2:
            return'普通';
         case 3:
            return'难';
      }
    },
    revisionQuestion() {
      const {
        type,
        title,
        optiona,
        optionb,
        optionc,
        optiond,
        answer,
        difficulty,
      } = this;
      questionModify({
        id: this.questionId,
        type: Number(type),
        title: title,
        questionA: optiona,
        questionB: optionb,
        questionC: optionc,
        questionD: optiond,
        answer: answer,
        level: Number(difficulty),
      }).then((res) => {
        console.log(res);
        this.dialogVisible = false;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    deleteData() {
      questiondalete({
        id: this.questionId,
        type: 1,
      }).then((res) => {
        console.log(res);
      });
    },
     renderList() {
      questionList({
        type: 1,
      }).then((res) => {
        this.data = res.data.data.rows;
        res.data.data.rows.forEach((element) => {
          this.questionId = element.id;
        });
      });
    },
  },
};
</script>

<style scope >
.aaa {
  height: 320px;
  background-color: #f9f9f9;
}
.boxcent {
  width: 95%;
  margin: 10px auto;
}
.written {
  height: 20px;
  padding: 10px;
}
.examination {
  font-size: 16px;
  font-weight: 550;
  color: #666666;
}
.type {
  width: 80px;
  text-align: center;
  border: 1px solid #cccccc;
  margin-left: 10px;
  border-radius: 50px;
  font-size: 14px;
  color: #cccccc;
}
.test {
  margin-top: 50px;
}
.type1 {
  min-width: 120px;
  text-align: center;
  border: 1px solid #cccccc;
  margin-left: 10px;
  border-radius: 50px;
  font-size: 16px;
  color: #cccccc;
}
.formation {
  width: 100px;
  height: 15px;
  line-height: 15px;
  padding: 10px;
  text-align: center;
  border: 1px solid #0168e1;
  margin: 10px 10px;
  background-color: #0168e1;
  border-radius: 10px;
  color: #fff;
}
.format {
  width: 100%;
}
.ipt {
  width: 200px;
  margin-left: 650px;
}
.textconent {
  margin-left: 10px;
  margin-top: 12px;
  font-size: 18px;
  font-weight: 800;
}
.textlis {
  margin-left: 10px;
  color: #cccccc;
}
.text-tex {
  margin-left: 50px;
  border: 1px solid #f34d3b;
  background-color: #f34d3b;
  text-align: center;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
}
.text-text {
  margin-left: 20px;
  border: 1px solid #72d9a6;
  background-color: #72d9a6;
  text-align: center;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
}
.text-text1 {
  margin-left: 20px;
  text-align: center;
  border-radius: 5px;
}

.icon {
  width: 100px;
  font-size: 20px;
  margin-left: 600px;
}
.question {
  display: flex;
  padding: 30px;
}
.answer {
  margin: 10px 30px;
  font-size: 18px;
}
.answers {
  margin: 10px 30px;
  font-size: 14px;
}
.answer-tex {
  margin: 10px 30px;
}
.tt {
  margin: 5px 10px;
  border-top: 1px dashed black;
}
.gao {
  height: 10px;
}
.texte {
  color: #cccccc;
}
.distance {
  margin-left: 80px;
}
.el-pagination {
  font-size: 30px;
}
.block {
  text-align: end;
}
</style> 