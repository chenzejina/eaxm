<template>
  <div>
    <div class="box">
      <h3>任务列表</h3>
      <div class="listr">
        <el-form ref="form" :model="form" label-width="80px" class="listr">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="form.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table :data="from" style="width: 100%">
      <el-table-column label="id" width="60" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用戶名称" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任務難度" width="100" align="center">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
            v-if="scope.row.level == 0"
            class="lavler"
            >普通</span
          >
          <span style="margin-left: 10px" v-else class="lavle">緊急</span>
        </template>
      </el-table-column>
      <el-table-column label="任務名稱" width="120" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任務簡介" width="340" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成時間" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.duration }}小時</span>
        </template>
      </el-table-column>
      <el-table-column label="創建時間" width="200" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            new Date(scope.row.createdAt).toLocaleString()
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.isReceived == 1"
            >已领取</span
          >
          <span style="margin-left: 10px" v-else>未领取</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="releasTask(scope.row)"
            >继续发布</el-link
          >
          <el-link type="primary" class="pd-5" @click="details(scope.row)"
            >查看详情</el-link
          >
          <el-link
            type="primary"
            class="pd-5"
            v-if="scope.row.isReceived == 0"
            @click="receive(scope.row)"
            >领取任务</el-link
          >
          <el-link type="primary" class="pd-5" v-else></el-link>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-model="value1" multiple placeholder="请选择" class="sec">
        <el-option
          v-for="(item, index) in option"
          :key="index"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  createList,
  userList,
  getUserInfoApi,
  releaseTask,
  taskDetail,
} from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      from: [],
      currentPage4: 1,
      totalpage: 0,
      pageSizes: [2, 10, 20, 30, 40],
      pageSize: 10,
      pageNum: 1,
      options: "",
      value1: "",
      id: "",
      optionsl: [],
      option: [],
      xx: "",
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
    userList({ pagination: false }).then((res) => {
      this.options = res.data.data.data.rows;
    });
    this.listrender();
    getUserInfoApi().then((res) => {
      this.id = res.data.data[0].id;
    });
  },
  methods: {
    //处理数据
    listOption(item) {
      taskDetail({
        taskId: item.id,
      }).then((res) => {
        // 执行人列表
        this.optionsl = res.data.data.receivedData;
        // 所有人的列表
        // this.options.forEach(element => {
        //   if(!this.optionsl.find((i) => i.userId == element.id)){
        //     // 结果
        //     this.option.push(element)
        //   }
        // });
        this.option = this.options.filter(
          (item) =>
            !this.optionsl.find(
              (childrenItem) => childrenItem.userId == item.id
            )
        );
        console.log("--------------this.options--------------");
        console.log(this.option);
      });
    },
    // 发布任务
    releasTask(item) {
      this.value1 = [];
      this.xx = item.id;
      this.dialogVisible = true;
      this.listOption(item);
    },
    // 确定
    clickTask() {
      this.option = [];
      this.dialogVisible = false;
      releaseTask({
        userId: this.value1,
        taskId: this.xx,
      }).then((res) => {
        console.log(res);
      });
      this.value1 = [];
      this.listrender();
    },
    // 领取
    receive(row) {
      releaseTask({
        userId: [this.id],
        taskId: row.id,
      }).then((res) => {
        console.log(res);
      });
      this.listrender();
    },
    details(task) {
      this.$router.push({
        name: "task",
        query: {
          taskId: task.id,
        },
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    listrender() {
      const { pageSize, pageNum } = this;
      createList({
        pageSize: pageSize,
        pageNum: pageNum,
      }).then((res) => {
        console.log(res.data.data.rows);
        this.from = res.data.data.rows;
        this.totalpage = res.data.data.count;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.listrender();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.listrender();
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.lavle {
  background-color: #f56c6c;
  color: #fff;
  padding: 15px;
}
.lavler {
  background-color: #909399;
  color: #fff;
  padding: 15px;
}
.box h3 {
  margin: 0;
}
.box {
  padding: 0;
}
.listr {
  height: 45px;
  display: flex;
}
</style>