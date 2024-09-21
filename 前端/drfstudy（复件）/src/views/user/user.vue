<template>
  <div class="user">
    <el-header>
      <img src="@/assets/img/logo_i.png" height="60" />
      <div class="info">
        <div>
          <h3>码趣教育</h3>
          <h4>PROMOTE系统</h4>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <h4 style="margin-top: 15px; font-size: 20px; font-weight: 600">
        用户信息
      </h4>
    </el-header>
    <ul class="tab">
        <li :class="ischeck==0?'active':''" @click="updateischeck(0)">
            <router-link to="/user_account">修改用户密码</router-link>
        </li>
        <li :class="ischeck==1?'active':''" @click="updateischeck(1)">
            <router-link to="/user_detail">修改用户详情</router-link>
        </li>
    </ul>
  </div>
  <div>
      <router-view/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const ischeck = ref(0)
const updateischeck = (val)=>{
    ischeck.value = val
}
</script>

<style lang="less" scoped>

  .el-header {
    display: flex;
    align-content: center;

    .info {
      display: flex;
      align-content: center;

      h3 {
        font-size: 30px;
        font-weight: 700;
      }

      h4 {
        font-size: 20px;
      }
    }

    .el-divider {
      height: 50px;
    }
  }
  .tab{
      width: 100%;
      display: flex;
      margin: 20px 30px;
      li{
          width: 100px;
          height: 30px;
          margin-left: 20px;
          text-align: center;
      }
      .active{
           border-bottom: 3px solid rgb(31, 115, 224);
      }
  }

</style>
