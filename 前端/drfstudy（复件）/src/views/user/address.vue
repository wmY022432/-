<template>
  <div class="address">
    <div class="add_address">
      <el-button type="primary" @click="dialogTableVisible = true"
        >新增收货地址</el-button
      >
    </div>

    <!-- 添加地址 -->
    <div>
      <el-dialog v-model="dialogTableVisible" title="新增收货地址">
        <el-form
          ref="ruleFormRef"
          :model="form"
          label-width="120px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="收货人" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>

          <el-form-item label="地址标签" >
            <el-select placeholder="家" v-model="form.type">
              <el-option value="0" label="家"></el-option>
              <el-option value="1" label="公司"></el-option>
              <el-option value="2" label="学校"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在地区" prop="district">
            <el-select v-model="form.province" placeholder="请选择省">
              <el-option
                :label="province.name"
                :value="province.id"
                :key="province.id"
                v-for="province in provinces"
                @click="get_citys(province.id)"
              ></el-option> </el-select
            >-
            <el-select v-model="form.city" placeholder="请选择市">
              <el-option
                :label="city.name"
                :value="city.id"
                :key="city.id"
                v-for="city in citys"
                @click="get_districts(city.id)"
              ></el-option> </el-select
            >-
            <el-select v-model="form.district" placeholder="请选择区">
              <el-option
                :label="district.name"
                :value="district.id"
                :key="district.id"
                v-for="district in districts"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="详情地址" prop="place">
            <el-input v-model="form.place" />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="form.mobile" />
          </el-form-item>

          <el-form-item
            label="是否为默认地址"
            prop="name"
            style="margin-left: 40px"
          >
            <el-switch v-model="form.is_check" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()"
              >保存收货地址</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">重置收货信息</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 展示地址 -->
    <div class="show_address">
      <el-card class="box-card" v-for="item in address" :key="item.id">
        <template #header>
          <div class="card-header">
            <span v-if="item.is_check == 0">默认地址</span>
            <span v-else></span>
            <span>{{ TYPE[item.type] }}</span>
          <div>
               <el-button type="primary" @click="update_address(item)">修改地址</el-button>
             <el-button type="danger" @click="delete_address(item.id)">删除地址</el-button>
          </div>
          </div>
        </template>
        <div>
          <p>收货人：{{ item.name }}</p>
          <p>
            地址：{{ item.province_name }}{{ item.city_name }}{{ item.district_name
            }}--{{ item.place }}
          </p>
          <p>联系方式：{{ item.mobile }}</p>
        </div>
      </el-card>
       <el-empty :image-size="200" v-if="!address" description="没有更多内容 "></el-empty>
    </div>

    <!-- 修改地址 -->
    <div>
      <el-dialog v-model="dialogTableVisible2" title="修改收货地址">
        <el-form
          :model="new_address"
          label-width="120px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="收货人" prop="name">
            <el-input
              v-model="new_address.name"
              :placeholder="new_address.name"
            />
          </el-form-item>

          <el-form-item label="地址标签">
            <el-select
              :placeholder="TYPE[new_address.type]"
              v-model="new_address.type"
            >
              <el-option :value="0" label="家"></el-option>
              <el-option :value="1" label="公司"></el-option>
              <el-option :value="2" label="学校"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="所在地区" prop="district">
            <el-select v-model="new_address.province_name" placeholder="请选择省">
              <el-option
                v-for="province in provinces"
                :label="province.name"
                :value="province.id"
                :key="province.id"
                
                @click="get_citys(province.id)"
              ></el-option> </el-select
            >-
            <el-select v-model="new_address.city_name" placeholder="请选择市">
              <el-option
              v-for="city in citys"
                :label="city.name"
                :value="city.id"
                :key="city.id"
               
                @click="get_districts(city.id)"
              ></el-option> </el-select
            >-
            <el-select v-model="new_address.district_name" placeholder="请选择区">
              <el-option
                :label="district.name"
                :value="district.id"
                :key="district.id"
                v-for="district in districts"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="详情地址" prop="place">
            <el-input
              v-model="new_address.place"
              :placeholder="new_address.place"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input
              v-model="new_address.mobile"
              :placeholder="new_address.mobile"
            />
          </el-form-item>

          <el-form-item
            label="是否为默认地址"
            prop="name"
            style="margin-left: 40px"
          >
            <el-switch v-model="new_address.is_check" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="update_address_file(new_address)"
              >保存收货地址</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {Get_areas_data,Get_citys_data,Get_districts_data} from '@/api/index'
