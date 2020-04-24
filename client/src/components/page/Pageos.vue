<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象文件管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容"
            v-model="queryInfo.query" clearable @clear="getPoLists"
          >
            <el-button slot="append" icon="el-icon-search" @click="getPoLists"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="adddialogVisible = true">添加页面对象</el-button>
        </el-col>
        <el-table :data="polist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="页面对象列表" prop="poname">
          </el-table-column>
          <el-table-column label="页面对象文件路径" prop="file_path">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--编辑按钮-->
              <el-button type="primary" icon="el-icon-edit" size="mini"
              @click="showEditDialog(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="removeFileById(scope.row.id)"></el-button>
              <!--分配角色按钮-->
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>

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
            :total="3">
        </el-pagination>
      </el-row>
    </el-card>
    <!--添加页面对象对话框-->
    <el-dialog
        title="提示"
        :visible.sync="adddialogVisible"
        width="50%"
        @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="文件名" prop="poname">
          <el-input v-model="addForm.poname"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="文件名" prop="poname">
          <el-input v-model="editForm.poname" disabled></el-input>
        </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFileInfo">确 定</el-button>
      </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      //验证上传文件是否以page结尾
      var checkFile = (rule,value,cb) => {
        //验证文件名的正则表达式
        const regFile = /_page$/
        if(regFile.test(value)){
          //合法的文件名
          return cb()
        }
        cb(new Error('请输入合法文件名'))
      }
      return {
        queryInfo: {
          query:'',
          pagenum: 1,
          pagesize: 2
        },
        polist:[],
        //控制添加对话框的显示与隐藏
        adddialogVisible: false,
        //添加页面对象的表单数据
        addForm: {
          poname: ''
        },
        //添加表单的验证规则对象
        addFormRules: {
          poname: [
            {required:true,message:'请输入页面对象名',trigger:'blur'},
            {validator:checkFile,trigger: 'blur'}
          ]
        },
        //控制修改用户对话框的显示与隐藏
        editDialogVisible: false,
        //查询到的用户信息保存
        editForm: {},
        //修改表单的验证规则对象
        editFormRules: {
          poname: [
            {required: true,message:'请输入文件名',trigger:'blur'},
            {validator:checkFile,trigger:'blur'}
          ]
        }
      }
    },
    created() {
      this.getPoLists()
    },
    methods: {
      async getPoLists() {
        const {data:res} = await this.$http.get('polists',{params:this.queryInfo})
        if(res.code !== 0) return this.$message.error('获取页面对象列表失败')
        this.polist = res.data.pos
        this.total = res.data.total
        console.log(res)
      },
      handleSizeChange(newSize) {
        //console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getPoLists()
      },
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.getPoLists()
      },
      //监听添加用户对话框的关闭事件
      addDialogClosed(){
        this.$ref.addFormRef.resetFields()
      },
      //点击按钮，添加新文件
      addUser(){
        this.$refs.addFormRef.validate(async valid => {
          //console.log(valid)
          if(!valid) return
          //可以发起添加文件的网络请求
          const {data:res} = await this.$http.post('pagefiles',this.addForm)
          if(res.meta.status !== 201) {
            this.$message.error('添加页面对象失败')
          }
          this.$message.success('添加用户成功')
          //隐藏添加用户的对话框
          this.adddialogVisible = false
          //重新获取用户列表数据
          this.getPoLists()
        })
      },
      //展示编辑用户对话框
      async showEditDialog(id){
        const{data:res} = await this.$http.get('pagefiles/' + id)
        if(res.meta.status !== 200){
          return this.$message.error('查询页面对象文件失败')
        }
        this.editForm = res.data
        this.editDialogVisible = true
      },
      //监听修改文件对话框的关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields
      },
      //修改文件信息并提交
      editFileInfo() {
        this.$refs.editFormRef.validate(async valid => {
          if(!valid) return
          //发起修改用户信息的数据请求
          const {data:res} = await this.$http.put('pagefiles/'+this.editForm.id,{
            poname: this.editForm.poname
          })
          if(res.meta.status !== 200) {
            return this.$message.error('更新信息失败')
          }
          //关闭对话框
          this.editDialogVisible = false
          //刷新数据列表
          this.getPoLists()
          //提示修改成功
          this.$message.success('更新用户信息成功！')
        })
      },
      //根据Id删除对应的用户信息
      async removeFileById(id) {
        //弹框询问用户是否删除数据
          const confirmResult = await this.$confirm('此操作将永久删除该页面对象文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        //如果用户确认删除，则返回值为字符串confirm
        //如果用户取消了删除，则返回值为字符串 cancel
        if(confirmResult !== 'confirm'){
          return this.$message.info('已经取消删除')
        }
        const {data:res} = await this.$http.delete('pagefiles/'+id)
        if(res.meta.status !== 200) {
          return this.$message.error('删除页面对象文件失败')
        }
        this.$message.success('删除页面文件成功')
        this.getPoLists()
      }
    }
  }
</script>

<style lang="less" scoped>

</style>