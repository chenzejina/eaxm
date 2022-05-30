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
        <div class="formation" @click="createdQuestion"  >添加习题</div>
        <div class="formation">批量导入</div>
        <div class="formation1">加入公共习题库</div>
        <el-input
          class="ipt"
          placeholder="请输入内容"
          suffix-icon="el-icon-search" 
          v-model="search" 
        ></el-input>
        <button @click="inpuuuu">111</button>
      </div>
    </div>
    <div class="box">
      <div class="item" v-for="item in listData" :key="item.id" :id="item.id">
        <div class="justcont-between">
          <div class="justcont">
            <div class="createtime">
              <span>创建时间：</span>
              <span> {{ formatDate(item.createdAt) }}</span>
            </div>
            <div class="types">
              <span class="typeaa">{{ getType(item.type) }}</span>
              <span class="typese">{{ getLevel(item.level) }}</span>
            </div>
          </div>
          <div class="icon">
            <span class="el-icon-upload mrt-20" @click="echoData(item)"></span>
            <span class="el-icon-delete" @click="deleteData(item)"></span>
          </div>
        </div>
        <div class="mian">
          <el-checkbox v-model="checked"></el-checkbox>
          <div class="mr-5">{{ item.title }}</div>
        </div>
        <div class="redios"  >
          <el-radio v-model="item.answer" disabled label="A">{{
            item.questionA
          }}</el-radio>
          <el-radio v-model="item.answer" disabled label="B">{{
            item.questionB
          }}</el-radio>
          <el-radio v-model="item.answer" v-if="item.questionC" disabled label="C">{{
            item.questionC
          }}</el-radio>
          <el-radio v-model="item.answer" v-if="item.questionD"  disabled label="D">{{
            item.questionD
          }}</el-radio>
        </div>
        <div class="answer">
          <span>答案：</span>
          <span>{{ item.answer }}</span>
        </div>
      </div>
    </div>
 <el-dialog
          title="添加题目"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form class="form" :model="form" :label-position="labelPosition">
            
            <div class="items">
              <label for="" class="questionos">题目标题</label>
              <el-input
                v-model="form.title"
                class="aa"
                autocomplete="off"
                placeholder="请输入标题"
              ></el-input>
            </div>

            <div
              class="items"
              v-for="(item, index) in questionOptions"
              :key="item.id"
            >
              <label for="">{{ item.label }}</label>
              <el-input v-model="item.value" class="aa" :placeholder="item.placeholder" ></el-input>
              <div>
                <span
                  v-if="index == questionOptions.length - 1 && index < 3"
                  @click="addData"
                  class="el-icon-circle-plus-outline"
                ></span>
                <span
                  v-if="index > 1 && index == questionOptions.length - 1"
                  class="el-icon-remove-outline mr-5"
                  @click="romoveData(index)"
                ></span>
              </div>
            </div>
            <div class="items">
              <label for="" class="questionos">答案</label>
              <el-select v-model="form.answer" placeholder="请选择">
                <el-option
                  v-for="item in questionOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </div>
            <div class="items">
              <label for="" class="questionos">难度系数</label>
              <el-select v-model="form.level" placeholder="请选择难度系数">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in levelOptions"
                  :key="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-form>

          <div class="button">
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button @click="revisionQuestion" v-if="isOKKK"> 修改</el-button>
              <el-button type="primary" @click="getquestion" v-if="ins">确 定</el-button>
            </span>
          </div>
        </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  questionCreate,
  questionList,
  questiondalete,
  questionModify,
} from "@/api/api";
import formatDate from "@/mixins/formatDate";

