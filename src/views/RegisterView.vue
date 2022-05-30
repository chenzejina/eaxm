<template>
  <div>
    <div class="register box-shadow">
      <div class="regist">
        <el-steps :active="active" class="progressbar" align-center>
          <el-step title="校验身份"></el-step>
          <el-step title="登录成功"></el-step>
        </el-steps>
      </div>
      <div class="unsrinfo" v-show="page">
        <div class="justcont">
          <div class="important">*</div>
          <el-input
            class="inp"
            prefix-icon="el-icon-s-custom"
            v-model="username"
            placeholder="请输入用户名"
          ></el-input>
        </div>
        <div class="justcont">
          <div class="important">*</div>
          <el-input
            class="inp"
            prefix-icon="el-icon-unlock"
            v-model="name"
            placeholder="请输入真實姓名" 
          ></el-input>
        </div>
        <div class="justcont">
          <div class="important">*</div>
          <el-input
            class="inp"
            prefix-icon="el-icon-unlock"
            v-model="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
        <div class="justcont">
          <div class="important">*</div>
          <el-input
            class="inp"
            prefix-icon="el-icon-unlock"
            v-model="password1"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </div>
        <div class="justcont">
          <div class="important">*</div>
          <el-input
            class="inp"
            prefix-icon="el-icon-message"
            v-model="email"
            placeholder="请输入邮箱"
          ></el-input>
        </div>
        <div class="justcont">
          <div class="important">*</div>
          <el-input
            class="inp"
            prefix-icon="el-icon-mobile-phone"
            v-model="phone"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div class="verification">
          <div class="justcont me-r">
            <div class="importants">*</div>
            <el-input
              class="input"
              v-model="captcha"
              placeholder="请输入验证码"
            ></el-input>
            <button class="btn">
              <img
                class="icon-captcha"
                :src="captchaSrc"
                @click="getcaptcha"
                alt=""
              />
            </button>
          </div>
        </div>
        <div class="nextStep">
          <el-button type="primary" class="btns" @click="next"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="signin" v-if="page2">
        <div class="signin-in">
          <i class="el-icon-circle-check"></i>
          <p>
            恭喜您！注册成功<span>{{ num }}</span
            >秒后跳转
          </p>
           <el-button type="success" class="sss">自动登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerApi ,loginApi ,getCaptchaApi} from "@/api/api";
import { encrypt } from "@/assets/utils/index";
export default {
  data() {
    return {
      active: 1,
      captchaSrc: "/api/captcha",
      username: "",
      password: "",
      password1: "",
      email: "",
      phone: "",
      captcha: "",
      page: true,
      page2: false,
      num: 3,
      name:'',
      token: "",
    };
  },
  created(){
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.code == "Enter") {
          this.next();
          //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
          event.preventDefault();
        }
      },
      true
    );
  },
  methods: {
    fn() {
      for (var i = 1; i < 4; i++) {
        setTimeout(() => {
          i--;
          this.num = i;
          if (i == 1) {
            this.$router.push({
              name: "home",
            });
          }
        }, 1000 * i);
      }
    },
    getyoken() {
       loginApi( {
          username: this.username,
          password: encrypt(this.password),
          captcha: this.captcha,
        }) 
        .then((res) => {
          this.token = res.data.data;
          sessionStorage.setItem("token", res.data.data);
        });
        
    },

    getValidataResult() {
      let resdata = /(\W)/.test("hello world");
      var res = { result: true };
      if (this.username == "") {
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      } else if (this.captcha == "") {
        res.result = false;
        res.message = { type: "warning", message: "验证码不能为空" };
      }
      if (6 < this.username.length > 15) {
        res.result = false;
        res.message = { type: "warning", message: "用户名长度在6-15位" };
      }
      if (this.username == resdata) {
        res.result = false;
        res.message = { type: "warning", message: "用户名不规范" };
      }
      if (this.password != this.password1) {
        res.result = false;
        res.message = { type: "warning", message: "两次密码不正确" };
      }
      if (!res.result) this.$message(res.message);
      return res;
    },
    getcaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    async next() {
      var isValidata = this.getValidataResult();
      const { username, password, email, phone, captcha,name } = this;
       if(!isValidata) return
        let res=await registerApi({
          username,
          password,
          email,
          phone,
          captcha,
          name
        })
         if (res.data.msg == "success") {
              this.$message({
                type: "success",
                message: "注册成功",
              });
              if (this.active++ > 2) this.active = 1;
              this.fn();
              this.page = false;
              this.page2 = true;
              this.getyoken();
            } else {
              this.getcaptcha();
            } 
      }
    }, 
};
</script>

<style lang="scss" scoped>
.register {
  width: 800px;
  height: 500px;
  margin: 100px auto;
}
.progressbar {
  width: 80%;
  margin-top: 30px;
}
.regist {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.unsrinfo {
  width: 100%;
  display: flex;
  align-content: stretch;
  flex-direction: column;
  align-items: center;
}
.inp {
  width: 300px;
  height: 28px;
  margin: 10px 5px;
}
.verification {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input {
  margin-top: 20px;
  width: 150px;
  height: 28px;
  margin-left: 5px;
}
.btn {
  width: 120px;
  height: 40px;
  margin-top: 29px;
  border: 1px solid rgb(170, 186, 202);
  color: rgb(170, 186, 202);
  margin-left: 30px;
}
.btns {
  width: 300px;
  margin-top: 20px;
  background-color: rgb(2, 99, 193);
}
.icon-captcha {
  width: 110px;
}
.important {
  color: #ff4400;
  margin-top: 20px;
}
.importants {
  color: #ff4400;
  margin-top: 35px;
  margin-left: -8px;
}
.succbtn {
  width: 300px;
  text-align: center;
  margin-left: 250px;
  display: none;
}
.signin {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
.btnw {
  width: 200px;
  height: 40px;
  margin-top: 20px;
}
.el-icon-circle-check {
  width: 200px;
  font-size: 40px;
  text-align: center;
  color: #fa3333;
}
.sss{
   margin: 20px 50px;
}
</style>