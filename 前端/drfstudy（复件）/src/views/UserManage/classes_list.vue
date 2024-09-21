<template>
  <div class="search">
    <div class="mt-4">
      <el-input placeholder="请输入组名..." class="input-with-select" v-model="search_data.name">
        <template #append>
          <el-button :icon="Search" @click="get_search_classes_data" />
        </template>
      </el-input>
    </div>
  </div>

  <div class="add">
    <el-button
      type="primary"
      v-if="store.state.user.userInfo.status == '管理员'"
      @click="add"
      >添加班级</el-button
    >
  </div>

  <div class="list">
    <el-table :data="tableData" style="width: 800px">
      <el-table-column label="ID" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 40%">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="200" header-align="center">
        <template #default="scope">
          <span style="margin-left: 30%">{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级名" width="180" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        header-align="center"
        v-if="store.state.user.userInfo.status == '管理员'"
      >
        <template #default="scope">
          <div style="margin-left: 30%">
            <el-button size="small" type="info" @click="update(scope.row.id)"
              >修改</el-button
            >

            <el-button
              size="small"
              type="danger"
              @click="delete_classes(scope.row.id)"
              >删除</el-button
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
import { Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import {Post_Classes_Data,Get_Classes_Data,Put_Classes_Data,Delet_Classes_Data,Get_Search_Classes_Data} from '@/api/index'
import moment from "moment";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
const tableData = ref([]);
const store = useStore();

// 分页
const total = ref();
// 赋值数据
let pagesize = ref(5);
let currentPage = ref(1);

//获取班级信息
const get_classes_data = async(data)=>{
  try {
    const res = await Get_Classes_Data(data)
    console.log(res);
    res.results.forEach(element => {
      element.create_time = moment(element.create_time).format("YYYY-MM-DD:HH:MM:SS");
    });
    tableData.value = res.results
    total.value = res.count
  } catch (error) {
    console.log(error);
  }
}
get_classes_data({
  page: 1,
  size: pagesize.value
})
//分页器
const handleCurrentChange = async (val) => {
  currentPage.value = val;
  get_classes_data({
  page: val,
  size: pagesize.value
})
};

// 添加班级信息
const add = ()=>{
  ElMessageBox.prompt('请输入班级名称', '添加班级', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
 
  })
    .then(async({ value }) => {
        try {
          const res = await  Post_Classes_Data({'name':value})
          res.create_time = moment(res.create_time).format("YYYY-MM-DD:HH:MM:SS");
          tableData.value.push(res)
        } catch (error) {
          console.log(error);
        }
    })

}


// 修改班级信息
const update = (id)=>{
  ElMessageBox.prompt('请输入修改之后的班级名称', '修改班级', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
   
  })
    .then(async({ value }) => {
          try {
            const res  = await Put_Classes_Data({id:id,name:value})
            console.log(res);
            tableData.value.forEach((element)=>{
              if(element.id ==res.id){
                element.name = res.name
              }
            })
            ElMessage.success('修改成功')
          } catch (error) {
            ElMessage.error('删除失败')
          }
    })

}


// 删除班级信息
const delete_classes =async (id)=>{
  ElMessageBox.confirm('确定删除此班级信息吗？', '删除班级', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
   
  })
    .then(async({ value }) => {
        try {
          await Delet_Classes_Data(id)
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

// 通过班级名称查询对应的班级
const search_data = reactive({
  name:''
})

const get_search_classes_data = async()=>{
  try {
    const res = await Get_Search_Classes_Data(search_data)
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
    width: 700px;
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
    margin-right: 400px;
  }
}
.list {
  width: 100%;
  .el-table {
    margin: 20px auto;
  }
}


.pagination{
  width: 100%;
  .el-pagination{
    width: 200px;
    margin:0px auto;
  }
}
</style>