export default {
  mixins: [formatDate],
  data() {
    return {
      isOKKK:false,
      ins:true,
      id:'',
      dialogVisible: false,
      labelPosition: "right",
      form: { 
      },
      radio: "",
      checked: "",
      listData: [],
      currentPage4: 1,
      totalpage: 0,
      pageSizes: [2, 10, 20, 30, 40],
      pageSize: 10,
      upData: [],
      isok:'',
      pageNum: 1,
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "普通",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      option: [
        {
          id: 1,
          label: "选项A",
          key: "A",
          value: "", 
          placeholder:'请输入选项A'
        },
        {
          id: 2,
          label: "选项B",
          key: "B",
          value: "",
          placeholder:'请输入选项B'
        },
        {
          id: 3,
          label: "选项C",
          key: "C",
          value: "",
          placeholder:'请输入选项C'
        },
        {
          id: 4,
          label: "选项D",
          key: "D",
          value: "",
          placeholder:'请输入选项D'
        },
      ],
      questionOptions: [],
      search:''
    };
  },
  created() {
    this.rquerquestion();
    this.initFormParams();
  }, 
  methods: {
    inpuuuu(){
      this.rquerquestion()
    },
    ////查询
    echoData(item) {  
      this.ins=false
      this.isOKKK=true
      this.id=item.id;
      this.dialogVisible = true;
      this.form.type = item.type;
      this.form.title = item.title;
      this.form.answer = item.answer;
      this.form.level = item.level;
      this.form.id = item.id;
      this.option[0].value = item.questionA;
      this.option[1].value = item.questionB;
      this.option[2].value = item.questionC;
      this.option[3].value = item.questionD;
      this.formatCreateParams();
      console.log(item.questionC);
      console.log(item.questionD);
      console.log(this.questionOptions);
      if(item.questionD){ 
        this.questionOptions = this.option.slice(0, 4);  
      }else if(item.questionC){
        this.questionOptions = this.option.slice(0, 3);  
      }  
},
    rquerquestion() {
      const { pageSize, pageNum } = this;
      questionList({
        type: 1,
        pageSize: pageSize,
        pageNum: pageNum,
        title:this.search
      }).then((res) => {
        console.log(res);
        this.totalpage = res.data.data.count;
        this.listData = res.data.data.rows;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.rquerquestion();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.rquerquestion();
    },
    getType(val) {
      switch (val) {
        case 1:
          return "单";
      }
    },
    getLevel(val) {
      switch (val) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    createdQuestion() {
      this.dialogVisible = true;
      this.ins=true
      this.isOKKK=false
       this.initFormParams()
    },
    // 创建入参
     formatCreateParams() {
      let res = {};
      res.type=this.form.type
      res.title=this.form.title 
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });   
      res.answer=this.form.answer
      res.level=this.form.level
      console.log(res);
      
      return res
    },
    testDataFormParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项c",
        questionD: "选项d",
        answer: "答案",
        level: "难易程度",
      };
      for (let key in params) { 
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空！",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    initFormParams() {
      this.form = {
        type: 1,
        title: "",  
        answer: "",
        level: 1,
      };
      this.questionOptions = this.option.slice(0, 2);
      this.answer = "";
      this.option.forEach((el) => {
        el.value = "";
      });
    },
    // 创建接口
    getquestion() {
      this.ins=false
      this.isOKKK=true
      const params=this.formatCreateParams();
        let relu = this.testDataFormParams(params);  
        if (!relu) return;
   
      questionCreate(params).then((res) => {
        if (res.data.status == 1) {
          this.dialogVisible = false;
          this.rquerquestion();
          this.$message({
            message: "创建成功",
            type: "success",
          });
          this.initFormParams();
        }
      });
    },
    //修改接口
    revisionQuestion() {  
         const params=this.formatCreateParams();
             let relu = this.testDataFormParams(params); 
      if(!relu) return  
         params.id=this.id 
            if(!params.questionC){
          params.questionC=''
      }else if(!params.questionD){
         params.questionD=''
      }
  
      questionModify(params).then((res) => {
        if (res.data.status == 1) { 
          this.$message({
            message: "修改成功",
            type: "success",
          }); 
          this.rquerquestion();
          this.dialogVisible = false;
        }
      });
    },
    //删除接口
    deleteData(data) {
      questiondalete({
        id: data.id,
        type: data.type,
      }).then((deleteres) => {
        if (deleteres.data.status == 1) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.rquerquestion();
        }
      });
    },
    romoveData(data) {  
      this.questionOptions[data].value=''
      this.form.answer=this.answer  
      this.questionOptions.pop();  
      },
    addData() { 
      let resOption=JSON.parse(JSON.stringify(this.option))
      this.questionOptions.push( resOption[this.questionOptions.length]);
    }, 
  },
};
</script>
 

<style  scope lang="scss">
.aaa {
  height: 320px;

  background-color: #f9f9f9;
}
.boxcent {
  width: 98%;
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
  width: 120px;
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
.formation1 {
  width: 120px;
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
  margin-left: 600px;
}
.item {
  padding: 20px;
  border: 1px solid #e2e5ea;
  margin: 20px 0;
}
.types {
  display: flex;
  gap: 20px;
  margin-left: 30px;
  color: #fff;
}
.typeaa {
  padding: 4px;
   background-image: linear-gradient(#f3503d,#f97962);
  color: #fff;
  border-radius: 5px;
}
.typese {
  padding: 4px; 
  background-image: linear-gradient(#72d994,#72d9c5);
  border-radius: 5px;
}
.createtime {
  display: flex;
  gap: 5px;
}
.mian {
  display: flex;
  padding-top: 10px;
}
.redios {
  margin: 20px 50px;
}
.answer {
  margin: 20px 20px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  & .items {
    display: grid;
    grid-template-columns: 70px 280px 40px;
    gap: 0 10px;
    align-items: center;
  }
}
.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.block {
  text-align: end;
}
</style> 