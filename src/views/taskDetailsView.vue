<template>
  <div>
    <div class="conte">
      <div class="box">
        <h1>任務详情  </h1>
        <div>
          <div class="main">
            <div class="main item  ">
              <img src="@/assets/describe.png" alt="" class="icon" />
              <p>编辑描述</p>
            </div>
            <div class="main item ">
              <img src="@/assets/upload.png" alt="" class="icon" />
              <p>上传附件</p>
            </div>
            <div class="main item  ">
              <img src="@/assets/relation.png" alt="" class="icon" />
              <p>关联到代码仓库</p>
            </div>
            <div class="main item  ">
              <img src="@/assets/maintain.png" alt="" class="icon" />
              <p>阻塞关系</p>
            </div>
            <div class="main item ">
              <img src="@/assets/reference.png" alt="" class="icon" />
              <p>引用资源</p>
            </div>
          </div>
           <div class="alitemt">
              <p>任务简介 :</p>
             <p>{{desc}}</p>
           </div>
        </div>
        <div>
          <h1>活动日志</h1>
          <div>
            <div class="text">
              <p class="pd-5">全部</p>
              <p class="pd-5">只看评论</p>
              <p class="pd-5">只看评论</p>
            </div>
            <div>
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in userInfo"
                  :key="index" 
                >
                  {{activity.userName}} 创建了{{activity.taskName}} {{new Date(activity.createdAt).toLocaleString() }}   
                </el-timeline-item>
              </el-timeline>
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in userInfo"
                  :key="index" 
                >
                 {{activity.userName}} 分配任务给 
                <span v-for="items in activity.receivedData" :key="items.id">
                    {{items.userName}} 
                </span>
                <span>
                  {{new Date(activity.createdAt).toLocaleString() }}
                </span>
           
                </el-timeline-item>
              </el-timeline>
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in userInfo"
                  :key="index" 
                >
                  {{activity.userName}}  {{new Date(activity.createdAt).toLocaleString() }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
      <div class="rigth">
       <div>
         <p class="color">项目</p>
         <div class="alitemt">
         <img src="@/assets/cream.png" alt="">
         <p>  task123</p>
         </div>
       </div>
       <div>
         <p class="color">状态</p>
         <p>未开始</p>
       </div>
       <div>
         <p class="color">处理人</p>
         <p>盒子组</p>
       </div>
       <div>
         <p class="color">所属需求</p>
         <p>未关联需求</p>
       </div>
       <div>
         <p class="color">送代</p>
         <p>为规划送代</p>
       </div>
       <div>
         <p class="color">优先级</p>
         <p>中</p>
       </div>
       <div>
         <p class="color">截止日期</p>
         <p>未指定</p>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import { taskDetail } from "@/api/api";
export default {
  data() {
    return { 
      desc: "", 
      tableData: [],
      reverse: true, 
      userInfo:[],
      tasklist:''
    };
  },
  created() {
    this.task();
  },
  methods: {
    task() {
      taskDetail({
        taskId: this.$route.query.taskId,
      }).then((res) => {  
        this.tasklist=res.data.data.receivedData
        this.desc = res.data.data.desc; 
        this.userInfo.push(res.data.data) 
         console.log(res.data.data);
      });
    },
  },
};
</script>

<style lang="scss" scope>
.text {
  display: flex;
}
.main {
  display: flex;
  align-items: center;
  justify-content: space-around;
} 
.icon {
  width: 15px;
}
.box {
  width: 80%;
  padding: 20px; 
}
.conte{
  display: flex;
}
.rigth{
  width: 20%;
}
.color{
  font-size: 14px;
  color: #ccc;
}
.item{
  max-width: 150px;
  height: 30px; 
  border: 1px solid black;
  padding: 5px;
  text-align: center;
}
</style>