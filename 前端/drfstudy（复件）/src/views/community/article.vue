<template>
  <div class="actviate_account">
    <el-table :data="tableData" style="width: 1500px">
      <el-table-column label="发布时间" width="200" header-align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; margin-left: 20px">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="200" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="文章副标题" width="200" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.digest }}</span>
        </template>
      </el-table-column>

      <el-table-column label="文章标签" width="180" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布者" width="100" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center">
        <template #default="scope">
          <div style="margin-left: 35%">
            <el-button size="small" type="info" @click="checkdetail(scope.row)"
              >查看详情</el-button
            >
            <el-button
              size="small"
              type="success"
              @click="handleEdit(scope.row.id, 2)"
              >通过</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleEdit(scope.row.id, 3)"
              >驳回</el-button
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
  </div>

  <el-dialog v-model="dialogTableVisible">
    <div class="detail">
      <div class="info">
        <h2>{{ article.title }}</h2>
        <h3>{{ article.digest }}</h3>
      </div>
      <el-divider content-position="left">正文</el-divider>

      <div class="content">
        <v-md-preview :text="article.content"></v-md-preview>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { Timer, Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import moment from "moment";
import{Get_Unreleased_Article_Data,Put_Article_Status_Data} from '@/api/index'
const tableData = ref();

// 分页
const total = ref(0);
// 赋值数据
let pagesize = ref(10);
let currentPage = ref(1);

// 获取所有未审核的文章
const get_unreleased_article_data = async(data)=>{
try {
  const res  = await Get_Unreleased_Article_Data(data)
  res.forEach(element => {
         element.create_time = moment(element.create_time).format(
          "YYYY-MM-DD:HH:MM:SS"
        );
    });
  tableData.value = res
  total.value = res.length
} catch (error) {
  console.log(error);
}
}
get_unreleased_article_data({status:0})


//分页器
const handleCurrentChange = (val) => {
  currentPage.value = val;

};

// 查看详情
const dialogTableVisible = ref(false);
const article = ref();
const checkdetail = (val) => {

};

// 修改文章的状态
Put_Article_Status_Data
const handleEdit =async (id,status)=>{
  let data = {
    id:id,
    status:status
  }
  try {
    const res = await Put_Article_Status_Data(data)
    tableData.value.forEach((element,index)=>{
            if(element.id == id){
              tableData.value.splice(index,1)
            }
          })
    ElMessage.success('操作成功')
  } catch (error) {
    console.log(error);
    ElMessage.error('操作失败')
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 900px;
  margin: auto;
  background: #fff;
  border: 1px solid #e2e2e2;
  box-shadow: 0 8px 30px rgb(0 80 179 / 12%);
  border-radius: 10px;
  .mt-4 {
    margin-bottom: 20px;
    margin-left: 20px;
    .el-input {
      width: 300px;
    }
  }
  .button {
    width: 400px;
    margin: auto;
    padding-bottom: 20px;
    .el-button {
      width: 400px;
    }
  }
  .mt-4:nth-child(1) {
    margin-top: 20px;
  }
}
.actviate_account {
  .el-table {
    margin: 50px auto;
  }
  .pagination {
    width: 10px;
    margin: auto;
    .el-pagination {
      margin-left: -100px;
    }
  }
}
.detail {
  .info {
    h2,
    h3 {
      padding: 15px;
      font-weight: 700;
    }
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 20px;
    }
  }
}
</style>

<style >
.el-dialog {
  width: 1000px;
}
.el-dialog .centent {
  width: 200px;
  margin: auto;
}
.centent .el-button {
  width: 200px;
  margin-top: 10px;
}
</style>
