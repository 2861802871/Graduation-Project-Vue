<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
      <el-breadcrumb-item>学分管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="11 ">
        <el-col :span="6">
          <!-- 级联选择器 clearable可清空  show-all-levels="false"不显示完整路径-->
          <div class="block">
            <!-- <span class="demonstration">默认 click 触发子菜单</span> -->
            <el-cascader clearable v-model="CascadeKey" :show-all-levels="false" :options="options" :props="CascaderProps" @change="handleChange"></el-cascader>
          </div>
        </el-col>
        <el-col :span="7">
          <el-input :clearable="true" placeholder="请输入学号" v-model="SearchData" @clear="GetStudentList">
            <el-button slot="append" icon="el-icon-search" @click="GetStudentList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 管理学分表格数据 -->
      <el-table :data="StudentList.users" :border="true" :stripe="true">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="yuanxi" label="院系"></el-table-column>
        <el-table-column prop="discipline" label="专业"></el-table-column>
        <el-table-column prop="whichClas" label="班级"></el-table-column>
        <el-table-column prop="score" label="学分"></el-table-column>
        <el-table-column label="操作" min-width="180px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="EditScoreDialog(scope.row.id)">修改学分</el-button>
            <el-button size="mini" type="success" icon="el-icon-arrow-down" @click="LookScoreDialog(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <!-- 页面显示数据条数变化触发事件，切换页码触发 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="StudentList.pagenum" :page-sizes="[1,5,8,10,50,100,200,500]" :page-size="QueryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="StudentList.totalpage">
      </el-pagination>
    </el-card>

    <!-- 修改学分对话框 -->
    <el-dialog title="修改学分" :visible.sync="EditScoreDialogVisible" width="45%" @close="CloseEditScoreDialog">
      <!-- 修改学分表单 -->
      <el-form :model="EditScoreForm" ref="EditScoreFormRef" label-width="100px" label-position="left" :rules="EditScoreRules">
        <el-form-item label="修改方式" prop="genre">
          <el-radio-group v-model="EditScoreForm.genre">
            <el-radio label="加分"></el-radio>
            <el-radio label="扣分"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="修改分值" prop="score">
          <el-input v-model="EditScoreForm.score"></el-input>
        </el-form-item>
        <el-form-item label="修改原因" prop="reason">
          <el-input type="textarea" v-model="EditScoreForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="EditScoreDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditScore">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看详情对话框 -->
    <el-dialog title="学分详情" :visible.sync="LookScoreDialogVisible" width="60%">
      <el-table :data="ScoreList.StudentScore" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="time" label="日期">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="EditScore" label="分值">
        </el-table-column>
        <el-table-column prop="reason" label="原因">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="LookScoreDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
          score: 90
        }, {
          id: '12345678902',
          name: 'xiaoai',
          gender: '女',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG182',
          phone: '13118545646',
          score: 90
        }, {
          id: '12345678903',
          name: 'xiaoyi',
          gender: '男',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG181',
          phone: '13118573647',
          score: 90
        }, {
          id: '12345678904',
          name: 'xiaobing',
          gender: '男',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG181',
          phone: '13118573647',
          score: 90
        }, {
          id: '12345678905',
          name: 'xiaoai',
          gender: '女',
          identity: '学生',
          yuanxi: '电信学院',
          discipline: '自动化',
          whichClas: '自BG182',
          phone: '13118545646',
          score: 90
        },]
      },
      // 级联选择器配置
      CascaderProps: {
        expandTrigger: 'click',//显示方式
        value: 'label',//选中值
        label: 'label',//展示值
        children: 'children'//嵌套值
      },
      // 级联选择器的值
      CascadeKey: [],
      //   搜索框的值
      SearchData: '',
      //   级联选择器选项数据
      options: [{
        value: 'dianxin',
        label: '电信学院',
        children: [{
          value: 'zidonghua',
          label: '自动化',
          children: [{
            value: 'yizhi',
            label: '自BG181'
          }, {
            value: 'fankui',
            label: '自BG182'
          }, {
            value: 'xiaolv',
            label: '自BG191'
          }, {
            value: 'kekong',
            label: '自BG192'
          }]
        }, {
          value: 'daohang',
          label: '机器人',
          children: [{
            value: 'cexiangdaohang',
            label: '机器人181'
          }, {
            value: 'dingbudaohang',
            label: '机器人182'
          }]
        }, {
          value: 'daohang',
          label: '通信工程',
          children: [{
            value: 'cexiangdaohang',
            label: '通信工程181'
          }, {
            value: 'dingbudaohang',
            label: '机通信工程182'
          }]
        }]
      }, {
        value: 'zujian',
        label: '管理学院',
        children: [{
          value: 'basic',
          label: '会计',
          children: [{
            value: 'layout',
            label: '会计18'
          }, {
            value: 'color',
            label: '会计19'
          }, {
            value: 'typography',
            label: '会计20'
          }, {
            value: 'icon',
            label: '会计21'
          }]
        }, {
          value: 'form',
          label: '旅游管理',
          children: [{
            value: 'radio',
            label: '旅游管理18'
          }, {
            value: 'checkbox',
            label: '旅游管理19'
          }, {
            value: 'input',
            label: '旅游管理20'
          }, {
            value: 'input-number',
            label: '旅游管理21'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '机械工程',
        children: [{
          value: 'axure',
          label: '汽车服务工程',
          children: [{
            value: 'sketch',
            label: '汽车服务工程18'
          }, {
            value: 'sketch',
            label: '汽车服务工程19'
          }, {
            value: 'sketch',
            label: '汽车服务工程20'
          }]
        }, {
          value: 'sketch',
          label: '机械设计制造及其自动化',
          children: [{
            value: 'sketch',
            label: '机械设计制造及其自动化18',
          }, {
            value: 'sketch',
            label: '机械设计制造及其自动化19',
          }, {
            value: 'sketch',
            label: '机械设计制造及其自动化20',
          },]
        }]
      }],
      // 修改学分对话框是否显示
      EditScoreDialogVisible: false,
      // 修改或查看学分的学生id
      StudentId: '',
      // 加减学分的分值
      EditScoreForm: {
        genre: '',
        score: '',
        reason: ''
      },
      // 修改学分表单验证规则
      EditScoreRules: {
        genre: [{ required: true, message: "请选择修改形式", trigger: "blur" }],
        score: [{ required: true, message: "请输入修改分值", trigger: "blur" }],
        reason: [{ required: true, message: "请输入修改原因", trigger: "blur" }],
      },
      // 查看学分详情显示与否
      LookScoreDialogVisible: false,
      // 学分详情模拟数据
      ScoreList: {
        // 一共多少条数据
        totalpage: 5,
        // 当前页码
        pagenum: 1,
        // 转换时间格式标志
        StudentScoreKey: false,
        // 用户数据
        StudentScore: [{
          id: '12345678901',
          name: 'xiaobing',
          time: new Date(),
          type: '扣除',
          EditScore: '2',
          reason: '扰乱课堂纪律'
        }, {
          id: '12345678901',
          name: 'xiaobing',
          time: new Date(),
          type: '扣除',
          EditScore: '2',
          reason: '扰乱课堂纪律'
        }, {
          id: '12345678901',
          name: 'xiaobing',
          time: new Date(),
          type: '扣除',
          EditScore: '2',
          reason: '扰乱课堂纪律'
        }, {
          id: '12345678901',
          name: 'xiaobing',
          time: new Date(),
          type: '扣除',
          EditScore: '2',
          reason: '扰乱课堂纪律'
        }, {
          id: '12345678901',
          name: 'xiaobing',
          time: new Date(),
          type: '扣除',
          EditScore: '2',
          reason: '扰乱课堂纪律'
        },]
      },
    }
  },
  created () { },
  methods: {
    handleChange () {
      console.log('通过级联选择器搜索');
      //   返回级联选择器最后一个元素
      console.log(this.CascadeKey.pop());
    },
    GetStudentList (data) {
      console.log('通过学号搜索');
      console.log(this.SearchData);
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

    // 显示修改学分对话框
    EditScoreDialog (NewId) {
      this.EditScoreDialogVisible = true
      this.StudentId = NewId
      console.log('修改' + this.StudentId + '的学分');
    },
    //提交修改学分
    EditScore () {
      // 数据预验证
      this.$refs.EditScoreFormRef.validate(async valid => {
        if (!valid) return this.$message.error('数据预验证失败，请检查输入是否有误！')
        // const { data: res } = await this.$http.post(`score${this.StudentId}`, this.EditScoreForm)
        // if (res.meta.status !== 200) return this.$message.error('修改学分数失败')
        console.log(this.EditScoreForm);
        this.$message.success('修改学分数成功')
        console.log('修改' + this.StudentId + '的学分成功');
        this.EditScoreDialogVisible = false
      })
    },
    // 关闭修改学分的对话框重置表单
    CloseEditScoreDialog () {
      this.$refs.EditScoreFormRef.resetFields()
    },
    // 查看详情
    LookScoreDialog (NewId) {
      this.LookScoreDialogVisible = true
      this.StudentId = NewId
      if (!this.StudentScore) {
        this.ScoreList.StudentScore.forEach((value, index, arry) => {
          var time = this.ScoreList.StudentScore[index].time
          // 转换时间格式
          this.ScoreList.StudentScore[index].time = this.TimeConvert(time)
          console.log(value);
        });
      }
      this.StudentScore = true
      console.log('查看' + this.StudentId + '的学分详情');
    },
    // 时间转换函数
    TimeConvert (time) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1
      var day = time.getDay()
      return year + '年' + month + '月' + day + '日'
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  padding: 15px 0;
}
</style>