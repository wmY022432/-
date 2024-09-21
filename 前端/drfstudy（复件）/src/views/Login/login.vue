<template>
  <div class="login">
    <div class="content">
      <div class="left">
        <img src="../../assets/img/logo_iw.png" width="450" />
        <div class="title">
          <h2>欢迎登录</h2>
          <h1>码趣教育-PROMOTE系统</h1>
        </div>
      </div>

      <div class="right">
        <h2>欢迎登录</h2>
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

          <el-form-item
            label="验证码:"
            prop="verification"
            class="phone"
          >
            <el-input type="text"  v-model="ruleForm.verification" />
            <img
              style="width: 100px; height:32px"
              :src="verify_src"
              @click="get_verification_image"
            />
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
import {Post_Login_Data} from '@/api/index'
const router = useRouter();
const store = useStore();

const ruleFormRef = ref();
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

  verification: [
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
});

// 获取图片验证码
//1.获取uuid
function generateUUID() {
  let d = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
let uuid = generateUUID();
// 2.获取验证码图片路径
let verify_src = ref(
  `/api/user/image/verification/${uuid}/?data=${new Date().getTime()}`
);

// 3.点击验证码图片，重新获取
const get_verification_image = () => {
  verify_src.value = `/api/user/image/verification/${uuid}/?data=${new Date().getTime()}`;
};

// 获取用户输入的数据
const ruleForm = reactive({
  username: "",
  password: "",
  verification: "",
  uuid: uuid,
});

// 校验数据
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      post_login_data()
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 登录
const post_login_data = async()=>{
  try {
    const res = await Post_Login_Data(ruleForm)
    let data = {
      token:res.token,
      first_name:res.first_name,
      status:res.status,
      avatar:res.avatar?'/aps/'+res.avatar:'',
      user_id : res.id
    }
    console.log(data);
    store.commit('user/update_userdata',data)
    router.push('/home')
  } catch (error) {
   ElMessage.error('登录失败，请重新登录！')
  }
}

</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/logobg.jpg") no-repeat;
  position: fixed;
  background-size: 100% 100%;
  align-content: center;
  .content {
    width: 1000px;
    height: 440px;
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
      margin-top: 60px;
      border: 1px solid #ccc;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      border-radius: 14px;
      h2 {
        padding: 20px 200px 0px 200px;
        font-size: 20px;
        color: #fff;
      }
      .el-form {
        margin-top: 30px;
        margin-left: 70px;
        .el-form-item {
          margin-top: 40px;
          .el-input {
            width: 300px;
          }
        }
        .phone{
          .el-input{
             width: 190px;
          }
          img{
            width: 100px;
            height:32px;
            margin-left: 10px;
          }
        }
        #button {
          .el-button {
            width: 365px;
          }
        }
      }
    }
  }
}


</style>