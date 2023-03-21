<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>事假中心</el-breadcrumb-item>
      <el-breadcrumb-item>查询假条</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card>
      <!-- 表格展示 -->
      <el-table :data="LeaveData.ApplyList" border style="width: 100%">
        <el-table-column prop="name" label="请假人">
        </el-table-column>
        <el-table-column prop="id" label="学号" min-width="120">
        </el-table-column>
        <el-table-column prop="date1" label="开始时间" min-width="105">
        </el-table-column>
        <el-table-column prop="date2" label="结束时间" min-width="105">
        </el-table-column>
        <el-table-column v-if="false" prop="ApprovalStatus" label="状态">
        </el-table-column>
        <el-table-column v-if="false" prop="ApprovaId" label="审核人id">
        </el-table-column>
        <el-table-column v-if="false" prop="ApprovaName" label="审核人id">
        </el-table-column>
        <el-table-column v-if="false" prop="ApplyTime" label="提交申请的时间">
        </el-table-column>
        <el-table-column v-if="false" prop="describe" label="请假原因">
        </el-table-column>
        <el-table-column prop="FindStatus" label="是否通过">
        </el-table-column>
        <el-table-column v-if="false" prop="opinion" label="审核意见">
        </el-table-column>
        <el-table-column label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="FindDialog(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 假条详情 -->
    <el-dialog title="假条详情" :visible.sync="FindDialogVisible" width="60%">
      <div>
        <h1>请假条</h1>
        <span>&emsp;&emsp;{{LeaveRowData.describe}}</span>
        <div class="apply">
          <div>
            <span>申请人：{{LeaveRowData.name}}</span>
          </div>
          <div>
            <span>{{LeaveRowData.ApplyTime}}</span>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-row>
        <span>申请起止日期：{{LeaveRowData.date1}}-{{LeaveRowData.date1}}</span>
        <div>审核员：{{LeaveRowData.ApprovaName}}</div>
        <div>审核状态：{{LeaveRowData.ApprovalStatus}}</div>
        <div>审核结果：{{LeaveRowData.FindStatus}}</div>
        <div>审核意见：{{LeaveRowData.opinion}}</div>

      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="FindDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    return {
      // 登录的用户信息
      UserInfo: {},
      // 时间转换标志
      DateKey: false,
      // 假条详情页是否显示
      FindDialogVisible: false,
      // 假条审核数据
      LeaveData: {
        // 一共多少条数据
        totalpage: 6,
        // 查询参数用于搜索用户
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示几条数据
        pagesize: 10,
        // 用户数据
        ApplyList: [{
          // 审核员id
          ApprovaId: '12345678901',
          // 审核员名字
          ApprovaName: '小冰',
          // 申请人id
          id: '12345678901',
          // 申请人名字
          name: 'xiaobing',
          // 申请时间
          ApplyTime: new Date(),
          // 请假开始水时间
          date1: new Date(),
          // 请假结束时间
          date2: new Date(),
          // 请假理由
          describe: '由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。',
          // 审核状态
          ApprovalStatus: '已审核',
          // 审核结果
          FindStatus: '通过审核',
          // 审核意见
          opinion: '无',
        }, {
          ApprovaId: '12345678901',
          ApprovaName: '小冰',
          id: '12345678901',
          name: 'xiaobing',
          ApplyTime: new Date(),
          date1: new Date(),
          date2: new Date(),
          describe: '由于本人需要外出求职，为了更好地支配时间以更快地找到工作，现特向学校请假，请假时间为20xx年2月23日——4月3日。在此，本人保证出外求职期间，遵守相关的法律法规和行为规范，注意人身安全，完成毕业论文、毕业设计等学习任务，如学校通知办理相关毕业手续等重要安排，保证及时回校处理，同时已将请假外出求职之事告知家长并征求家长的同意。',
          ApprovalStatus: '已审核',
          // 审核结果
          FindStatus: '审核未通过',
          // 审核意见
          opinion: '请假时间不合理',
        },]
      },
      LeaveRowData: {},
    }
  },
  created () {
    //  读取登录用户的信息
    this.UserInfo = JSON.parse(window.sessionStorage.getItem('UserInfo'))
    console.log(this.UserInfo);
    // 时间转换
    if (!this.DateKey) {
      this.LeaveData.ApplyList.forEach((value, index, arry) => {
        this.LeaveData.ApplyList[index].ApplyTime = this.TimeConvert(value.ApplyTime)
        this.LeaveData.ApplyList[index].date1 = this.TimeConvert(value.date1)
        this.LeaveData.ApplyList[index].date2 = this.TimeConvert(value.date2)
        this.LeaveData.ApplyList[index].ApprovaId = this.UserInfo.id
      });
      this.DateKey = true
    }
  },
  methods: {
    // 时间转换函数
    TimeConvert (time) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1
      var day = time.getDay()
      return year + '年' + month + '月' + day + '日'
    },
    // 查看详情话框是否显示
    FindDialog (RowData, index) {
      this.FindDialogVisible = true
      this.LeaveRowData = RowData
      this.LeaveRowData.index = index
      console.log(RowData);
    },

  }
}
</script>

<style lang="less" scoped>
.apply {
  text-align: right;
  margin-right: 10px;
}
h1 {
  text-align: center;
}
</style>