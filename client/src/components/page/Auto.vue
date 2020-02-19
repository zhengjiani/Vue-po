<template>
  <div>
<!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象自动生成</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片视图区-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>HTML文档</h3>
          <el-upload
              class="upload-demo"
              action="http://localhost:5000/upload"
              :on-change="handleImport"
              :on-preview="handlePreview"
              :limit="1"
              :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传html文件</div>
          </el-upload>
          <pre v-highlight>
            <code class="language-html">{{fileContent}}</code>
          </pre>
        </el-col>
        <el-col :span="12">
          <el-button size="small" type="primary" @click="downloadFile">页面对象生成</el-button>
          <pre>
            <code class="language-python">{{pofile}}</code></pre>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        uploadFile: null,
        fileContent: null,
        pofile: null

      }
    },
    methods: {
      handleImport(file) {
        this.uploadFile = file
        let reader = new FileReader()
        reader.readAsText(this.uploadFile.raw)
        reader.onload = async (e) => {
          try {
            this.fileContent = e.target.result
          } catch (err) {
            console.log(`Load HTML file error: ${err.message}`)
          }
        }
      },
      handlePreview() {
        let myWindow = window.open();
        myWindow.document.write(this.fileContent);
        myWindow.document.close();
      },
      async downloadFile() {
        const {data:res} = await this.$http.get('/download/MySite.py')
        this.pofile = res
        console.log(res)
      }

    }
  }
</script>

<style lang="less" scoped>
.box-card {
    height: 880px;
  }
</style>