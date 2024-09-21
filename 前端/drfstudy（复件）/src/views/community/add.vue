<template>
    <div>
        <el-form  ref="ruleFormRef" :model="ruleForm" :rules="rules"  :inline="true" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="digest">
                <el-input v-model="ruleForm.digest"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="label">
                <el-select v-model="ruleForm.label" placeholder="请选择文章标签">
                    <el-option v-for="lable in lable.data" :label="lable.name" :value="lable.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" @click="submitForm('ruleForm', 0)">保存草稿</el-button> -->
                <el-button type="primary" @click="submitForm(ruleFormRef, 1)">立即发布</el-button>
            </el-form-item>
        </el-form>
        <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
    </div>
</template>

<script setup>
import { async } from '@kangc/v-md-editor'
import { reactive, ref } from 'vue'
import {Get_Question_Label_Data,Post_Article_Data} from '@/api/index'
// 用户输入的数据
const ruleForm = reactive({
    title: '',
    digest: '',
    content: '',
    label: '',
})
// 对数据进行校验
const rules = reactive({
    title: [
        {
            required: true,
            message: '请输入文章标题',
            trigger: 'blur',
        },
        {
            min: 1,
            max: 100,
            message: '标题长度为1~100',
            trigger: 'blur',
        }
    ],
    digest: [

        {
            required: true,
            message: '请输入文章摘要',
            trigger: 'blur',
        },
        {
            min: 1,
            max: 100,
            message: '摘要长度为1~100',
            trigger: 'blur',
        }
    ],
    label: [
        {
            required: true,
            message: '请选择标签',
            trigger: 'change',
        },
    ],
})
// 文章分类
const lable = reactive({
    data: [
        {
            'id': 1,
            'name': 'python基础',
            'user': 1
        }
    ]
})



// 获取标签类型数据
const get_question_label_data = async () => {
  try {
    const res = await Get_Question_Label_Data();
    console.log(res);
    lable.data = res.results
  } catch (error) {
    console.log(error);
  }
}
get_question_label_data()



import { ElMessage } from "element-plus";
import {useRouter} from 'vue-router'
const router = useRouter()
const  ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        post_article_data()
    } else {
      console.log('error submit!', fields)
    }
  })
}




// 获取用户输入的文章内容信息，发送给后台
const post_article_data = async()=>{
    try {
        const res  = await Post_Article_Data(ruleForm)
        ruleForm = {
    title: '',
    digest: '',
    content: '',
    label: '',
}
        ElMessage.success('文章添加成功，请等待管理员的审核')
    } catch (error) {
        console.log(error);
        ElMessage.error('文章发布失败')
    }
}

</script>

<style lang="less" scoped>
.v-md-editor {
    width: 86%;
    margin-left: 12%;
}

.el-form {
    margin-left: 12%;
    padding: 10px 0px;
}
</style>