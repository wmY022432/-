<template>
  <div class="search">
    <div class="mt-4">
      账号：
      <el-input
        style="width: 800px"
        v-model="Search_Data.username"
        placeholder="请输入账号..."
        class="input-with-select"
      >
      </el-input>
    </div>
      <div class="mt-4">
      联系方式：
      <el-input
        style="width: 768px"
        v-model="Search_Data.phone"
        placeholder="请输入联系方式..."
        class="input-with-select"
      >
      </el-input>
    </div>
      <div class="mt-4">
      QQ邮箱：
      <el-input
        style="width: 775px"
        v-model="Search_Data.email"
        placeholder="请输入QQ邮箱..."
        class="input-with-select"
      >
      </el-input>
    </div>
     <div class="button">
        <el-button type="primary" @click="SearchForm">查询</el-button>
     </div>
  </div>
  <div class="actviate_account">
    <el-table :data="tableData" style="width: 1000px">
      <el-table-column label="注册时间" width="250" header-align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; margin-left: 20px">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date_joined }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学生账号" width="180" header-align="center">
        <template #default="scope">
          <span style="margin-left: 30%">{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系方式" width="180" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QQ邮箱" width="200" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center">
        <template #default="scope">
          <div style="margin-left: 35%">
            <el-button size="small" @click="handleEdit(scope.row)"
              >激活</el-button
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
  <el-dialog v-model="dialogTableVisible" title="绑定学生班级" center>
    <div class="centent">
      <el-select
        v-model="userData.classes_id"
        class="m-2"
        placeholder="请选择学生所在的班级"
      >
        <el-option
          v-for="item in classes_data"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div>
        <el-button type="primary" @click="submitFrom">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { Timer, Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import {
  Get_User_Activate_Account_Data,
  Get_Classes_Data,
  Put_Activate_Account_Data,
  Get_Search_Data
} from "@/api/index";
import { ElMessage } from "element-plus";
const tableData = ref();

// 分页
const total = ref(0);
// 赋值数据
let pagesize = ref(10);
let currentPage = ref(1);

// 获取未激活的学生账号的数据
const get_actiate_account_data = async (val) => {
  try {
    const res = await Get_User_Activate_Account_Data(val);
    res.results.forEach((element) => {
      element.userdetail != null
        ? (element.phone = element.userdetail.phone)
        : (element.phone = "");
      element.date_joined = element.date_joined.replace("T", " ");
    });
    tableData.value = res.results;
    total.value = res.count;
  } catch (error) {
    console.log(error);
  }
};
get_actiate_account_data({
  page: 1,
  size: pagesize.value,
});


//分页器
const handleCurrentChange = (val) => {
  currentPage.value = val;
  get_actiate_account_data({
    page: val,
    size: pagesize.value,
  });
};


// 获取用户班级的数据
const classes_data = ref();
const get_classes_data = async () => {
  try {
    const res = await Get_Classes_Data();
    classes_data.value = res.results;
  } catch (error) {
    console.log(error);
  }
};
get_classes_data();

const userData = reactive({
  user_id: "",
  classes_id: "",
});
const dialogTableVisible = ref(false);
const handleEdit = (row) => {
  userData.user_id = row.id;
  dialogTableVisible.value = true;
};

// 提交数据给后端,激活账号
const submitFrom = async () => {
  try {
    const res = await Put_Activate_Account_Data(userData);
    res.status == 201 ? ElMessage.success(res.msg) : ElMessage.error(res.msg);
    tableData.value.forEach((element, index) => {
      if (element.id == userData.user_id) {
        tableData.value.splice(index, 1);
      }
    });
    dialogTableVisible.value = false;
  } catch (error) {
    console.log(error);
  }
};

// 用户搜索的字段数据 
const Search_Data = reactive({
  username:'',
  phone:'',
  email:''
})

// 通过用户输入的查询数据进行数据查询
const SearchForm = async()=>{
  try {
    const res = await Get_Search_Data(Search_Data)
    if(res.status==201){
       res.data.userdetail != null
        ? (res.data.phone = res.data.userdetail.phone)
        : (res.data.phone = "");
      res.data.date_joined = res.data.date_joined.replace("T", " ");
      let data = []
      data.push(res.data)
      tableData.value = data
      total.value = res.count;
    }else{
      ElMessage.error(res.msg)
    }
     
  } catch (error) {
    
  }
}

</script>

<style lang="less" scoped>
.search{
  width: 900px;
  margin: auto;
  background: #fff;
  border: 1px solid #e2e2e2;
  box-shadow: 0 8px 30px rgb(0 80 179 / 12%);
  border-radius: 10px;
  .mt-4{
    margin-bottom: 20px;
    margin-left: 20px;
    .el-input{
      width: 300px;
    }
  }
  .button{
    width: 400px;
    margin: auto; 
    padding-bottom: 20px;
    .el-button{
      width: 400px;
    }
  }
  .mt-4:nth-child(1){
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
</style>

<style >
.el-dialog {
  width: 500px;
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
