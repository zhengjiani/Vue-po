<template>
  <!--    卡片视图区-->
  <el-card>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Web测试用例生成</el-breadcrumb-item>
      <el-breadcrumb-item>测试用例生成</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
      <span class="demonstration">选取测试路径</span>
      <el-cascader
          :options="page_options"
      >
      </el-cascader>
    </div>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="参数名">
            <el-input v-model="input" placeholder="参数名"></el-input>
          </el-form-item>
          <el-form-item label="参数类型">
            <el-cascader
                :options="options"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">添加参数列表</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="makeData">构造MOCK数据</el-button>
          </el-form-item>
        </el-form>
        {{fileContent}}
      </el-col>
      <el-col :span="10">
        <div class="testfiles">
          <el-button type="primary">生成测试用例文件</el-button>
          <el-button type="primary" @click='handleExport'>测试用例预览</el-button>
        </div>
        <a href="http://localhost:5000/testfile/test_pet.py" download="">test_pet.py</a>
        <pre v-highlight>
          <code class="language-python">{{testfile}}</code>
        </pre>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        page_options: [
          {
            value: 'PetClinic_page',
            label: 'PetClinic_page',
            children: [
              {
                value: 'path1',
                label: '<\\HomePage:goto_search,FindPage:goto_detail_page,DetailPage>'
              },
              {
                value: 'path2',
                label: '<\\HomePage:goto_search,FindPage:goto_detail_page,DetailPage>'
              },
              {
                value: 'path3',
                label: '<\\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_edit_pet,PetPage:edit_pet(R1),DetailPage>'
              },
              {
                value: 'path4',
                label: '<\\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_visit,AddNewVisitPage:add_visit(R1),DetailPage>'
              },
              {
                value: 'path5',
                label: '<\\HomePage:goto_search,FindPage:goto_detail_page,DetailPage:goto_edit,EditOwnerPage:edit_info(R1),DetailPage>'
              },
              {
                value: 'path6',
                label: '<\\HomePage:goto_register,RegisterPage:regist_owner(R2),ErrorMsg>'
              },
              {
                value: 'path7',
                label: '<\\HomePage:goto_register,RegisterPage:regist_owner(R1),FindPage:goto_detail_page,DetailPage>'
              },
              {
                value: 'path8',
                label: '<\\HomePage:goto_Veter,VeterPage>'
              }
              ]
          },
          {
            value: 'pageKit_page',
            label: 'pageKit_page'
          },
          {
            value: 'phoneix_page',
            label: 'phoneix_page'
          }

        ],
        options: [
          {
            value: 'person',
            label: 'person',
            children: [
              {
                value: 'name',
                label: 'name'
              },
              {
                value: 'last_name',
                label: 'last_name'
              },
              {
                value: 'first_name',
                label: 'first_name'
              }
            ]
          },
          {
            value: 'phone_number',
            label: 'phone_number'
          },
          {
            value: 'profile',
            label: 'profile'
          },
          {
            value: 'address',
            label: 'address'
          },
          {
            value: 'date_time',
            label: 'date_time'
          },
          {
            value: 'email',
            label: 'email'
          },
          {
            value: 'city',
            label: 'city'
          }
        ],
        input: '',
        fileContent: '',
        testfile: null
      }
    },
    methods: {
      async makeData() {
        const {data:res} = await this.$http.get('/makedata')
        this.fileContent = res.data
        console.log(res)
      },
      async handleExport() {
        const {data:res} = await this.$http.get('/testfile/test_pet.py')
        this.testfile = res
        console.log(res)
      }
    }
  }
</script>

<style lang="less" scoped>
 .demo-form-inline {
  margin-top: 100px;
 }
 .block {
   .el-cascader {
     width: 900px;
   }
 }
 .demonstration {
   margin-right: 20px;
 }
 .testfiles {
   margin-top: 100px;
 }

</style>