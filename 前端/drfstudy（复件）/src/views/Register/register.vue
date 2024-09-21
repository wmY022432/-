<template>
  <div class="register">
    <div class="content">
      <div class="left">
        <img src="../../assets/img/logo_iw.png" width="450" />
        <div class="title">
          <h2>欢迎注册</h2>
          <h1>码趣教育-PROMOTE系统</h1>
        </div>
      </div>

      <div class="right">
        <h2>欢迎注册</h2>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          :router="false"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input type="text" v-model="ruleForm.username" />
          </el-form-item>

          <el-form-item label="密  码：" prop="password">
            <el-input type="password" v-model="ruleForm.password" />
          </el-form-item>

          <el-form-item label="手机号码:" style="width: 365px" prop="phone">
            <el-input type="text" v-model="ruleForm.phone" />
          </el-form-item>
          
          <el-form-item label="QQ邮箱:" style="width: 365px" prop="email">
            <el-input type="text" v-model="ruleForm.email" />
          </el-form-item>
          

          <el-form-item label="请输入验证码:" prop="code">
            <el-input
              type="text"
              style="width: 157px"
              v-model="ruleForm.code"
            />
            <el-button
              type="primary"
              style="margin-left: 10px"
              @click="getcode()"
              >点击获取</el-button
            >
          </el-form-item>

          <el-form-item id="button">
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {Get_Code_Data,Post_Register_Data} from '@/api/index'

const router = useRouter();
const store = useStore();

const ruleFormRef = ref();

// 获取用户输入的数据
const ruleForm = reactive({
  username: "",
  password: "",
  phone: "",
  email:"",
  code: "",

});

// 对数据进行校验
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 6,
      message: "密码长度不能少于6位",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "blur",
    },
    {
      min: 11,
      max: 11,
      message: "手机号码位数不正确！",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: "blur",
    },
    {
      min: 4,
      max: 4,
      message: "验证码长度位6位",
      trigger: "blur",
    },
  ],
  email: [
      {
         required: true,
        message: "请输入邮箱地址",
        trigger: "blur", 
      },
      {
        type:'email',
        message: "请输入正确的邮箱地址",
      }
    ],

});

// 获取验证码
const  getcode = async()=>{
  try {
    const res = await Get_Code_Data({'phone':ruleForm.phone})
    res.status==200?ElMessage.success(res.msg):ElMessage.error(res.msg)
  } catch (error) {
    console.log(error);
  }
}
// 校验数据
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      register()
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 注册
const register = async()=>{
  try {
    const res = await   Post_Register_Data(ruleForm)
    res.status==201?ElMessage.success(res.msg):ElMessage.error(res.msg)
  } catch (error) {
    console.log(error);
  }
}


</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/logobg.jpg") no-repeat;
  position: fixed;
  background-size: 100% 100%;
  align-content: center;
}
.content {
  width: 1100px;
  height: 480px;
  margin: 150px auto;
  display: flex;
  .left {
    color: white;
    font-size: 20px;
    .title {
      margin-top: -80px;
      h1 {
        margin: 30px 80px;
        font-size: 30px;
      }
      h2 {
        margin: -10px 80px;
        font-size: 25px;
      }
    }
  }
  .right {
    margin-top: 50px;
    border: 1px solid #ccc;
     box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
     border-radius: 14px;
    h2 {
      padding: 20px 200px 0px 220px;
      font-size: 20px;
      color: #fff;
    }
    .el-form-item {
      margin-top: 30px;
      margin-left: 70px;
      .el-input {
        width: 300px;
      }
    }
    #button {

      .el-button {
        width: 365px;
      }
    }
  }
}
</style>