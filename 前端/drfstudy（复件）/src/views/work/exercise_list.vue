<template>

  <div class="add">
    <el-button type="primary" @click="add">添加题目</el-button>
  </div>

  <div class="search">
    <div class="mt-4">
      <el-input
        v-model="search_data.subject"
        placeholder="请输入题目标题..."
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search"  @click="SearchForm(search_data)"/>
        </template>
      </el-input>
    </div>
  </div>




  <el-table :data="tableData" style="width: 1400px">
    <el-table-column label="题干" width="180" header-align="center">
      <template #default="scope">
        <span v-html="scope.row.subject "></span>
      </template>
    </el-table-column>
    <el-table-column label="标签类型" width="140" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.label_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 25%">{{ TYPE_CHOICES[scope.row.type] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="分值" width="60" header-align="center">
      <template #default="scope">
        <span style="margin-left: 20%">{{ scope.row.score }}</span>
      </template>
    </el-table-column>
    <el-table-column label="题目描述" width="180" header-align="center">
      <template #default="scope">
        <span v-html="scope.row.description"></span>
      </template>
    </el-table-column>
    <el-table-column label="答案" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.answer }}</span>
      </template>
    </el-table-column>
    <el-table-column label="发布者" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.user_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" header-align="center">
      <template #default="scope">
        <div style="margin-left: 30%">
          <el-button size="small" type="info" @click="update(scope.row)"
            >修改</el-button
          >

          <el-button
            size="small"
            type="danger"
            @click="delete_topic(scope.row.id)"
            >删除</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>


 <div class="pagination" v-if="total > 0">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
      :current-page="currentPage"
    />
  </div>

  <el-dialog v-model="dialogFormVisible" :title="title" center  style="width:600px">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="update_data"
      :rules="rules"
      style="width:500px"
      ref="ruleFormRef"
    >
      <el-form-item label="题干" prop="subject">
        <el-input v-model="update_data.subject" />
      </el-form-item>
      <el-form-item label="标签类型" prop="subject">
        <el-select
          v-model="update_data.label"
          class="m-2"
          placeholder="请选择标签类型"
        >
          <el-option
            v-for="(item) in exercise_label"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="update_data.type"
          class="m-2"
          placeholder="请选择题目类型"
        >
          <el-option
            v-for="(item, index) in TYPE_CHOICES"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分值" prop="score">
        <el-input v-model="update_data.score" />
      </el-form-item>

      <el-form-item label="题目描述" prop="description">
        <el-input v-model="update_data.description" type="textarea" />
      </el-form-item>

      <el-form-item label="答案" prop="answer">
        <el-input v-model="update_data.answer" />
      </el-form-item>
      <el-form-item label="发布者" v-if="!is_add">
        <el-input v-model="update_data.user_name" disabled />
      </el-form-item>

      <el-form-item >
        <el-button
            size="small"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >提交</el-button
          >
      </el-form-item>


      
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Get_Topic_Data,Get_Question_Label_Data,Post_Topic_Data,Put_Topic_Data,Delete_Topic_Data,Get_Search_Topic_Data} from "@/api/index";
import { ElMessage ,ElMessageBox} from "element-plus";
import { Search } from "@element-plus/icons-vue";
// 分页
const total = ref();
// 赋值数据
let pagesize = ref(5);
let currentPage = ref(1);


const tableData = ref();
// 题目的类型
const TYPE_CHOICES = ["单选题", "多选题", "判断题", "填空题", "问答题"];
//获取题目数据
const get_topic_data = async (val) => {
  try {
    const res = await Get_Topic_Data(val);
    res.results.forEach((element) => {
      element.description = element.description.replace(/\n/g, "<br/><br/>");
      element.work_answer = "";
      element.flag = null;
    });
    tableData.value = res.results;
    total.value = res.count
  } catch (error) {
    console.log(error);
  }
};
get_topic_data({ page: 1, size: pagesize.value });





// 修改题目数据
const update_data = ref();
const dialogFormVisible = ref(false);
const exercise_label = ref();
const ruleFormRef = ref()
const title = ref()
// 获取标签类型数据
// 获取标签类型数据
const get_question_label_data = async () => {
  try {
    const res = await Get_Question_Label_Data();
    exercise_label.value = res.results
  } catch (error) {
    console.log(error);
  }
}
get_question_label_data()



const rules = reactive({
  subject: [{ required: true, message: "请输入题干", trigger: "blur" }],
  label: [{ required: true, message: "请输入标签类型", trigger: "blur" }],
  type: [{ required: true, message: "请输入题目类型", trigger: "blur" }],
  score: [{ required: true, message: "请输入题目分值", trigger: "blur" }],
  description: [{ required: true, message: "请输入题目描述", trigger: "blur" }],
  answer: [{ required: true, message: "请输入题目答案", trigger: "blur" }],
});


// 修改数据
const  is_add = ref(false)
const update = (val) => {
  title.value = '修改题目数据'
  is_add.value = false
  update_data.value = JSON.parse(JSON.stringify(val));
  update_data.value.description = update_data.value.description
    .replace(/<br\/><br\/>/g, "")
    .replace(/"/g, "");
  dialogFormVisible.value = true;
};
// 校验数据
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      submit()
    } else {
      console.log('error submit!', fields)
    }
  })
}


// 提交添加数据
const submit = async()=>{
  try {
    if(is_add.value){
      const res = await Post_Topic_Data(update_data.value)
      tableData.value.push(res)
      dialogFormVisible.value = false
      ElMessage.success('题目添加成功')
    }else{
      const res = await Put_Topic_Data(update_data.value)
      tableData.value.forEach((element,index)=>{
          if(element.id == res.id){ 
             tableData.value[index] = res
          }
        })
        dialogFormVisible.value = false
        ElMessage.success('修改成功！')
    }
   
  } catch (error) {
    console.log(error);
  }
}

// 删除题目数据
const delete_topic = async(id)=>{
  ElMessageBox.confirm(
    '是否删除此题目？',

    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  )
    .then(async() => {
        await Delete_Topic_Data(id)
          tableData.value.forEach((element, index) => {
          if (element.id == id) {
            tableData.value.splice(index, 1);
          }
        });
        ElMessage.success('删除成功')
    })
    .catch(() => {
  
    })
}

// 添加题目
const add_data = reactive({
  label:'',
  type:'',
  score:'',
  subject:"",
  description:"",
  answer:''
  
})

const add = ()=>{
  dialogFormVisible.value = true
  update_data.value = add_data
  title.value = '添加题目数据'
  is_add.value= true
}

// 搜索
const   is_search =  ref(false)
const search_data = reactive({
  page:1,
  size:pagesize.value,
  subject:''
})


const SearchForm = async(data)=>{
  is_search.value = true
  try {
    const res = await Get_Search_Topic_Data(search_data)
    total.value = res.count
    tableData.value = res.results
  } catch (error) {
    console.log(error);
    
  }
}



//分页器
const handleCurrentChange = async (val) => {
  
if(is_search){
  search_data.page = val
  SearchForm(search_data)
}else{
  get_topic_data({ page: val, size: pagesize.value });
}
};


</script>

<style lang="less" scoped>
.el-form-item{
  .el-button{
    width: 200px;
    margin-left: 80px;
  }
}
.search {
  width: 100%;
  .mt-4 {
    margin: 50px auto;
  }
  .el-input {
    width: 1000px;
    margin: auto;
  }
}

.add {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .el-button {
    margin-right: 100px;
  }
}

.pagination {
  width: 100%;
  .el-pagination {
    width: 200px;
    margin: 20px auto;
  }
}
</style>