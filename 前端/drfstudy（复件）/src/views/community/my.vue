<template>
    <div class="community">
        <div class="func">
        <router-link to="/commouity_add">
            <el-button type="primary">
                <el-icon>
                    <Edit />
                </el-icon>去发表
            </el-button>
        </router-link>
    </div>



    <div class="content" v-for="article in articles" >
        <el-card class="box-card" @click="go_details(article.id)">
            <template #header>
                <div class="card-header">
                    <h3>{{ article.title }}</h3>
                     <el-tag class="ml-2" :type="article.status==3?'danger':'success'">{{ARTICLE_TYPES[article.status]}}</el-tag>
                    <p style="color: gray;font-size: 14px;">{{ article.create_time }}</p>
                </div>
            </template>
            <div class="article_info">
                <div class="user_info">
                    <el-avatar size="small" :src="article.user_avatar"></el-avatar>
                    <p class="username">{{ article.user_name }}</p>
                    <p class="digest">{{ article.digest }}</p>
                </div>
                <div>
                    <el-icon>
                        <pointer />
                    </el-icon>
                    <span class="digest">浏览量：{{ article.page_view }}</span>
                </div>
            </div>
        </el-card>
    </div>
    <el-empty :image-size="200" v-if="!articles" description="没有更多内容 "></el-empty>
    </div>

</template>

<script setup>

import { ref } from 'vue'
import {Get_User_Article_Data} from '@/api/index'
import { Edit } from '@element-plus/icons-vue'
import moment from 'moment'
let articles = ref(
    [
        {
            "id": 1,
            "user_name": "一个",
            "user_avatar": "http://127.0.0.1:8888/group1/M00/00/00/CgACD2GSbHaAam1fAAAoPzbaxt0990.jpg",
            "create_time": "2021-11-26T22:16:08.353356",
            "update_time": "2021-11-26T22:16:08.353382",
            "title": "django框架models优化",
            "digest": "拓展models模型类，自定义Mixin",
            "content": "### models优化\n````python\n# -*- coding: utf-8 -*-\n# @Time    : 2021/11/26 20:35\n# @Author  : YIGE\n# @Email   : yige@maqu.com\n# @File    : modelsMixin.py\n# @Software: PyCharm\nfrom django.db import models\n\n\nclass DateTimeModelsMixin(models.Model):\n    \"\"\"创建与修改时间拓展类\"\"\"\n    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)\n    update_time = models.DateTimeField(verbose_name='修改时间', auto_now=True)\n\n    class Meta:\n        abstract = True  # 定义该类为抽象模型类，迁移时不会创建对应的表，只是用于扩展，让其他模型类来继承\n\n\nclass IsDeleteModelsMixin(models.Model):\n    \"\"\"逻辑删除拓展类\"\"\"\n    is_delete = models.BooleanField(default=False, verbose_name='逻辑删除')\n\n    def delete(self, using=None, keep_parents=False):\n        self.is_delete = True\n        self.save()\n\n    class Meta:\n        abstract = True\n\n\nclass ModelsSetMixin(DateTimeModelsMixin, IsDeleteModelsMixin):\n    \"\"\"模型拓展整合类\"\"\"\n\n    class Meta:\n        abstract = True\n\n````",
            "page_view": 1000,
            "priority": 0,
            "status": 1,
            "label": 4,
            "user": 1
        },
        {
            "id": 2,
            "user_name": "一个",
            "user_avatar": "http://127.0.0.1:8888/group1/M00/00/00/CgACD2GSbHaAam1fAAAoPzbaxt0990.jpg",
            "create_time": "2022-11-26T22:16:08.353356",
            "update_time": "2022-11-26T22:16:08.353382",
            "title": "django框架models优化",
            "digest": "拓展models模型类，自定义Mixin",
            "content": "### models优化\n````python\n# -*- coding: utf-8 -*-\n# @Time    : 2021/11/26 20:35\n# @Author  : YIGE\n# @Email   : yige@maqu.com\n# @File    : modelsMixin.py\n# @Software: PyCharm\nfrom django.db import models\n\n\nclass DateTimeModelsMixin(models.Model):\n    \"\"\"创建与修改时间拓展类\"\"\"\n    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)\n    update_time = models.DateTimeField(verbose_name='修改时间', auto_now=True)\n\n    class Meta:\n        abstract = True  # 定义该类为抽象模型类，迁移时不会创建对应的表，只是用于扩展，让其他模型类来继承\n\n\nclass IsDeleteModelsMixin(models.Model):\n    \"\"\"逻辑删除拓展类\"\"\"\n    is_delete = models.BooleanField(default=False, verbose_name='逻辑删除')\n\n    def delete(self, using=None, keep_parents=False):\n        self.is_delete = True\n        self.save()\n\n    class Meta:\n        abstract = True\n\n\nclass ModelsSetMixin(DateTimeModelsMixin, IsDeleteModelsMixin):\n    \"\"\"模型拓展整合类\"\"\"\n\n    class Meta:\n        abstract = True\n\n````",
            "page_view": 1000,
            "priority": 0,
            "status": 1,
            "label": 4,
            "user": 1
        }
    ]
)
import {useRouter} from 'vue-router'
const router = useRouter()

const go_details = (id)=>{
    router.push(`/commouity/${id}`)
}

const ARTICLE_TYPES = ['草稿','待审核','发布成功','发布失败']

// 获取所有文章数据
const get_user_article_data =async ()=>{
    try {
        const res = await Get_User_Article_Data()
        res.forEach(element => {
         element.create_time = moment(element.create_time).format(
          "YYYY-MM-DD:HH:MM:SS"
        );
    });
        articles.value  =res
    } catch (error) {
        console.log(error);
    }
}
get_user_article_data()
</script>

<style lang="less" scoped>
.community{
    position: absolute;
    left: 250px;
}
.content{
    margin-left:40px ;
}
.func {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0px;
    margin-right: 50px;
}

.card-header {
    display: flex;
    justify-content: space-between;
}

.article_info {
    display: flex;
    justify-content: space-between;
}

.article_info .user_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.article_info .user_info .username {
    margin: 0px 20px;
}

.digest {
    color: gray;
    font-size: 14px;
    width: 1000px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.box-card {
    margin: 20px 0px;
}
</style>