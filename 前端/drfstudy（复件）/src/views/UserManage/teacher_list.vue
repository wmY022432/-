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

  <div class="list">
    <div class="add">
      <el-button type="info" @click="add_teacher">添加老师</el-button>
    </div>
    <el-table :data="tableData" style="width: 1500px">
      <el-table-column label="入职时间" width="250" header-align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; margin-left: 20px">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date_joined }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 10%">{{ scope.row.first_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="职位" width="150" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="60" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="60" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="120" header-align="center">
        <template #default="scope">
          <span style="margin-left: 0%">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="190" header-align="center">
        <template #default="scope">
          <span style="margin-left: 16%">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系地址" width="200" header-align="center">
        <template #default="scope">
          <span style="margin-left: 20%">{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" header-align="center" width="200">
        <template #default="scope">
          <div style="margin-left: 20%">
            <el-button size="small" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleEdit2(scope.row, 0)"
              v-if="scope.row.is_operate"
              >封号</el-button
            >

            <el-button
              size="small"
              type="info"
              @click="handleEdit2(scope.row, 1)"
              v-else
              >解封</el-button
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

  <el-dialog v-model="dialogTableVisible" :title="title" center width="700">
    <AddTeacher :add_teacher_data="add_teacher_data" />
  </el-dialog>

  <el-dialog v-model="dialogTableVisible2" :title="title" center width="700">
    <UpdateTeacher
      :update_data="update_data"
      :update_teacher_data="update_teacher_data"
    />
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Get_Teacher_Data,
  Add_Teacher_Data,
  Update_Teacher_Data,
  Get_Search_Teacher_Data,
  Blacklist,
} from "@/api/index";
import AddTeacher from "@/components/add_teacher.vue";
import UpdateTeacher from "@/components/update_teacher.vue";
import { ElMessage, ElMessageBox } from "element-plus";
const tableData = ref();

// 分页
const total = ref();
// 赋值数据
let pagesize = ref(10);
let currentPage = ref(1);

// 获取所有老师的数据
const get_teacher_data = async (val) => {
  try {
    const res = await Get_Teacher_Data(val);
    let datas = [];
    res.data.forEach((element) => {
      let data = {
        id: element.id,
        date_joined: element.date_joined.replace("T", " "),
        username: element.username,
        first_name: element.first_name,
        position: element.userdetail ? element.userdetail.position : "",
        age: element.userdetail ? element.userdetail.age : "",
        sex: element.userdetail
          ? (element.userdetail.sex = element.userdetail.sex == 1 ? "男" : "女")
          : "",
        phone: element.userdetail ? element.userdetail.phone : "",
        email: element.email,
        address: element.userdetail ? element.userdetail.address : "",
        is_operate: element.is_active,
      };
      datas.push(data);
    });
    tableData.value = datas;
    total.value = res.count;
  } catch (error) {
    console.log(error);
  }
};
get_teacher_data();

//分页器
const handleCurrentChange = async (val) => {
  currentPage.value = val;
  get_teacher_data({ page: val, size: pagesize.value });
};

const title = ref();
const dialogTableVisible = ref(false);
const isupdate = ref(false);
// 添加老师数据
const add_teacher = () => {
  dialogTableVisible.value = true;
  title.value = "添加老师信息";
  isupdate.value = false;
  update_data.value = {};
};

const add_teacher_data = async (val) => {
  try {
    const res = await Add_Teacher_Data(val);
    res.status == 201 ? ElMessage.success(res.msg) : ElMessage.error(res.msg);
    dialogTableVisible.value = false;
  } catch (error) {}
};

// 修改老师信息
const update_data = ref();
const dialogTableVisible2 = ref();
const handleEdit = (val) => {
  dialogTableVisible2.value = true;
  title.value = "修改老师信息";
  update_data.value = val;
  isupdate.value = true;
};

const update_teacher_data = async (val) => {
  try {
    const res = await Update_Teacher_Data(val);
    if (res.status == 201) {
      tableData.value.forEach((element) => {
        if (element.id == val.id) {
          element.position = val.position;
        }
      });
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
    }
    dialogTableVisible.value = false;
  } catch (error) {
    console.log(error);
  }
};

// 用户搜索的字段数据
const Search_Data = reactive({
  username: "",
  phone: "",
  email: "",
});

// 通过用户输入的查询数据进行数据查询
const SearchForm = async () => {
  try {
    const res = await Get_Search_Teacher_Data(Search_Data);
    if (res.status == 201) {
      res.data.userdetail != null
        ? (res.data.phone = res.data.userdetail.phone)
        : (res.data.phone = "");
      res.data.date_joined = res.data.date_joined.replace("T", " ");
      let data = [];
      data.push(res.data);
      tableData.value = data;
      total.value = res.count;
    } else {
      ElMessage.error(res.msg);
    }
  } catch (error) {}
};

// 封号
const handleEdit2 = (val, operate) => {
  let title = null;
  console.log(operate);
  operate == 1 ? (title = "封号") : "解封";
  ElMessageBox.confirm(
    `确定对此账号进行${title}处理吗？`,

    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      center: true,
    }
  ).then(async () => {
    try {
      const res = await Blacklist({ user_id: val.id, operate: operate });
      if (res.status == 201) {
        ElMessage.success(res.msg);
        tableData.value.forEach((element) => {
          if (element.id == val.id) {
            element.is_operate = operate;
          }
        });
      } else {
        ElMessage.error(res.msg);
      }
    } catch (error) {}
  });
};
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
.list {
  width: 100%;
  .el-table {
    margin: auto;
  }
  .add {
    display: flex;
    justify-content: end;
    padding: 10px 100px;
    .el-button {
      width: 100px;
    }
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
