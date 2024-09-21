<template>
  <div id="box">
    <!-- 选择题目的类型 -->
    <div class="search">
      <el-input
        v-model="search_data.subject"
        placeholder="请输入你要搜索内容"
        class="input-with-select"
      >

        <template #append>
          <el-button @click="searchfunc(search_data)">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-input>
    </div>

    <!-- 从第几题开始写 -->
    <div class="start">
      从第
      <el-input-number
        v-model="offset"
        :min="1"
        :max="topics.data.count"
        @change="get_topics"
      />
      题开始 题目总数： {{ topics.data.count }}题
    </div>

    <!-- 题目内容 -->
    <div class="subject">
      <el-collapse v-model="activeNames" infinite-scroll-disabled="disabled">
        <el-collapse-item
          v-for="(topic, index) in topics.data.results"
          :name="topic.id"
          :key="topic.id"
        >
          <template #title>
            <span>{{ topic.id }}、</span>
            <span v-html="topic.subject"></span>
            <el-tag>{{ topic.label_name }}</el-tag>
            <el-tag>{{ TYPE_CHOICES[topic.type] }}</el-tag>
          </template>
          <div v-html="topic.description"></div>
          <el-form :inline="true" class="demo-form-inline work">
            <el-form-item label="作答">
              <el-input
                placeholder="请填写你的答案"
                v-model="topic.work_answer"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(topic)"
                >提交</el-button
              >
            </el-form-item>
            <span v-if="topic.flag"
              >{{ topic.flag }} 正确答案：{{ topic.answer }}</span
            >
          </el-form>
        </el-collapse-item>
        <el-empty
          :image-size="20"
          v-if="!topics.data.results"
          description="暂无更多题目"
        ></el-empty>
      </el-collapse>
    </div>

    <!-- 分页 -->
    <div class="page" v-if="topics.data.count">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="topics.data.count"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import {
  Get_Topic_Data,
  Get_Search_Topic_Data

} from "@/api/index";
import { ElMessage } from "element-plus";
let activeNames = ref([0]);

const data = ref();

// 题目数据
const topics = ref({
  data: {
    count: 0,
    results: [
      {
        answer: "B",
        create_time: "2021-11-19T20:25:56.885565",
        description:
          "A、x = y = z = 1 \r<br/>B、x = (y = z + 1)\r<br/>C、x, y = y, x\r<br/>D、x  +=  y",
        id: 1,
        label: 1,
        label_name: "python基础",
        score: 1,
        subject: "下列哪个语句在Python中是非法的",
        type: 0,
        user: 1,
        user_name: "一个",
      },
    ],
  },
});


let select = ref("");

// 题目的类型
const TYPE_CHOICES = ["单选题", "多选题", "判断题", "填空题", "问答题"];

const pagesize = ref(10);

// 获取题目数据
const get_topic_data = async (val) => {
  try {
    const res = await Get_Topic_Data(val); //请求后端接口
    topics.value.data.count = res.count; //赋值数据的个数
    let results = [];
    // 对所有的数据添加一个回答的变量和回答之后的结果状态
    res.results.forEach((e, index) => {
      // 替换换行标签
      e.id = index + 1;
      e.description = e.description.replace(/\n/g, "<br/><br/>");
      e.work_answer = "";
      e.flag = null;
      results.push(e); //重新把数据添加到results
    });
    topics.value.data.results = results; //赋值
    data.value = results; //赋值
  } catch (error) {
    console.log(error);
  }
};
get_topic_data({ page: 1, size: pagesize.value });




// 获取用户输入的题目下标
const offset = ref(1);
const get_topics = (val) => {
  topics.value.data.results = data.value.slice(val - 1);
  if (topics.value.data.results == "") {
    ElMessage({
      message: "你已超出题目范围，请完成之前的题目！",
      type: "warning",
    });
  }
};


// 用户输入查询内容，然后发送请求后台，获取用户需要的数据

const   is_search =  ref(false)
const search_data = reactive({
  page:1,
  size:pagesize.value,
  subject:''
})


const SearchForm = async(data)=>{
  is_search.value = true
  try {
    const res = await Get_Search_Topic_Data(search_data)
    total.value = res.count
    tableData.value = res.results
  } catch (error) {
    console.log(error);
    
  }
}

//获取用户点击的页码,然后获取后端题目数据
const handleCurrentChange = async (val) => {
  
  if(is_search){
    search_data.page = val
    SearchForm(search_data)
  }else{
    get_topic_data({ page: val, size: pagesize.value });
  }
  };
  
// 获取用户输入的答案进行判断

const onSubmit = (topic) => {
    if (topic.answer == topic.work_answer) {
      ElMessage.success("回答正确！");
      topic.flag = "回答正确！";
    } else {
      ElMessage.error("回答错误！");
      topic.flag = "回答错误！";
    }
};
</script>

<style lang="less" scoped>
#box {
  position: absolute;
  left: 100px;
  .search {
    padding: 20px;
    margin-left: 11%;
    .el-input {
      width: 1200px;
    }
  }
  .start {
    margin-left: 12%;
    margin-bottom: 10px;
  }
  .subject {
    margin-left: 12%;
  }
  .el-collapse {
    width: 88%;
  }
  .page {
    margin-left: 50%;
    margin-top: 2%;
  }
}
</style>