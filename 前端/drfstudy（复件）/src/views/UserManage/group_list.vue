<template>
  <div class="search">
    <div class="mt-4">
      <el-input
        v-model="Search_Data.name"
        placeholder="请输入组名..."
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search"  @click="get_search_group_data"/>
        </template>
      </el-input>
    </div>
  </div>

  <div class="add">
    <el-button type="primary" @click="add">添加组</el-button>
  </div>
  <div class="list">
    <el-table :data="tableData" style="width: 850px">
      <el-table-column label="ID" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 40%">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="组名称" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 30%">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center">
        <template #default="scope">
          <div style="margin-left: 40%">
            <el-button size="small" type="danger" @click="delete_group(scope.row.id)"
              >删除组</el-button
            >

            <el-button
              size="small"
              type="info"
              @click="update(scope.row.id)"
              >修改</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

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
</template>

<script setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {Get_Group_Data,Post_Group_Data,Put_Group_Data, Delete_Group_Data,Get_Search_Group_Data} from '@/api/index'



// 分页
const total = ref();
// 赋值数据
let pagesize = ref(10);
let currentPage = ref(1);



// 获取用户组数据
const tableData = ref();
const get_group_data = async(data)=>{
  try {
    const res = await Get_Group_Data(data)
    tableData.value = res.results
    total.value = res.count
  } catch (error) {
    console.log(error);
  }
}
get_group_data({
  page: 1,
  size: pagesize.value
})


//分页器
const handleCurrentChange = async(val) => {
  currentPage.value = val;
  get_group_data({
  page: val,
  size: pagesize.value
})
};




//添加用户组
const add = ()=>{
  ElMessageBox.prompt('请输入组名称', '添加组', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
 
  })
    .then(async({ value }) => {
        try {
          const res = await  Post_Group_Data({'name':value})
          tableData.value.push(res)
        } catch (error) {
          console.log(error);
        }
    })

}


// 修改用户组信息
const update = (id)=>{
  ElMessageBox.prompt('请输入修改之后的组名称', '修改组', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
   
  })
    .then(async({ value }) => {
          try {
            const res  = await Put_Group_Data({id:id,name:value})
            tableData.value.forEach((element)=>{
              if(element.id ==res.id){
                element.name = res.name
              }
            })
            ElMessage.success('修改成功')
          } catch (error) {
            ElMessage.error('修改失败')
          }
    })

}

// 删除用户组信息
const delete_group =async (id)=>{
  ElMessageBox.confirm('确定删除此组信息吗？', '删除组', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
   
  })
    .then(async() => {
        try {
          await Delete_Group_Data(id)
          tableData.value.forEach((element,index)=>{
            if(element.id == id){
              tableData.value.splice(index,1)
            }
          })
          ElMessage.success('删除成功')
        } catch (error) {
          ElMessage.error('删除失败')
          console.log(error);
        }
    })



}


// 通过用户输入的查询数据进行数据查询
const Search_Data =reactive({
  name:''
})

// 搜索数据
const get_search_group_data = async()=>{
  try {
    const res = await Get_Search_Group_Data(Search_Data)
    if(res.status==201){
      tableData.value =[res.data]
    }
  } catch (error) {
    console.log(error);
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
    width: 800px;
    margin: auto;
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

.pagination{
  width: 100%;
  .el-pagination{
    width: 200px;
    margin:20px auto;
  }
}
</style>