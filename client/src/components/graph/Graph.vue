<template>
  <div>
    <!--    卡片视图区-->
    <el-card class="box-card">
      <!--    面包屑导航区域-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>Web应用导航图</el-breadcrumb-item>
        <el-breadcrumb-item>Web应用导航图生成</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="20">
        <el-col :span="6">
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
        </el-col>
        <el-col :span="6">
          <h3>Web应用名称 {{this.pagename}}</h3>
          <el-button type="primary" @click="getPODict">显示图字典</el-button>
          <p>{{dic}}</p>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="getPOGraph">导航图可视化</el-button>
          <div class="demo-image__placeholder">
            <div v-show="isShow" v-if="this.pagename==='PetClinic_page'" class="block">
              <el-image
                  :src="require('@/assets/PetClinic_page.png')"
                  ></el-image>
            </div>
            <div v-show="isShow" v-else-if="this.pagename==='pageKit_page'" class="block">
              <el-image
                  :src="require('@/assets/pageKit_page.png')"
              ></el-image>
            </div>
            <div v-show="isShow" v-else class="block">
              <el-image
                  :src="require('@/assets/phoenix_page.png')"
              ></el-image>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-steps :active="1">
        <el-step title="Step 1" icon="el-icon-edit" description="选择页面对象类文件"></el-step>
        <el-step title="Step 2" icon="el-icon-upload" description="显示图字典"></el-step>
        <el-step title="Step 3" icon="el-icon-picture" description="生成Web应用导航图"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        file : '',
        dic : {},
        src : '',
        pagename: '',
        option: ''
      };
    },
    methods: {
      handleCommand(command) {
        this.pagename = command
        this.option = command
      },
      async getPODict() {
        const {data:res} = await this.$http.post("pog",{"pagename":this.option})
        console.log(res)
        this.dic = res.data.pog_dic
        this.pagename = res.data.pagename
      },
      async getPOGraph() {
        const {data:res} = await this.$http.post("pog",{"pagename":this.option})
        this.src = res.data.pog_graph
        this.isShow = true
        console.log(this.src)


      },
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }

</script>

<style lang="less" scoped>
.el-steps {
  padding-top: 80px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 18px;
}
</style>