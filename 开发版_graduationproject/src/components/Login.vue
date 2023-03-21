<template>
  <div class="login_contaier">
    <div class="login_box">
      <!-- 标题 -->
      <div class="title_box">
        <span>学生考勤管理系统</span>
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
          <el-button size="mini" @click="RegUserDialog">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册用户 -->
    <el-dialog title="注册新用户" :visible.sync="RegUserDialogVisible" width="40%" @close="CloseRegUserDialog">
      <!-- tabs标签 -->
      <el-tabs type="border-card" :stretch="true">
        <el-tab-pane>
          <span slot="label" @click="RegStudent">学生注册</span>
          <!-- 学生注册表单 -->
          <el-form :model="RegUserForm" :rules="RegUserFormRules" ref="RegUserRef" label-width="100px" label-position="left">
            <el-form-item label="学号" prop="id">
              <el-input v-model="RegUserForm.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="RegUserForm.password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色" prop="identity">
              <el-radio-group v-model="RegUserForm.identity">
                <el-radio label="学生"></el-radio>
                <el-radio label="老师"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="姓名" prop="name">
              <el-input v-model="RegUserForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="RegUserForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="院系" prop="yuanxi">
              <el-input v-model="RegUserForm.yuanxi"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="discipline">
              <el-input v-model="RegUserForm.discipline"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="whichClas">
              <el-input v-model="RegUserForm.whichClas"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="RegUserForm.phone"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="RegTeacher">教师注册</span>
          <!-- 教师注册表单 -->
          <el-form :model="RegUserForm" :rules="RegUserFormRules" ref="RegUserRef" label-width="100px" label-position="left">
            <el-form-item label="工号" prop="id">
              <el-input v-model="RegUserForm.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="RegUserForm.password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色" prop="identity">
              <el-radio-group v-model="RegUserForm.identity">
                <el-radio label="学生"></el-radio>
                <el-radio label="老师"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="姓名" prop="name">
              <el-input v-model="RegUserForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="RegUserForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="院系" prop="yuanxi">
              <el-input v-model="RegUserForm.yuanxi"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="discipline">
              <el-input v-model="RegUserForm.discipline"></el-input>
            </el-form-item>
            <!-- <el-form-item label="班级" prop="whichClas">
              <el-input v-model="RegUserForm.whichClas"></el-input>
            </el-form-item> -->
            <el-form-item label="电话" prop="phone">
              <el-input v-model="RegUserForm.phone"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="RegAdmin">管理员注册</span>
          <!-- 管理员注册表单 -->
          <el-form :model="RegUserForm" :rules="RegUserFormRules" ref="RegUserRef" label-width="100px" label-position="left">
            <el-form-item label="学号/工号" prop="id">
              <el-input v-model="RegUserForm.id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="RegUserForm.password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="角色" prop="identity">
              <el-radio-group v-model="RegUserForm.identity">
                <el-radio label="学生"></el-radio>
                <el-radio label="老师"></el-radio>
                <el-radio label="管理员"></el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="姓名" prop="name">
              <el-input v-model="RegUserForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="RegUserForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="RegUserForm.phone"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RegUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="RegUser">注册</el-button>
      </span>
    </el-dialog>
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
      UserInfo: {
        id: '12345678901',
        name: 'xiaobing',
        gender: '男',
        identity: '管理员',
        yuanxi: '电信学院',
        discipline: '自动化',
        whichClas: '自BG181',
        phone: '13118573647',
      },
      //注册用户对话框显示与否
      RegUserDialogVisible: false,
      //   注册用户数据
      RegUserForm: {
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
      //注册用户验证规则
      RegUserFormRules: {
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
      }
    };
  },
  methods: {
    // 重置表单方法
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },

    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('信息输入格式有误！') //验证不通过
        // 提交登录信息
        // const { data: res } = await this.$http.post("login", this.loginForm);
        // // console.log(res);
        // if (res.meta.status !== 200) return this.$message.error("登录失败");
        console.log(this.loginForm);
        if (!(this.loginForm.username == 123456 && this.loginForm.password == 123456)) return this.$message.error('账号或密码错误！')
        this.$message.success("登录成功");
        // 保存token到sessionStorage页面关闭清除token
        // window.sessionStorage.setItem("token", res.data.token);

        window.sessionStorage.setItem("token", '登录成功');
        // 用户信息
        window.sessionStorage.setItem("UserInfo", JSON.stringify(this.UserInfo));
        // 通过编程式导航跳转到后台主页路由地址是/home
        this.$router.push("/home");
      });
    },

    // 显示注册用户
    RegUserDialog () {
      this.RegUserDialogVisible = true
    },
    // 注册为学生
    RegStudent () {
      this.RegUserForm.identity = '学生'
      this.$refs.RegUserRef.resetFields()
    },
    // 注册为教师
    RegTeacher () {
      this.RegUserForm.identity = '教师'
      this.$refs.RegUserRef.resetFields()
    },
    // 注册为管理员
    RegAdmin () {
      this.RegUserForm.identity = '管理员'
      this.$refs.RegUserRef.resetFields()
    },
    //注册用户
    RegUser () {
      this.$refs.RegUserRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据预验证不通过请检查信息')
        // 更改请求地址即可
        // const { data: res } = await this.$http.post('regUser', this.RegUserForm)
        // // 注册失败
        // if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        // 注册成功

        if (this.RegUserForm.identity === '管理员' || '教师') this.$message.success('注册信息提交成功等待审核')
        else this.$message.success('注册成功')
        this.RegUserDialogVisible = false
        console.log(this.RegUserForm);
      })
    },
    //关闭注册对话框清除表单信息
    CloseRegUserDialog () {
      this.$refs.RegUserRef.resetFields()
    }
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