<template>
  <div class="add">
    <el-button type="primary" @click="add">添加标签类型</el-button>
  </div>

  <div class="search">
    <div class="mt-4">
      <el-input v-model="search_data.name" placeholder="请输入组名..." class="input-with-select">
        <template #append>
          <el-button :icon="Search" @click="search"/>
        </template>
      </el-input>
    </div>
  </div>

  <div class="list">
    <el-table :data="tableData" style="width: 700px">
      <el-table-column label="ID" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 40%">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签名" width="150" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center">
        <template #default="scope">
          <div style="margin-left: 30%">
            <el-button size="small" type="info" @click="update(scope.row.id)">修改</el-button>
            <el-button size="small" type="danger" @click="delete_lebal(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { Post_Question_Label_Data, Get_Question_Label_Data, Update_Question_Label_Data, Delete_Question_Label_Data,Get_Search_Question_Label_Data } from "@/api";
const tableData = ref([])
// 获取标签类型数据
const get_question_label_data = async () => {
  try {
    const res = await Get_Question_Label_Data();
    console.log(res);

    tableData.value = res.results
  } catch (error) {
    console.log(error);
  }
}
get_question_label_data()


// 添加标签类型信息
const add = () => {
  ElMessageBox.prompt('请输入标签名', '添加标签', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',

  })
    .then(async ({ value }) => {
      try {
        const res = await Post_Question_Label_Data({ name: value })
        tableData.value.push(res)
        ElMessage.success('标签添加成功')
      } catch (error) {
        console.log(error);
        ElMessage.error('标签添加失败')
      }
    })
}
// 修改标签类型信息
const update = (id) => {
  ElMessageBox.prompt('请输入修改之后标签名', '添加修改标签', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',

  })
    .then(async ({ value }) => {
      try {
        const res = await Update_Question_Label_Data({ name: value, id: id })
        tableData.value.forEach((element) => {
          if (element.id == res.id) {
            element.name = res.name
          }
        })
        ElMessage.success('标签修改成功')
      } catch (error) {
        console.log(error);
        ElMessage.error('标签修改失败')
      }
    })
}

// 删除标签类型信息
const delete_lebal = (id) => {

  ElMessageBox.confirm(
    '确定删除此标签信息吗？',

    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        const res = await Delete_Question_Label_Data(id)
        tableData.value.forEach((element,index)=>{
            if(element.id == id){
              tableData.value.splice(index,1)
            }
          })
        ElMessage.success('删除成功')
      } catch (error) {
        ElMessage.error('删除失败')
      }

    })

}


const search_data = reactive({
  name:''
})
const search = async()=>{
  try {
    const res = await Get_Search_Question_Label_Data(search_data)
   if(res.status==201){
    tableData.value = [res.data]
   }
  } catch (error) {
    
  }
}


</script>

<style lang="less" scoped>
.search {
  width: 100%;

  .mt-4 {
    width: 800px;
    margin: 50px auto;
  }

  .el-input {
    width: 700px;
    margin: auto;
    margin-left: 50px;
  }
}

.add {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .el-button {
    margin: 20px;
    margin-right: 400px;
  }
}

.list {
  width: 100%;

  .el-table {
    margin: 50px auto;
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