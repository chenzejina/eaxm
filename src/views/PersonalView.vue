<template>
  <div>
    <div>
      <div>
        <div class="box">
          <p class="mr-5 info">基本信息</p>
        </div>
        <div class="boxs">
          <div class="form">
            <label for="" class="label">账号名称</label>
            <el-input
              v-model="form.avatarName"
              class="inp"
              maxlength="8"
              placeholder="请输入内容"
              show-word-limit
              minlength="4"
            ></el-input>
          </div>
        </div>
        <div class="boxs">
          <div class="form">
            <label for="" class="label">真实姓名</label>
            <el-input
              v-model="form.name"
              class="inp"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
        <div class="boxs">
          <div class="form">
            <label for="" class="labels">性别</label>
            <el-radio v-model="form.sex" class="inp" :label="1">男</el-radio>
            <el-radio v-model="form.sex" class="inp" :label="0">女</el-radio>
          </div>
        </div>
      </div>
      <div class="boxs">
        <div class="form">
          <label for="" class="label">所在地</label>
          <el-select
            v-model="form.provinceNo"
            class="select"
            placeholder="请选择"
          >
            <el-option
              v-for="item in provicet"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select v-model="form.cityNo" class="select" placeholder="请选择">
            <el-option
              v-for="item in citydata"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="form.areaNo"
            class="select"
            v-if="countdata"
            placeholder="请选择"
          >
            <el-option
              v-for="item in countdata"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="boxs">
        <div class="form">
          <label for="" class="label">简介</label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.desc"
            class="inp"
          >
          </el-input>
        </div>
      </div>
      <div class="btn">
        <el-button type="success" @click="modify" round>保存</el-button>
        <el-button round>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfoApi, modifyInformation } from "@/api/api";
import { data } from "@/assets/utils/index";
export default {
  data() {
    return {
      provicet: data,
      citydata: [],
      countdata: [],
      form: {   
        sex: "",
        avatarName: "",
        name: "",
        provinceNo: "",
        cityNo: "",
        areaNo: "",   
        desc: "",
      },
    };
  },
  created() {
    getUserInfoApi().then((res) => {
      this.form = res.data.data[0];  
    });
  },
  watch: {
    "form.provinceNo": function (newval) {
      var res = this.provicet.find((item) => item.code == newval);
      this.citydata = res && res.children ? res.children : [];
      if (this.form.cityNo) {
        let citydata = this.citydata.find(
          (item) => item.code == this.form.cityNo
        );
        this.form.cityNo = citydata && citydata.code ? citydata.code : "";
      }
    },
    "form.cityNo": function (newval) {
      var res = this.citydata.find((item) => item.code == newval);
      this.countdata = res && res.children ? res.children : [];
      if (this.form.areaNo) {
        let countdata = this.countdata.find(
          (item) => item.code == this.form.areaNo
        );
        this.form.areaNo = countdata && countdata.code ? countdata.code : "";
      }
    },
  },
  methods: { 
    parameter() {
      var res = {};
      res.sex = this.form.sex;
      res.name = this.form.name;
      res.provinceNo = this.form.provinceNo;
      res.cityNo = this.form.cityNo;
      res.desc = this.form.desc;
      res.areaNo = this.form.areaNo;
      res.avatarName = this.form.avatarName;
      return res;
    },
    modify() {
      const params = this.parameter();
      modifyInformation(params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.box {
  width: 500px;
  border-bottom: 1px solid #f7f7f7;
}
.boxs {
  width: 800px;
  margin-top: 10px;
}
.info {
  font-size: 18px;
  font-weight: 800;
}
.form {
  display: flex;
  align-items: center;
}
.label {
  width: 100px;
  text-align: end;
  color: #ccc;
}
.labels {
  width: 80px;
  text-align: end;
  color: #ccc;
}
.inp {
  margin-left: 20px;
}
.select {
  margin-left: 40px;
  margin-right: 35px;
}
.btn {
  margin: 20px 100px;
}
</style>
