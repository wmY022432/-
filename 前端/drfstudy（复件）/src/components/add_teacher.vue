<template>
  <div class="add">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="username">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.username"
          :disabled="props.isupdate ? true : false"
        />
      </el-form-item>

      <el-form-item label="职位" prop="position">
        <el-input type="text" autocomplete="off" v-model="ruleForm.position" />
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.age"
          :disabled="props.isupdate ? true : false"
        />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select
          v-model="ruleForm.sex"
          :disabled="props.isupdate ? true : false"
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

      <el-form-item label="联系方式" prop="phone">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.phone"
          :disabled="props.isupdate ? true : false"
        />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.email"
          :disabled="props.isupdate ? true : false"
        />
      </el-form-item>

      <el-form-item label="联系地址" prop="address">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.address"
          :disabled="props.isupdate ? true : false"
        />
      </el-form-item>
      <el-form-item class="button">
        <el-button
        
          type="primary"
          @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
   
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, watch } from "vue";
const ruleFormRef = ref();
const ruleForm = reactive({
  date_joined: "",
  username: "",
  position: "",
  age: "",
  sex: "",
  phone: "",
  email: "",
  address: "",
  first_name: "",
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入名称",
      trigger: "change",
    },
  ],
  position: [
    {
      required: true,
      message: "请输入职位",
      trigger: "change",
    },
  ],
  age: [
    {
      required: true,
      message: "请输入年龄",
      trigger: "change",
    },
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "change",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入联系号码",
      trigger: "change",
    },
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "change",
    },
  ],
  address: [
    {
      required: true,
      message: "请输入联系地址",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
});
const SEX_TYPE = ["女", "男"];

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      props.add_teacher_data(ruleForm);
    }
  });
};



const props = defineProps({
  add_teacher_data: Function,
});



</script>

<style lang="less" scoped>
.add{
  width: 800px;
}
.el-form {
  width: 600px;
  margin-left: -20px;
  .button {
    margin-left: -30px;
    .el-button {
      width: 500px;
    }
  }
}
</style>