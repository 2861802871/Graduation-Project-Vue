<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <!-- <img src="../assets/heima.png" alt="" /> -->
        <span>学生出勤管理系统</span>
      </div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollaps?'64px':'180px'">
        <div class="toggle-btton" @click="toggleCollapse">|||</div>

        <el-menu unique-opened :collapse="isCollaps" :collapse-transition="false" :router="true" :default-active="activePath" background-color="#303133" text-color="#fff" active-text-color="#409EFF">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 除学分管理外二级菜单 -->
            <div v-if="item.id!==2">
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavStatus('/'+subItem.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </div>
            <!-- 学分管理菜单 -->
            <div v-if="item.id===2">
              <el-submenu index="1-4" v-for="subItem1 in item.children" :key="subItem1.id">
                <template slot="title">
                  <i class="el-icon-s-management"></i>
                  <span>{{subItem1.authName}}</span>
                </template>
                <el-submenu index="1-2" v-for="subItem2 in subItem1.children" :key="subItem2.id">
                  <template slot="title">
                    <i class="el-icon-s-promotion"></i>
                    <span>{{subItem2.authName}}</span>
                  </template>
                  <el-menu-item :index="'/'+subItem3.path" v-for="subItem3 in subItem2.children" :key="subItem3.id" @click="saveNavStatus('/'+subItem3.path)">
                    <template slot="title">
                      <i class=""></i>
                      <span>{{ subItem3.authName }}</span>
                    </template>
                  </el-menu-item>
                </el-submenu>
              </el-submenu>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 菜单列表数据
      menuList: [
        {
          id: 1,
          authName: '用户管理',
          path: 'users',
          children: [
            {
              id: 10,
              authName: '学生',
              path: 'student',
              children: [],
              order: null
            },
            {
              id: 11,
              authName: '老师',
              path: 'teacher',
              children: [],
              order: null
            },
            {
              id: 12,
              authName: '管理员',
              path: 'admini',
              children: [],
              order: null
            }
          ],
          order: 3
        },
        {
          id: 2,
          authName: '学分管理',
          path: 'credit',
          children: [
            {
              id: 20,
              authName: '电信学院',
              path: 'faculty',
              children: [
                {
                  id: 200,
                  authName: '自动化',
                  path: 'profession',
                  children: [
                    {
                      id: 2000,
                      authName: '自BG181',
                      path: 'automation181',
                      children: [],
                      order: null
                    },
                    {
                      id: 2001,
                      authName: '自BG182',
                      path: 'automation182',
                      children: [],
                      order: null
                    },
                    {
                      id: 2002,
                      authName: '自BG191',
                      path: 'automation191',
                      children: [],
                      order: null
                    }, {
                      id: 2003,
                      authName: '自BG192',
                      path: 'automation192',
                      children: [],
                      order: null
                    },
                  ],
                  order: 1
                }
              ],
              order: 1
            },

          ],
          order: 1
        },
        {
          id: 3,
          authName: '事假中心',
          path: 'leave',
          children: [
            {
              id: 30,
              authName: '请假申请',
              path: 'apply',
              children: [],
              order: null
            },
            {
              id: 31,
              authName: '假条审批',
              path: 'audit',
              children: [],
              order: null
            }, {
              id: 32,
              authName: '假条查询',
              path: 'Inquire',
              children: [],
              order: null
            }, {
              id: 33,
              authName: '销假',
              path: 'remove',
              children: [],
              order: null
            }
          ],
          order: 3
        },
        {
          id: 4,
          authName: '个人中心',
          path: 'oneself',
          children: [
            {
              id: 40,
              authName: '基本信息',
              path: 'userInfo',
              children: [],
              order: null
            },
            {
              id: 41,
              authName: '修改密码',
              path: 'password',
              children: [],
              order: null
            }
          ],
          order: 4
        }
      ],
      //   菜单的图标数据
      iconsObj: {
        "1": "el-icon-user-solid",
        "2": "",
        "2": "el-icon-s-goods",
        "3": "el-icon-s-order",
        "4": "el-icon-s-custom",
      },
      // 折叠菜单栏标识
      isCollaps: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.getMenueList()
  },
  methods: {
    // 获取菜单栏数据列表
    async getMenueList () {
      // const { data: res } = await this.$http.get("menus");
      // console.log(res);
      // if (res.meta.status !== 200) return $message.error(res.meta.msg);
      // this.menuList = res.data;
      console.log(this.menuList);
    },
    // 退出登录
    logout () {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 展开与折叠菜单栏
    toggleCollapse () {
      this.isCollaps = !this.isCollaps
    },
    // 保存path链接的激活状态
    saveNavStatus (activePath) {
      window.sessionStorage.setItem("activePath", activePath)
      this.activePath = activePath
    }
  }

}
</script>

<style lang= less  scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #303133;
  // 左右贴边对齐
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 16px;
      font-size: 20px;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #303133;
}
.el-main {
  background-color: #f2f6fc;
}
//菜单栏字体图标和文字间距
.iconfont {
  margin-right: 10px;
}
//解决菜单栏右侧边框线超出1px问题
.el-menu {
  border-right: 0;
}
// 折叠菜单栏
.toggle-btton {
  background-color: #4a5046;
  font-size: 12px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>