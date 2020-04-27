<template>
  <!--    卡片视图区-->
  <el-card class="box-card">
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Web测试用例生成</el-breadcrumb-item>
      <el-breadcrumb-item>测试路径提取</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              选择页面对象文件<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="PetClinic_page">PetClinic</el-dropdown-item>
        <el-dropdown-item command="pageKit_page">pageKit</el-dropdown-item>
        <el-dropdown-item command="phoenix_page">phoenix</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-table
        :data="pagepaths"
        height="500"
        border
        style="width: 100%">
      <el-table-column
          label="方法序列"
          width="180">
        <ul>
          <li v-for="item in methods" :key="item">
            {{item}}
          </li>
        </ul>
      </el-table-column>
      <el-table-column
          prop="pathlists"
          label="路径序列">
        <ul>
          <li v-for="item in pathlists" :key="item">
            {{item}}
          </li>
        </ul>
      </el-table-column>
      <el-table-column
          prop="tree_dic"
          label="迁移树字典">
      </el-table-column>
      <el-table-column
          prop="tree_visual"
          label="迁移树可视化文件路径">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        pagepaths:[],
        methods:[],
        pathlists:[],
        option: ''
      }
    },
    created() {
      this.getPathList()
    },
    methods: {
      async handleCommand(command) {
        this.option = command
        console.log(this.option)
        const {data: res} = await this.$http.post("transtree", {"pagename": this.option})
        if (res.code !== 0) return this.$message.error('获取路径列表失败')
        this.pagepaths = res.data.paths
        this.methods = res.data.paths[0].methods
        this.pathlists = res.data.paths[0].pathlists
        console.log(res)
      }
    }
  }
</script>

<style scoped>
.el-table {
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>