<template>
  <div class="search">
    <div class="mt-4">
      <el-input
        v-model="Search_Data.name"
        placeholder="请输入关键字..."
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="SearchForm" />
        </template>
      </el-input>
    </div>
  </div>

  <el-table :data="tableData" style="width: 2000px">
    <el-table-column label="入职时间" width="200" header-align="center">
      <template #default="scope">
        <div style="display: flex; align-items: center; margin-left: 20px">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" width="200" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%" v-html="scope.row.name"></span>
      </template>
    </el-table-column>
    <el-table-column label="商品价格" width="80" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品品牌" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.brand }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品销量" width="80" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.sales }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品分类" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{
          scope.row.classification2_name
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品评价" width="80" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.comments }}</span>
      </template>
    </el-table-column>
    <el-table-column label="商品图片" width="120" header-align="center">
      <template #default="scope">
        <img :src="scope.row.commodityimg_set[0].img_url" alt="" />
      </template>
    </el-table-column>
    <el-table-column label="商品状态" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.status }}</span>
      </template>
    </el-table-column>
    <el-table-column label="发布者" width="120" header-align="center">
      <template #default="scope">
        <span style="margin-left: 10%">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column label="其他操作" width="220" header-align="center">
      <template #default="scope">
        <div style="margin-left: 35%">
          <el-button size="small" type="info" @click="handleEdit(scope.row)"
            >修改</el-button
          >

          <el-button
            size="small"
            type="danger"
            @click="DeleteEdit(scope.row.id)"
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

  <el-dialog v-model="dialogTableVisible" title="Shipping address">
    <el-form
      label-width="120px"
      class="demo-ruleForm"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="商品名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="副标题" prop="caption">
        <el-input v-model="form.caption"></el-input>
      </el-form-item>

      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand"></el-input>
      </el-form-item>

      <el-form-item label="单价" prop="price">
        <el-input-number
          v-model="form.price"
          :precision="1"
          :step="1"
          :max="100000"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item label="库存" prop="stock">
        <el-input-number
          v-model="form.stock"
          :step="1"
          :max="100000"
          controls-position="right"
        />
      </el-form-item>

      <div class="district">
        <el-form-item label="选择类目" prop="classification1">
          <el-select
            v-model="form.classification1"
            placeholder="请选择一级类目"
          >
            <el-option
              v-for="commoditytype in commoditytypes"
              :label="commoditytype.name"
              :value="commoditytype.id"
              :key="commoditytype.id"
              @click="Get_commoditytype2(commoditytype.id)"
            ></el-option>
          </el-select>
        </el-form-item>
        <span>-</span>
        <el-form-item prop="classification2">
          <el-select
            v-model="form.classification2"
            placeholder="请选择二级类目"
          >
            <el-option
              v-for="commoditytype2 in commoditytype2s"
              :label="commoditytype2.name"
              :value="commoditytype2.id"
              :key="commoditytype2.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="商品图">
        <el-upload
          ref="uploadRef"
          list-type="picture-card"
          :auto-upload="false"
          :limit="5"
          :on-change="checkfile"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="包装信息" prop="pack">
        <el-input v-model="form.pack"></el-input>
      </el-form-item>

      <el-form-item label="售后服务" prop="serviceafter_sale">
        <el-input
          v-model="form.serviceafter_sale"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置数据</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";

import {
  Delete,
  Download,
  Plus,
  ZoomIn,
  Search,
} from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {Get_Commodity_Data,Get_CommodityTypes_Data,Get_CommodityType_Data,Put_Commodity_Data,
  Delete_Commodity_Data,
  Get_Search_Commodity_Data} from '@/api/index'
const tableData = ref();

// 分页
const total = ref();
// 赋值数据
let pagesize = ref(10);
let currentPage = ref(1);

