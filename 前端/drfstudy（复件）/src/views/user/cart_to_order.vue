<template>
  <div class="pay">
    <div class="pay_address">
      <el-card>
        <template #header>
          <span>收货地址</span>
        </template>

        <div id="address_radio" v-for="item in address">
          <div class="address_radio">
            <el-radio-group v-model="form.address">
              <el-radio :label="item.id">
                <span
                  >{{ item.province_name }} {{ item.city_name }}
                  {{ item.district_name }} {{ item.place }}</span
                >
                <span style="padding-left: 40px">{{ item.mobile }}</span>
                <span style="padding-left: 40px">[ {{ item.name }}收 ]</span>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <el-empty :image-size="200" v-if="address.length == 0"></el-empty>
      </el-card>
    </div>

    <div class="pay_method">
      <el-card>
        <template #header>
          <span>支付方式</span>
        </template>

        <div id="address_radio" v-for="item in PAY_METHOD">
          <div class="address_radio">
            <el-radio-group v-model="form.pay_method">
              <el-radio :label="item"> </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-card>
    </div>

    <div class="pay_goods">
      <el-card>
        <template #header>
          <span>商品列表</span>
        </template>
        <div>
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column label="商品图片" width="300" header-align="center">
              <template #default="scope"
                ><img
                  :src="scope.row.img"
                  width="200"
                  height="80"
                  style="margin-left: 40px"
              /></template>
            </el-table-column>

            <el-table-column label="商品名称" width="300" header-align="center">
              <template #default="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>

            <el-table-column label="商品数量" width="220" header-align="center">
              <template #default="scope">
                <span style="margin-left: 38%">{{ scope.row.num }}</span>
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
                  scope.row.price * scope.row.num
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <div class="pay_submit">
      <el-card>
        <template #header>
          <span>支付</span>
        </template>
        <div class="content">
          <div>
            <P>合计（不含运费）：{{ form.user_price }}元</P>
            <P>共计 {{ form.user_shop_num }} 件商品</P>
          </div>
          <el-button type="primary" @click="Get_pay_good">去结算</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";


let form = ref({
  address: 1,
  pay_method: "支付宝",
  goods: [],
  user_price: 0,
  user_shop_num: 0,
});
// 地址数据
const address = ref([]);
// 获取用户的收货地址数据
import {Get_address_data} from '@/api/index'

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
// 支付类型
const PAY_METHOD = ["支付宝", "货到付款"];

// 商品数据
const tableData = ref([]);

// 支付商品
import { ElMessageBox } from "element-plus";
const address_name = ref("");
const order_user = ref("");


// 向后端发送用户取消的购物车数据
import { useRouter,useRoute } from "vue-router";



// 去支付
import { Go_payment } from "@/api/index";
import { useStore } from "vuex";
const store = useStore();



// 获取被选择的购物车数据
import { Get_check_cartdata } from "@/api/index";
const route = useRoute();
const Get_check_cart_data = async () => {
  const data_id = route.query;//获取路由传过来的商品id
  try {
    const res = await Get_check_cartdata(data_id);
    let data = [];
    res.good_datas.forEach((item) => {
      let good_data = {//对数据过滤出表格需要的字段
        id: item.id,
        img:"/aps/"+ item.commodityDetail.commodityimg_set[0].img_url,
        title: item.commodityDetail.name,
        num: item.number,
        price: item.commodityDetail.price,
      };
      data.push(good_data);
    });
    tableData.value = data;//赋值
    form.value.user_price = res.price;//赋值总价格
    form.value.user_shop_num = res.num;//赋值总商品数量
    form.value.goods = res.good_datas;//赋值选中的商品
  } catch (error) {
    console.log(error);
  }
};
Get_check_cart_data();

// 获取用户的商品地址


</script>

<style lang="less" scoped>
.pay {
  .pay_address {
    margin-top: 30px;
    padding-bottom: 50px;

    #address_radio {
      .el-radio {
        margin-top: 10px;

        span {
          font-size: 20px;
        }
      }
    }
  }

  .pay_method {
    padding-bottom: 50px;
  }

  .pay_submit {
    padding: 50px 0px;
    position: relative;

    .content {
      float: right;
      margin-right: 50px;
      width: 400px;
      height: 80px;
      position: relative;

      div {
        margin-top: 20px;
      }

      .el-button {
        width: 150px;
        height: 80px;
        background: #f56c6c;
        position: absolute;
        top: -10px;
        left: 210px;
      }
    }
  }
}
</style>