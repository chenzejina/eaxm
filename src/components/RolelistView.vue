<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userId" label="角色ID" width="80"> </el-table-column>
      <el-table-column prop="roleName" label="名称" width="180"> </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="220"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {roleEntry} from '@/api/api'
export default {
    data(){
        return{
             tableData: [],

        }
    },
    created(){
      roleEntry({pagination: false}).then(res=>{
        console.log(res);
        this.tableData=res.data.data.rows
      })
    }
}
</script>