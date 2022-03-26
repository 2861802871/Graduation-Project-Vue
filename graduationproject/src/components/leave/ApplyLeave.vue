<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>事假中心</el-breadcrumb-item>
      <el-breadcrumb-item>请假申请</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-form :model="ApplyLeaveForm" :rules="ApplyLeaveRuls" ref="ApplyLeaveRef" label-width="100px">
        <el-form-item label="请假时间" required style="width: 60%;">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期" v-model="ApplyLeaveForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期" v-model="ApplyLeaveForm.date2" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="请假描述" prop="describe" style="width: 60%;">
          <el-input type="textarea" :autosize="{ minRows: 8,}" v-model="ApplyLeaveForm.describe"></el-input>
        </el-form-item>
        <el-form-item style="width: 60%;" class="buttons">
          <el-button type="info" @click="ResetApplyLeaveForm">重置</el-button>
          <el-button type="primary" @click="SubmitApplyLeave">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script> 
export default {
  data () {
    return {
      // 登录的用户信息
      UserInfo: {},
      // 请假申请表单数据
      ApplyLeaveForm: {
        id: '12345678901',
        ApplyTime: new Date(),
        date1: '',
        date2: '',
        describe: '',
        status: '待审核'
      },
      // 验证规则
      ApplyLeaveRuls: {
        date1: [{ required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        describe: [{ required: true, message: '请输入请假描述', trigger: 'change' }]
      },
    }
  },
  created () {
    this.UserInfo = JSON.parse(window.sessionStorage.getItem('UserInfo'))
  },
  methods: {
    //   提交申请
    SubmitApplyLeave () {
      this.$refs.ApplyLeaveRef.validate(async valid => {
        if (!valid) return this.$message.error('数据预验证不通过')
        // 更改请求地址即可/提交申请人的id和假条信息
        // const { data: res } = await this.$http.post('apply', this.ApplyLeaveForm)
        // 提交失败
        // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        console.log(this.UserInfo.name);
        console.log(this.ApplyLeaveForm);

      })
    },
    // 时间转换函数
    TimeConvert (time) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1
      var day = time.getDay()
      return year + '年' + month + '月' + day + '日'
    },
    //   重置表单
    ResetApplyLeaveForm () {
      this.$refs.ApplyLeaveRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>