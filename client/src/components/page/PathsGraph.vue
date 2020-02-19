<template>
  <!--    卡片视图区-->
  <el-card class="box-card">
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Web测试用例生成</el-breadcrumb-item>
      <el-breadcrumb-item>测试路径提取</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button type="primary" plain @click="getPOG">构建POG</el-button>
          <el-divider></el-divider>
          <el-image :src="require('/Users/zhengjiani/PycharmProjects/PageOs_v0.1/graph.png')" fit="fill" :lazy="true">{{src}}</el-image>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button type="primary" plain>构建POT</el-button>
          <el-divider></el-divider>
          <el-image :src="require('/Users/zhengjiani/PycharmProjects/PageOs_v0.1/tree.png')" fit="fill" :lazy="true">{{src}}</el-image>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button type="primary" plain>生成测试路径集</el-button>
          <el-divider></el-divider>
          <div>
            <ul>
              <li>1:<\HomePage:goto_search,FindPage:goto_detail_page,DetailPage></li>
              <li>2:<\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_add_new_pet,AddNewPetPage:add_new_pet(R1),DetailPage></li>
              <li>3:<\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_edit_pet,PetPage:edit_pet(R1),DetailPage></li>
              <li>4:<\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_visit,AddNewVisitPage:add_visit(R1),DetailPage></li>
              <li>5:<\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_edit,EditOwnerPage:edit_info(R1),DetailPage></li>
              <li>6:<\HomePage:goto_register,RegisterPage:regist_owner(R2),ErrorMsg></li>
              <li>7:<\HomePage:goto_register,RegisterPage:regist_owner(R1),FindPage:goto_detail_page,DetailPage></li>
              <li>8:<\HomePage:goto_Veter,VeterPage></li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        src : ''
      }
    },
    methods: {
      async getPOG() {
        const {data:res} = await this.$http.get("pog_after")
        this.src = res
      }
    }
  }
</script>

<style scoped>
.box-card {
  height: 780px;
}
</style>