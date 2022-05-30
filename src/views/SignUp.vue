<template>
  <div class="about">
    <div class="calendar">
      <div>
        <el-calendar v-model="value"> </el-calendar>
      </div>
      <div class="text3">
        <div class="tet">Toder Text（3）</div>
        <div class="jia" @click="drawer = true">+</div>
      </div>
      <div class="main">
        <div class="text">
          <div class="modder">
            <div class="modder-so">
              <input type="checkbox" name="" id="" />
              <p>Working on Aaia Projrect</p>
            </div>
            <div>
              <p>08:00-10:00 AM</p>
            </div>
          </div>
        </div>
        <div class="text">
          <div class="modder">
            <div class="modder-so">
              <input type="checkbox" name="" id="" />
              <p>Working on Aaia Projrect</p>
            </div>
            <div>
              <p>08:00-10:00 AM</p>
            </div>
          </div>
        </div>
        <div class="text">
          <div class="modder">
            <div class="modder-so">
              <input type="checkbox" name="" id="" />
              <p>Working on Aaia Projrect</p>
            </div>
            <div>
              <p>08:00-10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="justcont-between">
        <p class="text">Notification</p>
        <p class="text-one">View all</p>
      </div>
      <div class="tent">
        <div>
          <img src="@/assets/edit.png" alt="" class="icon-edit" />
        </div>
        <div>
          <p>Emily just sent you task you assign</p>
          <p>18 Aug 2020 - 1000 AM</p>
          <button class="btn">Assign New</button>
        </div>
        <div class="circle">
          <img src="@/assets/curcle.png" alt="" class="icon-curcle" />
        </div>
      </div>
      <div class="justcont-between pd">
        <div class="count">
          <p class="texta">Team Chat</p>
          <p>
            <img src="@/assets/head.png" alt="" class="icon" />
            <img src="@/assets/head1.png" alt="" class="icon" />
            <img src="@/assets/head2.png" alt="" class="icon" />
          </p>
        </div>
        <div class="hade">
          <img src="@/assets/add-friend.png" alt="" class="icon-add" />
          <p class="conut">invite people</p>
        </div>
      </div>
      <div class="middle"> 
        <div class="middle-content">
          <div
            v-for="(item, index) in textArr"
            :key="index"
            class="middle-right"
            ref="scoll"
          >
            <div v-if="(new Date()-new Date(item.date))/1000<=60" class="tiem"> 
               刚刚
            </div>
            <div v-else-if="(new Date()-new Date(item.date))/1000/60<=24" class="tiem"> 
                {{(Math.ceil( (new Date()-new Date(item.date))/1000/60)) }} 分钟
            </div>
            <div v-else if="(new Date()-new Date(item.date))/1000/60/60<=24" class="tiem"> 
               {{(Math.ceil( (new Date()-new Date(item.date))/1000/60/60)) }} 小时
            </div>
            <div class="aaa">
              <div v-if="item.avatarName != '陈泽锦'" class="my-chat">
                <div v-if="item.avatarName" class="right">
                  {{ item.avatarName | name }}
                </div>
                <div v-if="item.msg" class="iiii">{{ item.msg }}</div>
              </div>
              <div v-else class="left">
                <div v-if="item.msg" class="iii">{{ item.msg }}</div>
                <div v-if="item.avatarName" class="left-one">
                  {{ item.avatarName | name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="send">
          <el-input placeholder="请输入内容" v-model="obj.msg">
            <template slot="append">
              <span @click="sendSocketMsg">
                <i class="el-icon-s-promotion">发送</i>
              </span>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <el-drawer
      title="新建任务"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div>
        <label for="">内容</label>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
        <label for="">任务进度</label>
        <el-input v-model="input" placeholder="请输入数字"></el-input>
        <button @click="createTask">确认</button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { notepad, diraryCreate, getUserInfoApi } from "@/api/api";
export default {
  data() {
    return {
      value: new Date(),
      textArr: [],
      obj: {
        name: "陈泽锦",
        msg: "",
        id: "",
      },
      drawer: false,
      direction: "rtl",
      input: "",
      textarea: "",
    };
  },
  created() {
    notepad({
      pagination: true,
    }).then((res) => {
      console.log(res);
    });
    this.keyupSubmit();
    this.userInfo(); 
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      this.$socket.emit("addUser", {
        userId: this.obj.id,
        avatarName: this.obj.name,
      });
    },
    userCount(message) {
      console.log(message);
    },

    receiveMsg: function (message) {
      this.textArr.push(message);
      this.$nextTick(() => {
        var msg = this.$refs.scoll;
        console.log(msg[msg.length - 1]);
        msg[msg.length - 1].scrollIntoView(false);
      });
    },
    disconnect: function () {
      this.$socket.emit("removeUser", {
        userId: this.obj.id,
        avatarName: this.obj.name,
      });
    },
  },
  filters: {
    name(val) {
      var name = String(val);
      return name.substring(0, 1);
    },
  },
  methods: {
    userInfo() {
      getUserInfoApi().then((res) => {
        this.obj.id = res.data.data.id;
      });
    },
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode; //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.sendSocketMsg();
        }
      };
    },
    createTask() {
      var params = { content: this.textarea, progress: Number(this.input) };
      diraryCreate(params).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.drawer = false;
        }
      });
    },
    sendSocketMsg() {
      if (!this.obj.msg) {
        this.$message({
          type: "warning",
          message: "不能爲空",
        });
      } else {
        //向服务端发送消息
        this.$socket.emit("sendMsg", {
          userId: this.obj.id,
          type: 1,
          avatarName: this.obj.name,
          msg: this.obj.msg,
        });
        //接收服务端相对应的webdata数据
        this.obj.msg = null;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="css" scoped>
.about {
  display: flex;
}
.calendar {
  width: 50%;
  padding: 0 25px;
}
::v-deep .el-calendar-day {
  height: 40px;
  text-align: center;
}
::v-deep .el-calendar-table tr td {
  border: none;
}
.text {
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 100px;
}
.text3 {
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
}
.tet {
  font-size: 18px;
  font-weight: 800;
}
.jia {
  font-size: 25px;
  font-weight: 800; 
}
.modder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.modder-so {
  display: flex;
  align-items: center;
}
.main {
  background-color: #fafafc;
}
.tent {
  background-color: #58419c;
  border-radius: 30px;
  display: flex;
  color: #fff;
}
.icon-edit {
  padding: 10px;
  background-color: #7c68b0;
  margin: 20px 50px;
}
.icon-curcle {
  width: 100px;
  margin-left: 50px;
  margin-top: 50px;
}
.btn {
  width: 120px;
  height: 40px;
  background-color: #fdcc7f;
  border: none;
  border-radius: 20px;
  color: #fff;
}
.text {
  font-size: 18px;
  font-weight: bolder;
  text-align: left;
}
.texta {
  font-size: 18px;
  font-weight: bolder;
  margin-right: 20px;
}
.text-one {
  font-size: 18px;
}
.count {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.hade {
  width: 150px;
  height: 40px;
  background-color: #58449b;
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 5px;
}
.icon {
  height: 40px;
}
.icon-add {
  color: #fff;
  margin-left: 10px;
}
.middle {
  height: 100px;
  width: 100%;
}
.middle-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  border-bottom: 2px solid rgb(226, 224, 221);
  align-items: center;
  padding: 0 20px;
}
.m-header-left {
  display: flex;
  align-items: center;
}
.m-header-right {
  display: flex;
}
.item {
  padding-left: 15px;
}
.el-icon-message-solid {
  color: rgb(129, 9, 241);
}
.middle-content { 
  height: calc(100vh - 400px);
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.iii {
  min-width: 50px;  
  border-radius: 10px;
  word-wrap: break-word;
  margin-left: 420px;
  background-color: #ffffff;
  text-align: center;
  background-color: #ccc;
  line-height: 40px;
}
.aaa {
  margin-top: 10px;
}
.iiii {
  min-width: 50px; 
  max-width: 200px;
  border-radius: 5px;
  word-wrap: break-word;
  background-color: #ccc;
  text-align: center;
  margin-left: 10px;
}
.left {
  display: flex;
  justify-content: end;
  align-items: center;
}
.my-chat {
  display: flex;
  align-items: center;
}
.left-one {
  width: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 50px;
  background-color: rgb(129, 9, 241);
  text-align: center;
  line-height: 20px;
  margin-left: 10px;
  color: #fff;
  font-size: 24px;
}
.right {
  width: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 50px;
  background-color: rgb(129, 9, 241);
  text-align: center;
  line-height: 20px;
  margin-left: 10px;
  color: #fff;
  font-size: 24px;
}
.tiem{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
}
</style>