<template>
  <div>
    <h1>創建任務</h1>
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="lable" label="任務名稱">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="lable" label="任务时长">
          <el-input v-model="form.tiem" class="inp"></el-input>
          <span>小時</span>
        </el-form-item>

        <el-form-item label="任務説明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <div>
          <label for="" class="label">執行人</label>
          <el-select v-model="value1" multiple placeholder="请选择" class="sec">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>

        <el-form-item label="重要通知">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog 
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    > 
    <div>
      <p>
      <span>提示</span>
      </p>
      <p  >是否查看任務列表</p>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="routerList">查看任務列表</el-button>
        <el-button type="primary" @click="chaungjian"
          >
          繼續創建</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

 <script>
import { createTesk,userList,releaseTask } from "@/api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        tiem: "",
        region: "",
        delivery: false,
        desc: "",
      },
      options: "",
      value1: [],
      dialogVisible:false,
      id:'',  
    };
  },
  created(){
userList({pagination :false}).then(res=>{
    this.options=res.data.data.data.rows  
}) 
  },
  methods: { 
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(() => {});
      } ,
    onSubmit() {
      createTesk({
        name: this.form.name,
        desc: this.form.desc,
        duration: this.form.tiem,
        level: this.form.delivery,
      }).then((res) => {
        if (res.data.status == 1) {
          this.$message({
            type: "success",
            message: "創建成功",
          });
          this.dialogVisible=true 
          this.id= res.data.data[0].id 
          releaseTask({
            userId:this.value1,
            taskId:this.id
          }).then(res=>{
            console.log(res);
          })
        }
      });
    }, 
    routerList(){
      this.$router.push({
        name:'list', 
      })
    },
    chaungjian(){
      this.dialogVisible=false
      this.form.name=''
      this.form.tiem=''
      this.form.region=''
      this.form.desc=''
      this.form.delivery=false
      this.value1=[]
    }
  },
};
</script>
<style lang="scss" scope>
.box {
  display: flex;
}
.inp {
  width: 50px;
}
.label {
  margin: 20px;
}
</style>