//获取商品信息
const get_commodity_data  = async(data)=>{
  try {
    const res = await Get_Commodity_Data(data)
    res.results.forEach(element => {
     element.commodityimg_set.forEach(item => {
       item.img_url = '/aps/'+item.img_url
     });
    });
    tableData.value =res.results
    total.value = res.count
  } catch (error) {
    
  }
}
get_commodity_data({page:1,size:pagesize.value})
//分页器
const handleCurrentChange = async (val) => {
  currentPage.value = val;
  get_commodity_data({page:val,size:pagesize.value})
};

// 获取一级商品类型的数据
const commoditytypes = ref([]);
const commoditytype2s = ref([]);
const get_commoditytype_data = async () => {
  try {
    const res = await Get_CommodityTypes_Data();
    commoditytypes.value = res;

  } catch (error) {
    console.log(error);
  }
};
get_commoditytype_data();

// 获取二级商品类型的数据
const Get_commoditytype2 = async (id) => {
  try {
    const res = await Get_CommodityType_Data(id);
    commoditytype2s.value = res.commoditytype_set;
  } catch (error) {
    console.log(error);
  }
};


// 对商品图片进行删除
const disabled = ref(false);
const uploadRef = ref();
const handleRemove = (file) => {
  uploadRef.value.clearFiles();
};

//复制图片
const checkfile = (file) => {
  form.value.file = file.raw;
};

// 修改商品信息
const ruleFormRef = ref();
const dialogTableVisible = ref(false);

// 校验规则
const rules = reactive({
  name: [
    {
      required: true,
      message: "标题不能为空",
      trigger: "blur",
    },
  ],
  caption: [
    {
      required: true,
      message: "请输入副标题",
      trigger: "blur",
    },
  ],
  brand: [
    {
      required: true,
      message: "请输入品牌",
      trigger: "blur",
    },
  ],
  price: [
    {
      required: true,
      message: "请输入单价",
      trigger: "blur",
    },
  ],
  classification1: [
    {
      required: true,
      message: "请输入第一类目",
      trigger: "blur",
    },
  ],
  classification2: [
    {
      required: true,
      message: "请输入第二类目",
      trigger: "blur",
    },
  ],
});

// 修改的数据
const form = ref();
// 点击修改按钮。赋值数据
const handleEdit = (val) => {

  dialogTableVisible.value = true;
  form.value = JSON.parse(JSON.stringify(val));
};

// 校验数据
const submitForm = async (formEl, id) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      update_commodity_data();
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 把修改的数据提交给后台
const update_commodity_data = async () => {
  let formData = new FormData();
  for (var i in form.value) {
    formData.append(i, form.value[i]);
  }
  try {
    const res = await Put_Commodity_Data(form.value.id, formData);
    res.commodityimg_set.forEach(item => {
       item.img_url = '/aps/'+item.img_url
    });

    tableData.value.forEach((element, index) => {
      if (element.id == res.id) {
        tableData.value[index] = res;
      }
    });
    dialogTableVisible.value = false;
    ElMessage.success("修改成功");
  } catch (error) {
    console.log(error);
    ElMessage.error("修改失败");
  }
};


// 删除商品数据
const DeleteEdit = async (id) => {
  ElMessageBox.confirm(
    "确定删除此商品数据吗？",

    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      center: true,
    }
  ).then(async () => {
    try {
      await Delete_Commodity_Data(id);
      ElMessage.success("删除成功");
      tableData.value.forEach((element, index) => {
        if (element.id == id) {
          tableData.value.splice(index, 1);
        }
      });
    } catch (error) {
      ElMessage.error("删除失败");
    }
  });
};


// 通过商品名搜索商品数据
const Search_Data = reactive({
  name:''
})
const SearchForm = async () => {
  try {
    const res = await Get_Search_Commodity_Data(Search_Data);
    res.results.forEach(element => {
     element.commodityimg_set.forEach(item => {
       item.img_url = '/aps/'+item.img_url
     });
    });
    tableData.value = res.results;
    total.value = res.count;
  } catch (error) {}
};

</script>

<style lang="less" scoped>
img {
  width: 100px;
  height: 100px;
}

.district {
  display: flex;
  span {
    line-height: 31px;
    margin-left: 6px;
  }
  .el-form-item:nth-child(3) {
    margin-left: -114px;
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