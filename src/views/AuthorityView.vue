<template>
  <div>
    <el-container>
      <el-header class="header">
        <p>
          <img src="@/assets/role.png" alt="" class="icon-role" />
        </p>
        <p>角色管理</p>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div>
            <el-link type="primary" class="pd" @click="rouderole"
              >新增角色</el-link
            >
            <el-link type="primary" class="pd-5">新建分組</el-link>
          </div>

          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-submenu
                  :index="index+''"
                  v-for="(item,index) in newList"
                  :key="item.id"
                >
                  <template slot="title">
                    <span>{{ item.label }}</span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="(el,index) in item.children">
                      <el-menu-item :index="index+'-'+index"  :key="index">{{el.roleName}}</el-menu-item>
                    </template>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <div class="text">
            <p class="text-1">所有者</p>
            <p class="text-2">
              系统默认角色，默认具有企业所有功能权限和全部数据可见范围
            </p>
          </div>
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="角色成员" name="first">
                <role-list> </role-list>
              </el-tab-pane>
              <el-tab-pane label="功能权限" name="second">
                <div>
                  <choose-node></choose-node>
                </div>
              </el-tab-pane>
              <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import chooseNode from "@/components/ChooseElace.vue";
import roleList from "@/components/RolelistView.vue";
import { roleGroupList, roleEntry } from "@/api/api";
export default {
  components: {
    chooseNode,
    roleList,
  },
  data() {
    return {
      activeName: "second",
      newList: [],
      a: [],
      data: [
        {
          label: "默認",
          children: [
            {
              groupName: "所有者",
            },
            {
              label: "管理員",
            },
            {
              label: "部門主管",
            },
            {
              label: "成員",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  async created() {
    let [grouplist, rolelist] = await Promise.all([
      roleGroupList({pagination:false}),
      roleEntry({pagination:false}),
    ]);
    rolelist = rolelist.data.data.rows;
    grouplist = grouplist.data.data.rows;
    console.log(rolelist);
    console.log(grouplist);

    grouplist.forEach((group) => {
      var children = rolelist.filter((item) => {
        if (item.groupId == group.id) {
          return item;
        }
      });
      this.newList.push({
        label: group.groupName,
        children: children,
      });
    });
    console.log(this.newList);
  },
  methods: {
    rouderole() {
      this.$router.push({
        name: "newrole",
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scope>
.el-main {
  padding: 0;
}
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.icon-role {
  width: 45px;
}
.el-tree-node__content {
  padding: 20px;
}
.text {
  display: flex;
}
.text-1 {
  font-size: 25px;
  line-height: 5px;
  color: #b39d9d;
}
.text-2 {
  font-size: 16px;
  line-height: 30px;
  color: #ccc;
}
</style>