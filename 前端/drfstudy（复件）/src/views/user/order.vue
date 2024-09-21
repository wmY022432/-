<template>
  <div class="order">
    <el-header>
      <img src="@/assets/img/logo_i.png" height="60" />
      <div class="info">
        <div>
          <h3>码趣教育</h3>
          <h4>PROMOTE系统</h4>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <h4 style="margin-top: 15px; font-size: 20px; font-weight: 600">订单</h4>
    </el-header>

    <el-main>
      <div style="padding-bottom: 15px">
        <el-button type="success" @click="Get_pay_order">已支付订单</el-button>
        <el-button type="danger" @click="Get_payoff_order"
          >未支付订单</el-button
        >
      </div>

      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        stripe
        style="width: 1500px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="订单编号" width="200" header-align="center">
          <template #default="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商品总数" width="100" header-align="center">
          <template #default="scope">
            <span style="margin-left: 38%">{{ scope.row.total_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单总金额" width="150" header-align="center">
          <template #default="scope">
            <span style="margin-left: 30%">{{ scope.row.total_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100" header-align="center">
          <template #default="scope">
            <span v-if="scope.row.status == 1"
              ><el-button type="danger" @click="go_unpaid_payment(scope.row)"
                >去支付</el-button
              ></span
            >
            <span style="margin-left: 25%" v-else>{{
              STATUS[scope.row.status - 1]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="150" header-align="center">
          <template #default="scope">
            <span style="margin-left: 30%">{{
              PAY_METHOD[scope.row.pay_method - 1]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收货地址" width="250" header-align="center">
          <template #default="scope">
            <span style="margin-left: 10%">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收货人" width="100" header-align="center">
          <template #default="scope">
            <span style="margin-left: 30%">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="250" header-align="center">
          <template #default="scope">
            <span style="margin-left: 10%">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="其他操作" width="200" header-align="center">
          <template #default="scope">
            <el-button
              style="margin-left: 38%"
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              v-if="scope.row.status == 1"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="total"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script setup>
const { ref } = require("@vue/reactivity");

const STATUS = ref([
  "未支付",
  "待发货",
  "待收货",
  "待评价",
  "已完成",
  "已取消",
]);

const PAY_METHOD = ref(["支付宝", "货到付款"]);

// 订单数据
const tableData = ref([]);



// 分页
let pagesize = ref(4);
let currentPage = ref(1);
let total = ref(0);

//分页器
const handleSizeChange = (val) => {
  pagesize.value = val;
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

//请求后端 ，获取已支付的订单数据


//请求后端 ，获取未支付订单


// 删除未支付订单
import { ElMessage, ElMessageBox } from "element-plus";


// 支付未支付的订单
import {useStore} from 'vuex'
const store = useStore()

</script>

<style lang="less" scoped>
.order {
  position: absolute;
  left: 200px;
  padding: 50px;

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

  .page {
    margin-left: 700px;
  }
}
</style>