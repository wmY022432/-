<template>
  <div class="update">
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
          disabled
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
          disabled
        />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select
          v-model="ruleForm.sex"
         disabled
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
         disabled
        />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.email"
         disabled
        />
      </el-form-item>

      <el-form-item label="联系地址" prop="address">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.address"
          disabled
        />
      </el-form-item>
      <el-form-item class="button">
   
        <el-button type="info" @click="submitForm(ruleFormRef)">提交</el-button>
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


const props = defineProps({
  update_data: Object,
  update_teacher_data: Function,
});

watch(
  () => props.update_data,
  (newVal) => {
    if (Object.keys(newVal).length > 0) {
      (ruleForm.date_joined = ""),
        (ruleForm.username = newVal.username),
        (ruleForm.position = newVal.position),
        (ruleForm.age = newVal.age),
        (ruleForm.sex = newVal.sex),
        (ruleForm.phone = newVal.phone),
        (ruleForm.email = newVal.email),
        (ruleForm.address = newVal.address),
        (ruleForm.first_name = newVal.first_name);
         (ruleForm.id = newVal.id);
    }
  },
  { immediate: true }
);


</script>

<style lang="less" scoped>
.update{
  width: 400px;
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