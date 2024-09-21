<template>
  <div class="userdetail">
    <div class="userdetail-box">
      <h2 class="title">用户详情信息</h2>
      <div class="centent">
        <el-form
          label-width="100px"
          :model="user_detail"
          style="max-width: 560px"
          ref="ruleFormRef"
          :rules="rules"
        >
          <el-form-item label="用户头像">
            <el-upload
              ref="uploadRef"
              list-type="picture-card"
              :auto-upload="false"
              :limit="1"
              :multiple='false' 
              :on-change='checkfile'
            >
              <el-icon><Plus /></el-icon>
              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="性别：" prop="sex">
            <el-select
              v-model="user_detail.sex"
              class="m-2"
              placeholder="请选择性别"
            >
              <el-option
                v-for="(item, index) in SEX_TYPE"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="年龄：" prop="age">
            <el-input v-model="user_detail.age" />
          </el-form-item>
          <el-form-item label="生日：" prop="birthday">
            <div class="block">
              <el-date-picker
                v-model="user_detail.birthday"
                type="date"
                placeholder="请选择日期"
              />
            </div>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="user_detail.phone" type="text" />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user_detail.email" type="text"  />
          </el-form-item>

          <el-form-item label="职位" prop="position">
            <el-input v-model="user_detail.position" type="text" disabled />
          </el-form-item>

          <el-form-item label="个人简介" prop="synopsis">
            <el-input
              v-model="user_detail.synopsis"
              :rows="3"
              type="textarea"
              placeholder="请输入个人简介"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >修改信息</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {Get_User_Account_Data,Update_User_Detail_Data } from '@/api/index'
import moment from 'moment'
const ruleFormRef = ref();
const store = useStore();
const router = useRouter();
const SEX_TYPE = ["女", "男"];
const user_detail = reactive({
  age: "",
  sex: "",
  birthday: "",
  phone: "",
  synopsis: "",
  position: "",
  email: "",
  user_id: store.state.user.userInfo.user_id,
});
// 获取用户数据
// 获取用户数据
const get_user_account_data = async()=>{
    try {
      const res = await Get_User_Account_Data(store.state.user.userInfo.user_id)
      if (res.status == 201) {
      user_detail.sex =res.data.userdetail?res.data.userdetail.sex:'';
      user_detail.age = res.data.userdetail?res.data.userdetail.age:'';
      user_detail.birthday =res.data.userdetail? res.data.userdetail.birthday:"";
      user_detail.phone = res.data.userdetail?res.data.userdetail.phone:'';
      user_detail.email = res.data.email;
      user_detail.synopsis = res.data.userdetail?res.data.userdetail.synopsis:'';
      user_detail.position = res.data.userdetail?res.data.userdetail.position:'';
    }
    } catch (error) {
      console.log(error);
    }
}
get_user_account_data()




const uploadRef = ref()
// 删除选择的图片
const handleRemove = (file) => {
  uploadRef.value.submit()
}

//复制图片
const checkfile = (file) => {
  user_detail.file = file.raw
}



// 校验数据
const rules = reactive({
  age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  birthday: [{ required: true, message: "请输入生日", trigger: "change" }],
  phone: [{ required: true, message: "请输入联系方式", trigger: "change" }],
  synopsis: [{ required: true, message: "请输入简介", trigger: "change" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
});

// 提交校验数据是否合理
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
    update()
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 提交数据给后端
const update = async ()=>{
  user_detail.birthday =   moment(user_detail.birthday).format('YYYY-MM-DD')
    let formData = new FormData()
    for (var i in user_detail){
         formData.append(i, user_detail[i])
    }
    try {
        const  res = await Update_User_Detail_Data(formData)
        console.log(res);
        if(res.status==201){
          ElMessage.success(res.msg)
          store.commit('user/update_user_avatar','/aps/'+res.avatar)
        }else{
          ElMessage.error(res.msg)
        }
    } catch (error) {
      console.log(error);
       ElMessage.error("修改失败,请联系管理员处理!");
    }
}
</script>

<style lang="less" scoped>
.userdetail-box {
  width: 700px;
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