const ruleFormRef = ref();

const TYPE = ['家','公司','学校']
// 用户地址
let address = ref([

]);
// 用户的数据
let form = ref({

});

// 对数据进行校验
const rules = reactive({
  name: [
    {
      required: true,
      message: "收货人不能为空",
      trigger: "blur",
    },
    {
      max: 6,
      message: "名称长度不能大于6位",
      trigger: "blur",
    },
  ],
  province: [
    {
      required: true,
      message: "请输入省份信息",
      trigger: "blur",
    },
  ],
  city: [
    {
      required: true,
      message: "请输入所在的市",
      trigger: "blur",
    },
  ],
  district: [
    {
      required: true,
      message: "请输入所在的区",
      trigger: "blur",
    },
  ],
  place: [
    {
      required: true,
      message: "请输入详情地址",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "blur",
    },
    {
      pattern: /^1[3-9][0-9]\d{8}$/,
      message: "请输入合法手机号/电话号",
      trigger: "blur",
    },
  ],
});

const dialogTableVisible = ref(false);

// 提交用户输入的数据 ，发送后端
import { Post_address_data } from "@/api/index";
import { ElMessage } from "element-plus";

const submitForm = async () => {
  if (
    form.value.type != "" &&
    form.value.name != "" &&
    form.provinces != "" &&
    form.district != "" &&
    form.value.place != "" &&
    form.value.city != "" &&
    form.value.mobile != ""
  ) {
    form.value.is_check == true
      ? (form.value.is_check = 0)
      : (form.value.is_check = 1);
    try {
      const res = await Post_address_data(form.value);
      if (res) {
        address.value = res
        ElMessage({
          showClose: true,
          message: "地址添加成功！",
          type: "success",
        });
        dialogTableVisible.value = false;
        form.value = ref([]);
      }
    } catch (error) {
      if(JSON.parse(error.request.responseText)['detail']){
         ElMessage.error(JSON.parse(error.request.responseText)['detail']);
      }else{
        ElMessage.error("地址添加失败");
      }
    }
  }else{
     ElMessage.error("带*号的不能为空！"); 
  }
};





// 重置数据
const resetForm = (ruleFormRef) => {
  ruleFormRef.resetFields();
  console.log(ruleFormRef);
};

// 修改之后的地址数据
const dialogTableVisible2 = ref(false);
let new_address = ref({
  id: "",
  type: "",
  is_check:true,
  name: "",
  province: "",
  city: "",
  district: "",
  place: "",
  phone: "",
});

//把原始值赋值到页面
const update_address = (val) => {
  new_address.value=val
  new_address.value.is_check==0?new_address.value.is_check=true:new_address.value.is_check=false
  dialogTableVisible2.value = true
};


// 提交修改之后的数据 发送给后台



// 删除用户地址数据


const provinces = ref([]);
// 获取省级数据
const Get_areadata = async () => {
  try {
    const res = await Get_areas_data();
    provinces.value = res;
  } catch (error) {
    ElMessage.error("省份信息获取失败，请稍后重试");
  }
};
Get_areadata();


const citys = ref([]);
// 获取城市数据
const get_citys = async (val) => {
  try {
    const res = await Get_citys_data(val);
    citys.value = res.area_set;
  } catch (error) {
   ElMessage.error("城市信息获取失败，请稍后重试");
  }
};

const districts = ref([]);
// 获取区或者县城数据
const get_districts = async (val) => {
  try {
    const res = await Get_districts_data(val);
    districts.value = res.area_set;
  } catch (error) {
   ElMessage.error("区域信息获取失败，请稍后重试");
  }
};



// 获取用户的收货地址数据
import {Get_address_data} from '@/api/index'
import { async } from "@kangc/v-md-editor";
const Get_addressdata = async()=>{
    try {
        const res  = await Get_address_data()
  
        address.value = res
    } catch (error) {
        console.log(error)
        ElMessage.error("地址信息获取失败，请稍后重试");
    }
}
Get_addressdata()
</script>

<style lang="less" scoped>
.address {
  .add_address {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .el-button{
      width: 100px;
      margin-right: 100px;
    }
  }
}

.show_address {
  margin-top: 6%;
  padding-bottom: 50px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 900px;
    margin-left: 150px;
    margin-top: 10px;
  }

  p {
    margin-top: 20px;
  }

  p:nth-child(1) {
    margin-top: 0px;
  }
}
</style>



