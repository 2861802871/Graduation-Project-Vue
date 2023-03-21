<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input :clearable="true" placeholder="请输入学号" v-model="SearchData" @clear="GetStudentList">
            <el-button slot="append" icon="el-icon-search" @click="GetStudentList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="AddStudentDialog">添加学生用户</el-button>
        </el-col>
      </el-row>
      <!-- 学生数据表格 -->
      <el-table :data="StudentList.users" :border="true" :stripe="true">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="id" label="学号" min-width="90px"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="identity" label="角色"></el-table-column>
        <el-table-column prop="yuanxi" label="院系"></el-table-column>
        <el-table-column prop="discipline" label="专业"></el-table-column>
        <el-table-column prop="whichClas" label="班级"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="90px"></el-table-column>
        <el-table-column label="操作" width="185px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="EditStudentInfoDialog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="DeleteStudent(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <!-- 页面显示数据条数变化触发事件，切换页码触发 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="StudentList.pagenum" :page-sizes="[1,5,8,10,50,100,200,500]" :page-size="QueryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="StudentList.totalpage">
      </el-pagination>
    </el-card>

    <!-- 添加学生用户对话框 -->
    <el-dialog title="" :visible.sync="AddStudentDialogVisible" width="40%" @close="CloseAddStudentDialog">
      <!-- tabs标签 -->
      <el-tabs type="border-card" :stretch="true">
        <el-tab-pane>
          <span slot="label">添加学生</span>
          <!-- 学生注册表单 -->
          <el-form :model="AddStudentForm" :rules="AddStudentFormRules" ref="AddStudentFormRef" label-width="100px" label-position="left">
            <el-form-item label="学号" prop="id">
              <el-input v-model="AddStudentForm.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="AddStudentForm.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="AddStudentForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="AddStudentForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="院系" prop="yuanxi">
              <el-input v-model="AddStudentForm.yuanxi"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="discipline">
              <el-input v-model="AddStudentForm.discipline"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="whichClas">
              <el-input v-model="AddStudentForm.whichClas"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="AddStudentForm.phone"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddStudentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddStudent">添加</el-button>
      </span>
    </el-dialog>

    <!-- 编辑学生对话框 -->
    <el-dialog title="提示" :visible.sync="EditDialogVisible" width="40%" @close="CloseEditStudent">
      <!-- 编辑学生表单 -->
      <el-form :model="EditStudentInfo" :rules="AddStudentFormRules" ref="EditStudentFormRef" label-width="100px" label-position="left">
        <el-form-item label="学号">
          <!-- 学号作为登录账号禁止修改学号 -->
          <el-input v-model="EditStudentInfo.id" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="EditStudentInfo.password"></el-input>
        </el-form-item> -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="EditStudentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="EditStudentInfo.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="院系" prop="yuanxi">
          <el-input v-model="EditStudentInfo.yuanxi"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="discipline">
          <el-input v-model="EditStudentInfo.discipline"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="whichClas">
          <el-input v-model="EditStudentInfo.whichClas"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="EditStudentInfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LoginVue from '../Login.vue'
