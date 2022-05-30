<template>
  <div>
    <div>
      <div class="box">
        <div class="pd-20">新增角色權限</div>
        <div class="item">
          <img src="@/assets/meil.png" alt="" />
          <div class="conunt">系统管理 ·</div>
          <div class="conunt">角色与权限 ·</div>
          <div>新增角色权限</div>
        </div>
      </div>
      <div>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="ruleForm"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option v-for="(itme,index) in list" :key="index" :label="itme.groupName" :value="itme.id"></el-option> 
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()"
                >立即创建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="choose">
          <choose-node></choose-node>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import chooseNode from "@/components/ChooseElace.vue";
import { createRole, roleGroupList } from "@/api/api";
export default {
  components: {
    chooseNode,
  },
  data() {
    return {
      ruleForm: {
        name: "", 
        region:'',
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        bumen: [
          { required: true, message: "请输入所属部门", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
          list:[]
    };
  },
  created() {
    roleGroupList().then((res) => {
       this.list=res.data.data.rows 
    });
  },
  methods: {
    submitForm() {
      createRole({
        roleName:this.ruleForm.name,
        groupId :this.ruleForm.region
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scope>
.box {
  display: flex;
  align-items: center;
}
.item {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.conunt {
  font-size: 16px;
  color: blue;
}
.ruleForm {
  display: flex;
  align-items: center;
}
.choose {
  padding: 30px;
}
</style>