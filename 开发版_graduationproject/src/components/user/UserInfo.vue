<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-descriptions title="用户信息" :column="2" border>
        <el-descriptions-item label="学号">{{UserInfo.id}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{UserInfo.name}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{UserInfo.gender}}</el-descriptions-item>
        <el-descriptions-item label="身份">{{UserInfo.identity}}</el-descriptions-item>
        <el-descriptions-item label="电话">{{UserInfo.phone}}
        </el-descriptions-item>
        <el-descriptions-item v-if="UserInfo.yuanxi" label="院系">{{UserInfo.yuanxi}}
        </el-descriptions-item>
        <el-descriptions-item v-if="UserInfo.discipline" label="专业">{{UserInfo.discipline}}
        </el-descriptions-item>
        <el-descriptions-item v-if="UserInfo.whichClas" label="班级">{{UserInfo.whichClas}}
        </el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" size="mini" style="margin-top:15px" @click="EditUserInfoDialog">修改</el-button>
    </el-card>
    <!-- 修改用户基本信息对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="EditUserInfoDialogVisible" width="60%">
      <!-- 表单 -->
      <el-form :model="UserInfo" :rules="EditUserInfoRules" ref="EditUserInfoRef" label-width="100px" label-position="left">
        <el-form-item label="学号">
          <el-input v-model="UserInfo.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="UserInfo.identity" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="UserInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="UserInfo.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="UserInfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditUserInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      UserInfo: {},
      //   修改用户基本信息对话框显示与否
      EditUserInfoDialogVisible: false,
      //注册用户验证规则
      EditUserInfoRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "输入长度在2~10个字符", trigger: "blur" },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机", trigger: "blur" },
        { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' },
        {
          pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: '请输入正确的手机号码', trigger: 'blur'
        },]
      }
    }
  },
  created () {
    this.GetUserInfo()
  },
  methods: {
    //   获取用户信息
    GetUserInfo () {
      this.UserInfo = JSON.parse(window.sessionStorage.getItem('UserInfo'))
    },
    // 显示修改对话框
    EditUserInfoDialog () {
      this.EditUserInfoDialogVisible = true
    },
    // 提交信息
    EditUserInfo () {
      this.$refs.EditUserInfoRef.validate(async valid => {
        if (!valid) return this.$message.error('数据预验证不通过')
        console.log(this.UserInfo);
        this.$message.success('修改成功')
        this.EditUserInfoDialogVisible = false
      })

    }
  }
}
</script>

<style lang="less" scoped>
</style>