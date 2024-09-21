<template>
  <div class="detail">
    <el-main v-if="commodity">
      <div class="tab">
        <p>{{ commodity.classification1_name }}</p>
        <span v-if="commodity.classification2_name">></span>
        <p>{{ commodity.classification2_name }}</p>
      </div>
      <div class="commodity">
        <!-- 放大镜效果 -->
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
            :initial-index="1"
            fit="cover"
          />
        </div>
        <div class="info">
          <h3 class="name">{{ commodity.name }}</h3>
          <h3 class="name" style="color: red; font-size: 10px">
            {{ commodity.caption }}
          </h3>
          <p>
            <span class="info_title">品牌：</span>
            {{ commodity.brand ? commodity.brand : "其他品牌" }}
          </p>
          <p>
            <span class="info_title">PROMOTE价：</span>
            <span style="color: red; font-size: 24px"
              >￥{{ commodity.price }}元</span
            >
          </p>
          <el-divider></el-divider>
          <div>
            <el-input-number
              :min="1"
              :max="commodity.stock"
              controls-position="right"
              v-model="good_num"
            />
            <el-button
              @click="add_cart_data"
              type="primary"
              style="margin: 10px 20px"
              >加入购物车</el-button
            >
            <el-button type="danger" style="margin-left: -10px"
              >直接购买</el-button
            >
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="规格与包装" name="first">{{
          commodity.pack ? commodity.pack : "暂无"
        }}</el-tab-pane>
        <el-tab-pane
          label="售后保障"
          name="second"
          v-html="commodity.serviceafter_sale"
        ></el-tab-pane>
        <el-tab-pane
          :label="`商品评价(${commodity.comments})`"
          name="third"
        ></el-tab-pane>
      </el-tabs>
    </el-main>
    <el-empty :image-size="200" v-else></el-empty>
  </div>
</template>

<script setup>
//通过路由获取商品的id
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();


import { reactive, ref } from "vue";
const commodity = ref([]);
const url = ref(
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
);
const srcList = ref([
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
]);

// 通过获取的商品id 请求商品的详情数据
import { Get_Commoditydetail_Data ,Post_Cart_Data} from "@/api/index";
const get_commoditydetail_data = async () => {
  try {
    const res = await Get_Commoditydetail_Data(route.params.id);

    commodity.value = res;

    url.value = '/aps/'+res.commodityimg_set[0].img_url;

    let url_all = [];

    res.commodityimg_set.forEach((item, index) => {
      url_all.push('/aps/'+item.img_url);
      srcList.value = url_all;
    });
  } catch (error) {
    console.log(error);
  }
};
get_commoditydetail_data();

// 获取用户输入的数据，发送给后台，添加至购物车

const good_num = ref(1);
const add_cart_data = async()=>{
  let data ={
    number:good_num.value,
    commodity:route.params.id
  }
  try {
    const res = await Post_Cart_Data(data)
   if(res.status==201){
    ElMessage.success(res.msg)
   }else{
    ElMessage.error(res.msg)
   }
  } catch (error) {
    console.log(error);
  }
}


</script>

<style lang="less" scoped>
.detail {
  position: absolute;
  left: 200px;
  .tab {
    color: #666;
    font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
      "\u5b8b\u4f53", sans-serif;
    display: flex;
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 20px;
  }
  .el-tabs .el-tab-pane {
    padding: 12px 0;
    line-height: 220%;
    color: #999;
    font-size: 12px;
  }
  .tab p {
    padding: 0px 20px;
  }
  .commodity {
    display: flex;
    margin-bottom: 50px;
    .demo-image__error .image-slot {
      font-size: 30px;
    }
    .demo-image__error .image-slot .el-icon {
      font-size: 30px;
    }
    .demo-image__error .el-image {
      width: 100%;
      height: 200px;
    }
  }
  .info {
    margin: 0px 50px;
  }
  .info .name {
    font: 700 18px Arial, "microsoft yahei";
    color: #666;
    margin-bottom: 20px;
  }
  .info p {
    margin-top: 20px;
    color: #666;
  }
  .info .info_title {
    color: gray;
    letter-spacing: 3px;
  }
}
</style>