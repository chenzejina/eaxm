<template>
  <div>
    <div class="tile">
      <div class="aaa">
        <div class="parall">
          <div class="box">
            <div class="top">
              <div class="ddd box-shadow">H5</div>
            </div>
            <div class="text">
              <div class="text1">modibeo</div>
              <div class="text2">DIGITIZING INDUSTRIAL SERVICES</div>
            </div>
          </div>
          <div class="userinfo">
            <div class="aas">
              <div class="disp">
                <label for="" class="lable">UNSRNAME</label>
                <el-input
                  v-model="username"
                  class="inp"
                  placeholder="请输入内容"
                ></el-input>
              </div>
              <div class="disp">
                <label for="" class="lable">PASSWORD</label>
                <el-input
                  placeholder="请输入密码"
                  class="inp"
                  v-model="password"
                  show-password
                ></el-input>
              </div>
              <div class="justcont-between regist">
                <p @click="forget">忘记密码？</p>
                <p @click="register">去注册</p>
              </div>
              <div class="disps">
                <div>
                  <el-input
                    placeholder="请输入验证码"
                    v-model="captcha"
                    maxlength="4"
                  ></el-input>
                </div>
                <div>
                  <img
                    :src="captchaSrc"
                    @click="getcaptcha"
                    alt=""
                    class="icon-captcha"
                  />
                </div>
              </div>
              <button class="btn" @click="submit">LOG IN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, getCaptchaApi } from "@/api/api";
import { encrypt } from "@/assets/utils/index";
export default {
  name: "LogoView",
  data() {
    return {
      username: "xiaoming",
      password: "999999",
      captcha: "",
      captchaSrc: "/api/captcha",
      val: "",
    };
  },
  created() {
    this.keyupSubmit()
  },
  methods: {
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode; //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.submit();
        }
      };
    },
    forget() {
      console.log(1);
    },
    register() {
      this.$router.push({
        name: "register",
      });
    },
    getcaptcha() {
      this.captchaSrc = getCaptchaApi();
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
      if (!res.result) this.$message(res.message);
      return res.result;
    },
    async submit() {
      var isValidata = this.getValidataResult();
      if (!isValidata) return;

      const { username, password, captcha } = this;
      let res = await loginApi({
        username,
        password: encrypt(password),
        captcha,
      });
      this.val = res.data.data;
      if (res.data.status == 1) {
        sessionStorage.setItem("token", res.data.data);
        this.$message({
          type: "success",
          message: "登录成功",
        });
        this.$router.push({
          name: "home",
        });
      } else {
        this.getcaptcha();
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.parall {
  width: 800px;
  margin: 100px auto;
  color: #fff;
  display: flex;
}
.box {
  width: 350px;
  height: 500px;
  background-color: rgb(30, 128, 225);
  transform: skew(-10deg);
}
.text {
  display: flex;
  height: 110px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
}
.top {
  display: flex;
  height: 220px;
  align-content: flex-start;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.text1 {
  font-size: 60px;
}
.ddd {
  width: 100px;
  height: 100px;
  background-color: #1c7ddc;
  text-align: center;
  line-height: 70px;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: skew(10deg);
}
.userinfo {
  width: 500px;
  height: 300px;
  background-color: #f5f8fd;
  margin-top: 100px;
  margin-left: -30px;
}
.disp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 80px;
  color: #286bdc;
}
.aas {
  margin-top: 30px;
}
.inp {
  width: 300px;
  height: 25px;
  margin-top: 5px;
}
.btn {
  margin-top: 20px;
  margin-left: 80px;
  width: 310px;
  height: 40px;
  color: #fff;
  border: none;
  background-color: #409eff;
}
.tile {
  width: 1000px;
  height: 600px;
  border: 10px solid rgb(30, 128, 225);
  margin: 50px auto;
}
.aaa {
  margin-top: -50px;
  margin-left: 30px;
}
.lable {
  font-size: 12px;
}
.disps {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 28px;
  color: #286bdc;
  // margin-top: -10px;
}
.verification {
  width: 120px;
  height: 30px;
}
.icon-captcha {
  width: 100px;
  margin-right: 50px;
}
.regist {
  width: 300px;
  color: #000;
  margin-left: 80px;
  margin-top: 20px;
  font-size: 12px;
  cursor: pointer;
}
</style>