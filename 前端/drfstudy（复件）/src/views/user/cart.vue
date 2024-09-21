<template>
  <div class="cart">
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
        购物车
      </h4>
    </el-header>

    <el-main>
      <div>
        全部商品
        <span style="color: red">{{ cart.length }}</span> 件
      </div>
      <!-- 表格 -->
      <div>
        <el-table ref="multipleTableRef" :data="cart" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />

          <el-table-column label="商品图片" width="300" header-align="center">
            <template #default="scope"><img :src="scope.row.img" width="200" height="80"
                style="margin-left: 40px" /></template>
          </el-table-column>

          <el-table-column label="商品名称" width="300" header-align="center">
            <template #default="scope">
              <span style="margin-left:20%">{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品数量" width="220" header-align="center">
            <template #default="scope">
              <el-input-number :min="1" :max="scope.row.stock" v-model="scope.row.num" controls-position="right"
                style="margin-left:20%" @change="update_cart_data_num(scope.row)" />
            </template>
          </el-table-column>

          <el-table-column label="商品价格" width="220" header-align="center">
            <template #default="scope">
              <span style="margin-left: 44%">{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="商品小计" width="220" header-align="center">
            <template #default="scope">
              <span style="margin-left: 44%">{{
                scope.row.num * scope.row.price
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="220" header-align="center">
            <template #default="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                style="margin-left: 40%">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination" v-if="total > 0">
        <el-pagination @current-change="handleCurrentChange" :page-size="pagesize" layout="prev, pager, next"
          :total="total" class="mt-4" :current-page="currentPage" />
      </div>
    </el-main>
  </div>

  <div class="payment">
    <p>合计（不含运费）：{{ user_price }}元</p>
    <p style="text-align: right">共计 {{ user_shop_num }} 件商品</p>
    <el-button type="primary" @click="go_cart_to_order">去结算</el-button>
  </div>
</template>
<script setup>
// 获取购物车商品数据
import { ref } from "vue";
import { Get_Cart_Data, Put_Cart_Num_Data } from "@/api/index";
import { ElMessage } from "element-plus";
const cart = ref([]);
const get_cart_data = async () => {
  try {
    const res = await Get_Cart_Data();
    let data = [];
    res.forEach((item) => {
      let good_data = {
        id: item.id,
        img: '/aps/' + item.commodityDetail.commodityimg_set[0].img_url,
        title: item.commodityDetail.name,
        num: item.number,
        price: item.commodityDetail.price,
        stock: item.commodityDetail.stock,
      };
      data.push(good_data);
    });
    cart.value = data;
    total.value = data.length;
  } catch (error) {
    ElMessage.error("购物车商品数据获取失败，请稍后再试！");
  }
}
get_cart_data()
// 分页
const total = ref(0);
let pagesize = ref(5);
let currentPage = ref(1);
//分页器
const handleSizeChange = (val) => {
  pagesize.value = val;
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
};



// 计算选中的商品总价格和总数量
let user_price = ref(0);
let user_shop_num = ref(0);
const computed_price_and_num = () => {
  let priceall = 0;
  let shop_num_all = 0;

  multipleSelection.value.forEach((item) => {
    // 单个商品的总价格
    let price = item.price * item.num;
    // 总商品数量（item.num）
    shop_num_all += item.num;
    // 总价格
    priceall += price;
  });
  user_price.value = priceall;
  user_shop_num.value = shop_num_all;
};



const multipleSelection = ref([]);
// 选中商品，计算总价格和总商品数量
const handleSelectionChange = (val)=>{
  multipleSelection.value = val
  computed_price_and_num()
}

// 点击添加商品个数，把商品个数发给后台进行数据修改，前端并重新计算总商品价格，总商品数
const update_cart_data_num = async (val) => {
  let data = {
    id: val.id,
    num: val.num
  }
  try {
    await Put_Cart_Num_Data(data);
    computed_price_and_num()
  } catch (error) {
    console.log(error);
  }
}

// 去支付页面，并把用户选中的商品id传过去
import { useRouter } from "vue-router";
const router = useRouter();

const go_cart_to_order = () => {
  if (multipleSelection.value != "") {
    let data = [];
    multipleSelection.value.forEach((item) => {
      data.push(item.id);
      router.push({
        name: "pay_cart",
        query: data,
      });
    });
  } else {
    ElMessage.warning("没有选中任何商品下单哦！");
  }
};


// 删除购物车的商品数据
import { ElMessageBox } from "element-plus";
import { async } from "@kangc/v-md-editor";
const handleDelete = (index, row) => {
  ElMessageBox.confirm(
    "你确定要从购物车移除该商品吗?",

    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      center: true,
    }
  )
    .then(() => {
      Delete_data(row);
    })


};

// 向后端发送要删除的商品数据
import { Delete_Cart_Data } from "@/api/index";
const Delete_data = async (row) => {
  try {
    const res = await Delete_Cart_Data(row.id);
    cart.value.forEach((element,index) => {
      if(element.id == row.id){
        cart.value.splice(index,1)
      }
    });

    total.value = total.value-1;
    ElMessage({
      type: "success",
      message: "商品已被移出购物车",
    });
  } catch (error) {
    console.log(error);
  }
};

</script>



<style lang="less" scoped>
.cart {
  img {
    margin-top: -3px;
  }

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
}

.pagination {
  width: 100%;

  .el-pagination {
    width: 200px;
    margin: 20px auto;
  }
}

.payment {
  position: absolute;
  right: 380px;
  bottom: 150px;

  .el-button {
    position: absolute;
    top: -25px;
    left: 200px;
    width: 150px;
    height: 80px;
    background: #f56c6c;
  }
}
</style>