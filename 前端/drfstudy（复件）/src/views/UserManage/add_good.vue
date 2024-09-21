<template>
  <div class="add_good">
    <el-header>
      <img src="@/assets/img/logo_i.png" height="60" />
      <div class="info">
        <div>
          <h3>码趣教育</h3>
          <h4>PROMOTE系统</h4>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <h4 style="margin-top: 15px; font-size: 20px; font-weight: 600">
        上架商品
      </h4>
    </el-header>

    <el-main>
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
          <el-button type="primary" @click="submitForm(ruleFormRef, 0)"
            >保存商品</el-button
          >
          <el-button type="primary" @click="submitForm(ruleFormRef, 1)"
            >立即上架</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置数据</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {Post_Commodity_Data,Get_CommodityTypes_Data,Get_CommodityType_Data,} from '@/api/index'
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import {ElMessage} from 'element-plus'
// 对商品图片进行删除
const disabled = ref(false);
const uploadRef = ref();
const handleRemove = (file) => {
  uploadRef.value.clearFiles();
};
//复制图片
const checkfile = (file) => {
  form.file = file.raw;
};

const form = reactive({
  name: "", //商品名
  caption: "", //副标题
  brand: "", //品牌
  price: 0.0, //单价
  stock: 0.0, //库存
  classification1: "", //第一类型
  classification2: "", //第二类型
  pack: "", //包装信息
  serviceafter_sale: "", //售后服务
  status: 0, //是否上架还是保存
});

// 重置数据
const ruleFormRef = ref();
const resetForm = (ruleFormRef) => {
  ruleFormRef.resetFields();
};

// 对数据进行校验
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





// 校验数据
const submitForm = async (formEl,status) => {
  form.status = status
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      add()
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 提交数据
const add = async (formEl) => {
  let formData = new FormData();

  for (var i in form) {
    formData.append(i, form[i]);
  }
  try {
    const res = await Post_Commodity_Data(formData);
    formEl.resetFields();
    ElMessage.success('添加成功！')
  } catch (error) {
    console.log(error);
  }
};

// 获取一级商品类型的数据
const commoditytypes = ref([]);
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

const commoditytype2s = ref([]);
const Get_commoditytype2 = async (id) => {
  try {
    const res = await Get_CommodityType_Data(id);
    commoditytype2s.value = res.commoditytype_set;
  } catch (error) {
    console.log(error);
  }
};

</script>

<style lang="less" scoped>
.add_good {
  .el-header {
    display: flex;
    align-content: center;

    .info {
      display: flex;
      align-content: center;

      h3 {
        font-size: 30px;
        font-weight: 700;
      }

      h4 {
        font-size: 20px;
      }
    }

    .el-divider {
      height: 50px;
    }
  }
  .el-main {
    width: 1100px;
    height: 700px;
    margin: 50px 100px;
    .el-form {
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
    }
  }
}
</style>