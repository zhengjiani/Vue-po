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
          <!--文件上传-->
          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:5000/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传python文件</div>
          </el-upload>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getPODict">显示图字典</el-button>
          <p>{{dic}}</p>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="getPOGraph">导航图可视化</el-button>
          <div class="demo-image__placeholder">
            <div class="block">
              <span class="demonstration">页面对象导航图</span>
              <el-image :src="require('/Users/zhengjiani/WebstormProjects/vue-po/Vue-po/client/src/assets/petclinic_POG.png')" fit="fill" :lazy="true">{{src}}</el-image>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-steps :active="1">
        <el-step title="Step 1" icon="el-icon-edit" description="上传页面对象类文件"></el-step>
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
        file : '',
        dic : {},
        src : ''
      };
    },
    methods: {
      submitUpload() {
        const {data: res} = this.$http.post("upload",this.file);
        this.$refs.upload.submit();
        if (res.status !== 200)  return this.$message.error("上传失败");
        this.$message.success("上传成功");

      },
      async getPODict() {
        const {data:res} = await this.$http.get("pogdict")
        this.dic = res.data
        console.log(res.data)
      },
      async getPOGraph() {
        const {data:res} = await this.$http.get("pog")
        this.src = res
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
.box-card {
  height: 780px;
}
.el-steps {
  padding-top: 80px;
}
</style>