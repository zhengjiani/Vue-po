<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象</el-breadcrumb-item>
      <el-breadcrumb-item>页面对象手动编写</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <h2>手动编写页面对象类规范</h2>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="编写框架链接" name="1">
          <div>
            <el-link type="primary">https://github.com/edx/bok-choy</el-link>
            <ul>
              <li>功能页面对象继承BasePage类</li>
              <li>方法注释中将需返回页面对象标注</li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item title="编写XPath表达式规范" name="2">
          <ul>
            <li>避免使用绝对路径的XPATH表达式</li>
            <li>采用有代表性的元素进行相对路径定位，比如带有id或者form的父级元素</li>
            <li>使用组元素定位模块以及多用contains模糊匹配通过具有特殊语义的标签进行定位</li>
            <li>使用XPATH表达式的索引也可以更快定位到元素</li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="编写示例" name="3">
          <code><pre>
            class FindPage(BasePage):
                name = "owners"
                def is_browser_on_page(self):
                    return "Owners" in self.q('//h2').text

                def find_owner(self, first_name):
                    self.q(xpath='//input').fill(first_name)

                def get_owners(self):
                    owners = []
                    els = self.q(xpath='//table/tbody/tr')
                    for el in els:
                        owners.append(el.text)
                    return owners

                def goto_detail_page(self, owner):
                    '''
                    :param owner: firstname lastname
                    :return: DetailPage
                    '''
                    self.q(xpath='//tbody/tr/td/a[contains(text(),"{}")]'.format(owner))
                    return DetailPage(self.browser).wait_for_page()
          </pre></code>
        </el-collapse-item>
      </el-collapse>
      <!--使用 Tinymce.vue 组件-->
      <tinymce_editor v-model="msg"
                      :disabled="disabled"
                      @onClick="onClick"
                      ref="editor">

      </tinymce_editor>
    </el-card>
  </div>
</template>

<script>
  import TinyMce from '../../components/Tinymce';
  export default {
    components:{
      tinymce_editor:TinyMce,
    },
  }

</script>

<style scoped>

</style>