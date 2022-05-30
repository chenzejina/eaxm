<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header alitem">
          <div class="title alitem">
            <div class="logo alitem mrt-20">
              <img src="../assets/logo.png" alt="" class="icon-logo" />
              <p class="logo-text coanrf">现代学徒云平台</p>
            </div>
          </div>
          <div class="userinfo">
            <div class="text whit">
              山西省 2022-4-28 星期三 21~22℃ 晴 风力 112级 风向 无持续风向微风
            </div>
            <div class="cent mrt-20">
              <img src="../assets/icon_avatar.png" alt="" class="icon-head" />
              <p>
                hi，<span>{{ phone }}</span>
              </p>
            </div>
            <div class="shutdown cent mrt">
              <img src="../assets/shutdown.png" alt="" />
              <p @click="signout()">退出</p>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0b1b34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span @click="navigator('bank')">题库系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('question')"
                  >题库类型</el-menu-item
                >
                <el-menu-item index="1-2" @click="navigator('examination')"
                  >js题库</el-menu-item
                >
                <el-menu-item index="1-3-4" @click="navigator('restructure')"
                  >题库</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title" @click="navigator('match')">匹配比赛</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span @click="navigator('enlist')">任务系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-2" @click="navigator('brush')"
                  >創建任務</el-menu-item
                > 
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="navigator('list')"
                  >任務列表</el-menu-item
                > 
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="3-3" @click="navigator('task')"
                  >任務列表详情</el-menu-item
                > 
              </el-menu-item-group>
              
            </el-submenu> 
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="navigator('personal')"
                  >
                  <i class="el-icon-s-custom"></i>
                  <span>个人信息</span> 
                  
                  </el-menu-item
                >
                <el-menu-item index="5-2" @click="navigator('information')">
                  <i class="el-icon-setting"></i>
                 <span>用戶信息</span> 
                  </el-menu-item>
                <el-menu-item index="5-3  " @click="navigator('details')"> 
                 <span>查看用户详情</span> 
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="6">
              <i class="el-icon-setting"></i>
              <span slot="title" @click="navigator('authority')">權限管理</span>
                 
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-user"></i>
              <span slot="title" @click="navigator('newrole')">新增角色</span>
                 
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfoApi, logOutApi } from "@/api/api";
export default {
  name: "HomeView",
  created() {
    this.renInfo();
  },
  data() {
    return {
      phone: "",
    };
  },
  methods: {
    async renInfo() {
      let res = await getUserInfoApi();
      if (res.data.status == 1) {
        this.phone = res.data.data[0].phone;
      }
      if (res.data.status == 401) {
        this.$router.push({
          name: "logo",
        });
      }
    },
    async signout() {
      let res = await logOutApi();
      if (res.data.status != 1) return;
      sessionStorage.setItem("token", "");
      this.$router.push({
        name: "logo",
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.el-header {
  background-color: #367fee;
  color: #fff;
}
.userinfo {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .mrt {
    margin-right: 50px;
  }
}
.container {
  height: calc(100vh - 60px);
}
.aside {
  background-color: #0b1b34;
}
.cent {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.conte {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.icon-head {
  width: 30px;
}
.el-main {
  padding: 0;
}
</style>
