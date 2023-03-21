<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>事假中心</el-breadcrumb-item>
      <el-breadcrumb-item>审批假条</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card>
      <el-table :data="ApprovalData.ApplyList" border style="width: 100%">
        <el-table-column prop="name" label="请假人">
        </el-table-column>
        <el-table-column prop="id" label="学号" min-width="120">
        </el-table-column>
        <el-table-column prop="date1" label="开始时间" min-width="105">
        </el-table-column>
        <el-table-column prop="date2" label="结束时间" min-width="105">
        </el-table-column>
        <el-table-column prop="ApprovalStatus" label="状态">
        </el-table-column>
        <el-table-column v-if="false" prop="ApprovaId" label="审核人id">
        </el-table-column>
        <el-table-column v-if="false" prop="ApplyTime" label="提交申请的时间">
        </el-table-column>
        <el-table-column v-if="false" prop="describe" label="请假原因">
        </el-table-column>
        <el-table-column v-if="false" prop="FindStatus" label="是否通过">
        </el-table-column>
        <el-table-column v-if="false" prop="opinion" label="审核意见">
        </el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" :disabled="scope.row.ApprovalStatus==='待审核'?false:true" @click="ApprovaDialog(scope.row,scope.$index)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <!-- 页面显示数据条数变化触发事件，切换页码触发 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ApprovalData.pagenum" :page-sizes="[1,5,8,10,50,100,200,500]" :page-size="QueryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="ApprovalData.totalpage">
      </el-pagination>
    </el-card>
    <!-- 审核对话框 -->
    <el-dialog title="请假审核" :visible.sync="ApprovaDialogVisible" width="60%">
      <div>
        <el-card style="margin-bottom:10px">
          <div>
            <h1>请假条</h1>
            <span>&emsp;&emsp;{{ApprovaRowData.describe}}</span>
          </div>
        </el-card>
        <el-form :model="ApprovaRowData" ref="OpinionRef" size="small">
          <div style="margin-bottom:10px">审核意见：</div>
          <el-form-item>
            <el-input type="textarea" v-model="ApprovaRowData.opinion"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RejectApply">拒 绝</el-button>
        <el-button type="primary" @click="AgreeApply">同 意</el-button>
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
      // 转换时间格式标志
      key: false,
      // 登录用户的信息
      UserInfo: [],
      //请假数据
      ApprovalData: {
        totalpage: 6,
        // 当前页码
        pagenum: 1,
        // 用户数据
        ApplyList: [{
          ApprovaId: '',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。',
          ApprovalStatus: '待审核',
          // 审核结果
          FindStatus: '',
          // 审核意见
          opinion: '',
        },
        {
          ApprovaId: '',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '公务员了考试',
          ApprovalStatus: '待审核',
          opinion: '',
          FindStatus: ''
        },
        {
          ApprovaId: '',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。',
          ApprovalStatus: '待审核',
          FindStatus: '',
          opinion: '',
        },
        {
          ApprovaId: '',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '公务员了考试',
          ApprovalStatus: '待审核',
          opinion: '',
          FindStatus: ''
        }, {
          ApprovaId: '',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。',
          ApprovalStatus: '待审核',
          FindStatus: '',
          opinion: '',
        },
        {
          ApprovaId: '',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '公务员了考试',
          ApprovalStatus: '待审核',
          opinion: '',
          FindStatus: ''
        },]
      },
      // 审核对话框显示与否
      ApprovaDialogVisible: false,
      // 审核时单行数据
      ApprovaRowData: {
        // index: '',
      }
    }
  },
  created () {
    //  读取登录用户的信息
    this.UserInfo = JSON.parse(window.sessionStorage.getItem('UserInfo'))
    console.log(this.UserInfo);
    // 时间转换
    if (!this.key) {
      this.ApprovalData.ApplyList.forEach((value, index, arry) => {
        this.ApprovalData.ApplyList[index].ApplyTime = this.TimeConvert(value.ApplyTime)
        this.ApprovalData.ApplyList[index].date1 = this.TimeConvert(value.date1)
        this.ApprovalData.ApplyList[index].date2 = this.TimeConvert(value.date2)
        this.ApprovalData.ApplyList[index].ApprovaId = this.UserInfo.id
      });
      this.key = true
    }
  },
  methods: {
    // 分页页码显示数据条数发生变化
    handleSizeChange (NewSize) {
      // 将变化后的数据条数赋值
      this.QueryInfo.pagesize = NewSize
      // 刷新数据

      console.log('当前每页显示' + NewSize + '条数据');
    },
    // 分页当切换显示页码时触发
    handleCurrentChange (NewPage) {
      this.QueryInfo.pagenum = NewPage
      // 刷新数据

      console.log('当前显示第' + NewPage + '页');
    },
    // 时间转换函数
    TimeConvert (time) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1
      var day = time.getDay()
      return year + '年' + month + '月' + day + '日'
    },
    // 审核对话框是否显示
    ApprovaDialog (RowData, index) {
      this.ApprovaDialogVisible = true
      this.ApprovaRowData = RowData
      this.ApprovaRowData.index = index
      console.log(this.ApprovalData.ApplyList[index]);
      console.log(RowData);
    },
    // 拒绝申请
    RejectApply () {
      this.$confirm('确认后无法修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {

        console.log();
        this.ApprovaDialogVisible = false
        this.$message({
          type: 'error',
          message: '审核不通过!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 同意申请
    AgreeApply () {
      this.$confirm('确认后无法修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ApprovaRowData.ApprovalStatus = '已审核'
        this.ApprovaRowData.FindStatus = '审核通过'
        this.ApprovalData.ApplyList[this.ApprovaRowData.index] = this.ApprovaRowData
        console.log(this.ApprovaRowData);
        this.ApprovaDialogVisible = false
        this.$message({
          type: 'success',
          message: '审核通过!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}

.el-pagination {
  margin-top: 15px;
}
</style>