<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="FormStyle">
        <el-form :model="EditPasswordForm" status-icon :rules="EditPasswordFormRules" ref="EditPasswordFormRef" label-width="100px" label-position="left">
          <el-form-item label="原始密码" prop="OriginalPassword">
            <el-input type="password" v-model="EditPasswordForm.OriginalPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="EditPasswordForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="EditPasswordForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.EditPasswordForm.checkPass !== '') {
          this.$refs.EditPasswordFormRef.validateField('checkPass')
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.EditPasswordForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 用户信息
      UserInfo: {},
      // 表单数据
      EditPasswordForm: {
        OriginalPassword: '',
        password: '',
        checkPass: '',
      },
      EditPasswordFormRules: {
        OriginalPassword: [{ required: true, message: "请输入原始密码", trigger: "blur" },
        { min: 6, max: 20, message: "输入长度在6~20个字符", trigger: "blur" },],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: "输入长度在6~20个字符", trigger: "blur" },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 20, message: "输入长度在6~20个字符", trigger: "blur" },
        ],
      }
    };
  },
  created () {
    this.UserInfo = JSON.parse(window.sessionStorage.getItem('UserInfo'))
  },
  methods: {
    submitForm () {
      this.$refs.EditPasswordFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据预验证失败')
        // 修改接口
        // const { data: res } = await this.$http.post(`password${this.UserInfo.id}`, this.EditPasswordForm)
        // if (res.meta.status !== 200) return this.$messsage.error('修改密码失败，请重试')
        console.log('修改id为' + this.UserInfo.id + '的密码为' + this.EditPasswordForm.password);
      });
    },
    resetForm () {
      this.$refs.EditPasswordFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.FormStyle {
  width: 50%;
  min-width: 300px;
  max-width: 800px;
}
</style>