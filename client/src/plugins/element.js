import Vue from 'vue'
//导入弹框提示组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Upload,
  Image,
  Scrollbar,
  Divider,
  Pagination,
  Tooltip,
  Dialog,
  MessageBox,
  Cascader,
  Select,
} from "element-ui"

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Image);
Vue.use(Scrollbar);
Vue.use(Divider);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Cascader);
Vue.use(Select)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
