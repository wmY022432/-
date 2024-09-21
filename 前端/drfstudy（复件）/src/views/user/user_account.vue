<template>
  <div class="useraccount">
    <div class="useraccount-box">
      <h2 class="title">账号信息</h2>
      <div class="centent">
        <el-form
          label-width="100px"
          :model="user_account"
          style="max-width: 460px"
          ref="ruleFormRef"
          :rules="rules"
          ><el-form-item label="账号名">
            <el-input v-model="user_account.username" disabled />
          </el-form-item>

          <el-form-item label="用户名"  prop='first_name'>
            <el-input v-model="user_account.first_name" />
          </el-form-item>
          <el-form-item label="旧密码" prop='password'>
            <el-input v-model="user_account.password"  type="password"/>
          </el-form-item>
          <el-form-item label="新密码" prop='new_password'>
            <el-input v-model="user_account.new_password"  type="password" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">修改信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,reactive } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'
import { ElMessage } from "element-plus";
import {Get_User_Account_Data,Put_User_Account_Data} from '@/api/index'
const ruleFormRef = ref()
const store = useStore();
const router = useRouter()
const user_account = reactive({
  username: "",
  first_name: "",
  password: "",
  new_password: "",
  user_id :store.state.user.userInfo.user_id
});
// 获取用户数据
const get_user_account_data = async()=>{
    try {
      const res = await Get_User_Account_Data(store.state.user.userInfo.user_id)
      if(res.status==201){
        user_account.first_name = res.data.first_name,
        user_account.username = res.data.username
        user_account.password =  "*******"
        
      }else{
        ElMessage.error(res.msg)
      }
    } catch (error) {
      console.log(error);
    }
}
get_user_account_data()
// 校验数据
const rules = reactive({
  first_name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: 'change',
    },
      { min: 6, message: '密码不能小于6位', trigger: 'blur' },
  ],
  new_password: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'change',
    },
     { min: 6, message: '密码不能小于6位', trigger: 'blur' },
  ],

})

// 提交校验数据是否合理
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      put_user_account_data()
    } else {
      console.log('error submit!', fields)
    }
  })
}


// 提交数据给后端
const put_user_account_data = async()=>{
  try {
    const res  = await Put_User_Account_Data(user_account);
    if(res.status == 201){
      store.commit('user/delete_userdata')
      router.push('/login')
      ElMessage.success('修改成功')
    }else{
      ElMessage.error(res.msg)
    }
  } catch (error) {
    
  }
}


</script>

<style lang="less" scoped>
.useraccount-box {
  width: 500px;
  padding-bottom: 20px;
  background: #fff;
  margin: auto;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  .title {
    text-align: center;
    padding: 20px;
  }
  .centent {
    width: 560px;
    margin: auto;
    .el-form {
      .el-form-item {
        margin-top: 30px;
      }
    }
    .el-button {
      width: 300px;
      margin-left: 10px;
    }
  }
}
</style>