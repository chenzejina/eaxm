<template>
  <div>
    <div>
      <h1>所有用戶列表</h1>
      <el-table :data="from" style="width: 100%" >
        <el-table-column label="id" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="昵稱" width="150" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px">{{ scope.row.avatarName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="性別" width="80" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px" v-if="scope.row.sex==1"  >男</span>
              <span style="margin-left: 10px" v-else  >女</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="郵箱" width="200" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px">{{ scope.row.email }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手機號" width="200" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="創建時間" width="200" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span style="margin-left: 10px">{{
                new Date(scope.row.createdAt).toLocaleString()
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
           <el-link type="primary" @click="details">查看用戶詳情</el-link> 
        </el-table-column>
      </el-table> 
    </div>
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
  </div>
</template>

<script>
import { userList } from "@/api/api"; 
export default {
  data() {
    return {
      from: [],
      currentPage4: 1,
      totalpage: 0,
      pageSizes: [2, 10, 20, 30, 40],
      pageSize: 10,
      pageNum: 1,
    };
  },
  created() {
    this.userInforender();
  },
  methods: { 
    details(){
      this.$router.push({
        name:'details',
        query:{

        }
      })
    },
    userInforender() {
      const { pageSize, pageNum } = this;
      userList({
        pageSize: pageSize,
        pageNum: pageNum,
      }).then((res) => {
        this.from = res.data.data.data.rows;
        this.totalpage = res.data.data.data.count;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.userInforender();
    },
    handleCurrentChange(val) {
      this.pageNum = val; 
      this.userInforender();
    },
  },
};
</script>

<style lang="scss" scope>
</style>