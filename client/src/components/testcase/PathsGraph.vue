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
          <el-table :data="pathlist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="路径集列表" prop="pathname" width="430px">
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <!--编辑按钮-->
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页区域-->
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1,2,5,10]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        src : '',
        //获取路径列表的参数对象
        queryInfo: {
          query: '',
          //当前页数
          pagenum: 0,
          //当前每页显示多少条数据
          pagesize: 0,
        },
        pathlist: [],
        total : 0,
      }
    },
    created() {
      this.getPathList()
    },
    methods: {
      async getPOG() {
        const {data:res} = await this.$http.get("pog_after")
        this.src = res
      },
      async getPathList() {
        const {data:res} = await this.$http.get('pathlists',{
          params:this.queryInfo
        })
        // console.log(res)
        if(res.meta.status !== 200) {
          return this.$message.error('获取路径列表失败！')
        }
        this.pathlist = res.data.paths
        this.total = res.data.total
      },
      //坚听pagesize改变的事件
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pagesize=newSize
        this.getPathList()
      },
      //监听页码值改变的事件
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getPathList()
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