export default {
  data () {
    return {
      // 请求参数
      QueryInfo: {
        // 查询参数用于搜索用户
        query: '',
        // 当前显示页码
        pagenum: 1,
        // 每页显示几条数据
        pagesize: 10,
      },
      // 编辑学生对话框显示与否
      EditDialogVisible: false,
      // 编辑学生的学生数据
      EditStudentInfo: {},
      // 学生数据列表
      StudentList: {
        // 一共多少条数据
        totalpage: 5,
        // 当前页码
        pagenum: 1,
        // 用户数据
        users: [{
          id: '12345678901',
          name: 'xiaobing',
          gender: '男',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG181',
          phone: '13118573647',
        }, {
          id: '12345678902',
          name: 'xiaoai',
          gender: '女',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG182',
          phone: '13118545646',
        }, {
          id: '12345678903',
          name: 'xiaoyi',
          gender: '男',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG181',
          phone: '13118573647',
        }, {
          id: '12345678904',
          name: 'xiaobing',
          gender: '男',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG181',
          phone: '13118573647',
        }, {
          id: '12345678905',
          name: 'xiaoai',
          gender: '女',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG182',
          phone: '13118545646',
        },]
      },
      // 搜索学生输入数据
      SearchData: '',
      // 添加学生对画框显示与否
      AddStudentDialogVisible: false,
      // 添加学生用户表单数据
      AddStudentForm: {//账号
        id: '',
        //密码
        password: '',
        //姓名
        name: '',
        //性别
        gender: '',
        //身份
        identity: '学生',
        //院系
        yuanxi: '',
        //专业
        discipline: '',
        //班级
        whichClas: '',
        //电话
        phone: '',
        //分数
        score: 100
      },
      // 添加学生表单验证规则
      AddStudentFormRules: {
        id: [{ required: true, message: "请输入学号/工号", trigger: "blur" }],
        password: [{ required: true, message: "请设置密码", trigger: "blur" }],
        identity: [{ required: true, message: "请选择角色", trigger: "blur" }],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "输入长度在2~10个字符", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        yuanxi: [{ required: true, message: "请输入院系", trigger: "blur" }],
        discipline: [{ required: true, message: "请输入专业", trigger: "blur" }],
        whichClas: [{ required: true, message: "请输入班级", trigger: "blur" }],
        phone: [{ required: true, message: "请输入班级", trigger: "blur" },
        { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' },
        {
          pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: '请输入正确的手机号码', trigger: 'blur'
        },]
      },
    }
  },
  methods: {
    // 获取用户信息
    async GetStudentList () {
      // 数据获取请求以写好修改正确的请求地址即可
      // const { data: res } = await this.$http.get('student')
      // if (res.meta.status !== 200) return this.$message.error('获取学生列表失败')
      // this.StudentList = res.data
      console.log('获取页面数据成功');
    },
    // 分页页码显示数据条数发生变化
    handleSizeChange (NewSize) {
      // 将变化后的数据条数赋值
      this.QueryInfo.pagesize = NewSize
      // 刷新数据
      this.GetStudentList()
      console.log('当前每页显示' + NewSize + '条数据');
    },
    // 分页当切换显示页码时触发
    handleCurrentChange (NewPage) {
      this.QueryInfo.pagenum = NewPage
      // 刷新数据
      this.GetStudentList()
      console.log('当前显示第' + NewPage + '页');
    },

    // 显示添加学生对话框
    AddStudentDialog () {
      this.AddStudentDialogVisible = true
    },
    // 添加学生操作
    AddStudent () {
      this.$refs.AddStudentFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据预验证失败，请检查输入信息')
        // 修改正确url地址
        // const { data: res } = await this.$http.post('regUser', this.RegUserForm)
        // // 注册失败
        // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // 刷新数据
        this.GetStudentList()
        // 注册成功
        this.StudentList.users.push(this.AddStudentForm)
        this.StudentList.totalpage++
        this.AddStudentDialogVisible = false
        this.$message.success('添加成功！')
      })
    },
    // 关闭添加学生对话框重置表单
    CloseAddStudentDialog () {
      this.$refs.AddStudentFormRef.resetFields()
    },
    // 删除学生
    DeleteStudent (StudentId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 修改正确url地址
        // const { data: res } = await this.$http.delete(`student${StudentId}`)
        // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // 刷新数据
        this.GetStudentList()
        console.log('删除id=' + StudentId + '的学生');
        // 刷新数据
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 编辑学生用户信息显示
    EditStudentInfoDialog (StudentInfo) {
      this.EditDialogVisible = true
      this.EditStudentInfo = StudentInfo
    },
    // 编辑学生信息提交
    async EditStudent () {
      // 修改正确url地址
      // const { data: res } = await this.$http.post(`edit/student/${StudentInfo.id}`, this.EditStudentInfo)
      // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 刷新数据
      this.GetStudentList()
      console.log('编辑学生:' + this.EditStudentInfo.name)
      console.log(this.EditStudentInfo);
      this.EditDialogVisible = false

    },
    // 关闭编辑学生对话框重置表单
    CloseEditStudent () {
      this.$refs.EditStudentFormRef.resetFields()
      this.EditStudentInfo = {}
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  padding: 15px 0;
}
</style>