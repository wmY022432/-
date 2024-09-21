<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="title">
          <p>PROMOTE系统</p>
        </div>
        <div class="button" @click="outlogin"><p>退出登录</p></div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="user">
            <div class="img">
              <el-avatar
                :size="80"
                :src="
                  store.state.user.userInfo.avatar
                    ? store.state.user.userInfo.avatar
                    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                "
              ></el-avatar>
            </div>
            <h2>欢迎您：{{ store.state.user.userInfo.username }}</h2>
          </div>
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                active-text-color="#ffd04b"
                background-color="#483d8b"
                class="el-menu-vertical-demo"
                default-active="2"
                text-color="#fff"
                @open="handleOpen"
                @close="handleClose"
                router
              >
                <el-sub-menu
                  index="1"
                  v-if="store.state.user.userInfo.status == '管理员'"
                >
                  <template #title>
                    <el-icon>
                      <Avatar />
                    </el-icon>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="/actiate_account"
                    >激活学生账号</el-menu-item
                  >
                  <el-menu-item index="/teacher_list"
                    >所有老师信息</el-menu-item
                  >
                  <el-menu-item index="/student_list"
                    >所有学生信息</el-menu-item
                  >
                </el-sub-menu>

                <el-menu-item
                  index="/group_list"
                  v-if="store.state.user.userInfo.status == '管理员'"
                >
                  <template #title>
                    <el-icon><Promotion /></el-icon>
                    <span>群组管理</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="/classes_list">
                  <el-icon><Notebook /></el-icon>
                  <span>班级管理</span>
                </el-menu-item>

                <el-sub-menu index="2">
                  <template #title>
                    <el-icon>
                      <trend-charts />
                    </el-icon>
                    <span>提升中心</span>
                  </template>
                  <el-menu-item index="/exercise">题目练习</el-menu-item>
                  <el-menu-item
                    index="/exercise_list"
                    v-if="store.state.user.userInfo.status == '管理员'"
                    >所有题目信息</el-menu-item
                  >
                  <el-menu-item
                    index="/exercise_label"
                    v-if="store.state.user.userInfo.status == '管理员'"
                    >题目标签分类</el-menu-item
                  >
                </el-sub-menu>

                <el-sub-menu
                  index="/commouity"
                  v-if="store.state.user.userInfo.status == '管理员'"
                >
                  <template #title>
                    <el-icon>
                      <icon-menu />
                    </el-icon>
                    <span>社区</span>
                  </template>
                  <el-menu-item index="/process_article">所有文章</el-menu-item>
                </el-sub-menu>

                <el-menu-item index="/commouity" v-else>
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                  <span>社区</span>
                </el-menu-item>

                <el-menu-item index="/user/shopping">
                  <el-icon>
                    <shop />
                  </el-icon>
                  <span>商场</span>
                </el-menu-item>

                <el-sub-menu index="3" v-if="store.state.user.userInfo.status == '管理员'">
                  <template #title>
                    <el-icon>
                      <setting />
                    </el-icon>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item index="/user/add_good">商品上架</el-menu-item>
                  <el-menu-item index="/user/good">所有商品</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="4" >
                  <template #title>
                    <el-icon>
                      <setting />
                    </el-icon>
                    <span>个人设置</span>
                  </template>
                  <el-menu-item index="/user/address" v-if="store.state.user.userInfo.status == '学生'">收货地址</el-menu-item>
                  <el-menu-item index="/user/cart" v-if="store.state.user.userInfo.status == '学生'">购物车</el-menu-item>
                  <el-menu-item index="/user/order" v-if="store.state.user.userInfo.status == '学生'">全部订单</el-menu-item>
                  <el-menu-item index="/user_account" >个人信息</el-menu-item>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
  TrendCharts,
  Shop,
  Avatar,
  Promotion,
  Notebook,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const handleOpen = (key, keyPath) => {};
const handleClose = (key, keyPath) => {};
const store = useStore();
const router = useRouter();

const outlogin = () => {
  store.commit("user/delete_userdata");
  ElMessage.success("退出成功！");
  router.push("/login");
};
</script>


<style lang="less" scoped>
.el-header {
  background: #057dd3;
  display: flex;
  width: 100%;
  .title {
    width: 150px;
    margin: 20px auto;
    font-size: 20px;
    color: #fff;
  }
  .button {
    margin-top: 23px;
    margin-right: 20px;
    p:hover {
      color: #fff;
    }
  }
}
.el-aside {
  width: 200px;
  background: #483d8b;

  .user {
    .img {
      .el-avatar {
        margin: 20px 60px;
      }
    }
    h2 {
      text-align: center;
    }
    padding-bottom: 20px;
    border-bottom: 1px solid #fff;
  }
  .tac {
    width: 200px;
  }
}
</style>

<style>
html,
body,
#app,
.common-layout,
.el-container,
.el-aside,
.el-main {
  height: 100%;
}
</style>