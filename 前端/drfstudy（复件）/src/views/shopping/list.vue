<template>
  <div class="shopping">
    <div class="banner">
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item>
          <h3 text="2xl" justify="center">
            <img src="@/assets/img/banner1.webp" alt="" />
          </h3>
        </el-carousel-item>
        <el-carousel-item>
          <h3 text="2xl" justify="center">
            <img src="@/assets/img/banner2.webp" alt="" />
          </h3>
        </el-carousel-item>
        <el-carousel-item>
          <h3 text="2xl" justify="center">
            <img src="@/assets/img/banner3.webp" alt="" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="search">
      <el-input
        v-model="Search_Data.name"
        placeholder="请输入你要搜索内容"
        class="input-with-select"
      >
        <template #prepend>
          <el-button @click="get_commodity_data">获取所有商品</el-button>
        </template>
        <template #append>
          <el-button @click="SearchForm">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-input>
    </div>

    <div class="select">
      <div class="select_data" v-for="item in options" :key="item.id">
        <el-select class="m-2" :placeholder="item.name" size="small">
          <el-option
            v-for="data in item.commoditytype_set"
            :key="data.id"
            :value="data.name"
            @click="get_select(data.id)"
          />
        </el-select>
      </div>
    </div>

    <div class="book_data">
      <el-row>
        <el-col v-for="i in commodities" :key="i" :span="4.4" @click="go_commodity_data(i)">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="i.commodityimg_set[0].img_url" />
            <div style="padding: 14px">
              <span id="title" v-html="i.name"></span>
              <p>{{ i.comments }}条评论</p>
              <p>销售量：{{ i.sales }}</p>
              <div id="curr_shop">{{ i.brand }}</div>
              <div id="price">{{ i.price }}元</div>
              <div class="bottom">
                <p text class="button" v-if="i.status == 0">该商品为预售商品</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import {ElMessage } from 'element-plus'
import {Get_CommodityTypes_Data,Get_Commodity_Data,Get_Search_Commodity_Data,Get_Type_Commodity_Data} from '@/api/index'
let options = ref();
// 获取所有商品分类的数据
const get_commoditytypes_data =async ()=>{
  try {
    const res = await Get_CommodityTypes_Data()
    options.value = res
  } catch (error) {
    console.log(error);
  }
}
get_commoditytypes_data()



// 获取所有的商品数据
const commodities = ref()
const get_commodity_data  = async(data)=>{
  try {
    const res = await Get_Commodity_Data(data)
    res.results.forEach(element => {
     element.commodityimg_set.forEach(item => {
       item.img_url = '/aps/'+item.img_url
     });
    });
    commodities.value =res.results
    // total.value = res.count
  } catch (error) {
    
  }
}
get_commodity_data()


// 获取某个分类的商品数据
const get_select = async(id)=>{
  try {
    const res = await Get_Type_Commodity_Data({classification2:id})
    res.forEach(element => {
     element.commodityimg_set.forEach(item => {
       item.img_url = '/aps/'+item.img_url
     });
    });
    commodities.value = res
  } catch (error) {
    console.log(error);
  }
}



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
    commodities.value = res.results;
    Search_Data.name = ''
  } catch (error) {}
};




//跳转到商品详情页面
import {useRouter} from 'vue-router'
const router = useRouter()
const  go_commodity_data= async(val)=>{
  if(val.status==1){
    router.push(`/user/shopping/detail/${val.id}`)
  }else{
    ElMessage.warning('此商品是预售商品，商品信息无法查看！')
  }
      
}



</script>

<style lang="less" scoped>
.shopping {
  .search {
    padding: 20px;

    .el-input {
      width: 1200px;
    }
  }
}

.banner {
  width: 1500px;
  margin-top: 20px;
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;

    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.select {
  .select_data {
    display: inline;
    margin-left: 20px;
  }
}

.book_data {
  margin-top: 50px;
  padding-bottom: 50px;
  h2 {
    padding: 20px;
    font-size: 30px;
    font-weight: 700;
    color: #483d8b;
  }

  .el-card {
    width: 250px;
    margin-left: 50px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 200px;
    }

    #title {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #252525;
      display: -webkit-box;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }

    p {
      margin-top: 10px;
      font-size: 12px;
    }

    #curr_shop {
      position: relative;
      float: left;
      max-width: 135px;
      font-size: 15px;
      padding-right: 20px;
      padding-top: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    #price {
      position: absolute;
      padding-left: 160px;
      color: red;
    }
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 20px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 200px;
    height: 40px;
    .button {
        position: absolute;
        left: 100px;
        color: blue;
    }
  }
  .image {
    width: 100%;
    display: block;
  }
}
</style>