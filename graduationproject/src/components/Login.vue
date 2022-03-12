<template>
  <div class="login_contaier">
    <div class="login_box">
      <!-- 标题 -->
      <div class="title_box">
        <span>学生出勤管理系统</span>
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" label-width="0px" :rules="loginFormRules" class="login_form" :model="loginForm">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入学号或工号" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="login" class="LoginButton" size="medium">登录</el-button>
        </el-form-item>
        <!-- 注册重置 -->
        <el-form-item class="btns">
          <el-button type="info" @click="resetLoginForm" size="mini">重置</el-button>
          <el-button size="mini">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册用户 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      //   注册用户数据
      regForm: {
        //账号
        id: '',
        //密码
        password: '',
        //姓名
        name: '',
        //性别
        gender: '',
        //身份
        identity: '',
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
      // 登录数据验证对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          { min: 3, max: 10, message: "输入长度在3~10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 20, message: "输入长度在6~20个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 重置表单方法
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },

    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return; //验证不通过
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        // 保存token到sessionStorage页面关闭清除token
        window.sessionStorage.setItem("token", res.data.token);
        // 通过编程式导航跳转到后台主页路由地址是/home
        this.$router.push("/home");
      });
    },
  },
}
</script>

<style lang="less" scoped>
// 大盒子
.login_contaier {
  height: 100%;
  background: url('./login_bg.jpg') no-repeat center;
  background-size: 100%;
}
// 登录盒子
.login_box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
// 标题
.title_box {
  padding-top: 20px;
  text-align: center;
  color: rgb(8, 166, 228);
  font-size: 20px;
  letter-spacing: 10px;
  font-weight: 800;
}
// button
.btns {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.LoginButton {
  width: 100%;
}
// 表单
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 4% 0 4%;
  box-sizing: border-box;
}
</style>