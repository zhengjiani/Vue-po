<template>
  <!--    卡片视图区-->
  <el-card>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Web测试用例生成</el-breadcrumb-item>
      <el-breadcrumb-item>测试用例生成</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
        <!--步骤条-->
        <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
          <el-step title="选择测试路径" ></el-step>
          <el-step title="构造Mock数据" ></el-step>
          <el-step title="生成测试用例" ></el-step>
        </el-steps>
        <div class="transfer_box">
          <el-transfer
              :titles="['选择测试路径', '已选中测试路径']"
              :data="data"
              @change="handleChange"
              v-model="value1">
          </el-transfer>
        </div>
        <!--选中的路径列表-->
        <h3>您选择要生成测试用例的测试路径为</h3>
        <div class="lists" v-for="item in data" :key="item">
          <li v-if="item['key'] in value1">
            {{item['key']+item["label"]}}
          </li>
        </div>

        <!--功能按钮区-->
        <div class="func_btn">
          <el-button type="primary" @click="dialogTableVisible = true">构建Mock数据</el-button>
          <el-button type="primary">生成测试用例</el-button>
        </div>
        <!--构建Mock数据的dialog-->
        <el-dialog title="根据您选择的测试路径生成的Mock数据" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="path" label="路径编号" width="100px"></el-table-column>
            <el-table-column property="mock" label="参数列表"></el-table-column>
            <el-table-column property="modify" label="Mock数据" width="100px"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
      </el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
          <el-step title="选择测试应用" ></el-step>
          <el-step title="选择测试用例" ></el-step>
          <el-step title="生成测试套件" ></el-step>
        </el-steps>
      </div></el-col>
    </el-row>

  </el-card>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        const pathlists = [
          [
            "FindPage",
            "DetailPage",
            "AddNewPetPage"
          ],
          [
            "FindPage",
            "DetailPage",
            "EditOwnerPage"
          ],
          [
            "FindPage",
            "DetailPage",
            "PetPage"
          ],
          [
            "FindPage",
            "DetailPage",
            "PetPage"
          ],
          [
            "FindPage",
            "DetailPage",
            "AddNewVisitPage",
            "DetailPage",
            "DetailPage",
            "DetailPage",
            "DetailPage"
          ]
        ];
        for (let i = 0; i <= pathlists.length-1; i++) {
          data.push({
            key: i,
            label: ` ${ pathlists[i] }`,
          });
        }
        console.log(_);
        return data;
      };
      return {
        moved: [],
        data: generateData(),
        value1: [],
        dialogTableVisible: false,
        gridData: [],
        ans:''
      };
    },
    created() {
      this.get_mockdata()
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        const params = [
          [
            "firstname,lastname"
          ],
          [
            "firstname,lastname"
          ],
          [
            "firstname,lastname",
            "pet_name"

          ],
          [
            "firstname,lastname",
            "pet_name"
          ],
          [
            "firstname,lastname",
            "pet_name",
            "date",
            "desc"
          ]
        ];

        for (let i = 0; i <= movedKeys.length - 1; i++) {
          const para = [];
          para.push(params[movedKeys[i]]);
          this.gridData.push({
            path: movedKeys[i],
            mock: ` ${params[movedKeys[i]]}`,
            modify: this.ans
          });
          console.log(para)
        }

      },
      async get_mockdata() {
        const {data: res} = await this.$http.post('mockdata', {"params": ["firstname,lastname"]});
        this.ans = JSON.stringify(res.data.ans)
      }

    }
  };
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;

    }
  }

  .el-col {

    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;

  }

  .bg-purple {
    background: #f2f2f2;
    height: 700px;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-card {
    height: 800px;
  }
  .el-steps {
    margin-bottom: 20px;
  }
  .transfer_box {
    display:flex;
    justify-content:center;
    align-items: center;
  }




</style>