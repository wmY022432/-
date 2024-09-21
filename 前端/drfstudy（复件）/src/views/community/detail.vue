<template>
    <div class="detail">
        <div class="info">
            <h2>{{ article.title }}</h2>
            <h3>{{ article.digest }}</h3>
        </div>
        <el-divider content-position="left">正文</el-divider>

        <div class="content">
            <v-md-preview :text="article.content"></v-md-preview>
        </div>


        <div class="button">
            <el-button type="primary" @click="write(article.id)">写评论</el-button>
        </div>


        <el-divider content-position="left">评论</el-divider>

        <div class="demo-collapse">

            <ul class="comment-box">
                <li class="comment-item" v-for="item in comment" :key="item.id">
                    <div class="comment-item-top">
                        <div class="user">
                            <el-avatar :src="item.user_avatar?user_avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
                            <p class="username">{{ item.user_name }}</p>
                        </div>
                        <div class="time">
                                    {{ item.create_time }}
                        </div>
                    </div>
                    <div class="comment-item-content">
                        <div class="father_comment" v-if="item.fatherComment[0]">
                         
                            <div class="comment">{{ item.fatherComment[0].content}}</div>
                        </div>
                        <div class="son_comment">{{ item.content }}</div>
                    </div>
                    <div class="comment-item-tail">
                            <el-button type="primary" @click="add(item.id)">添加评论</el-button>
                    </div>
                </li>
            </ul>

        </div>
    </div>

</template>

<script setup>
import { reactive ,ref} from 'vue'
import {Get_Article_Data,Write_Commnet_Data,Get_Commnet_Data} from '@/api/index'
import {ElMessageBox,ElMessage} from 'element-plus'
import moment from 'moment'
let article = ref(

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
        "user": 1,
       
    },

)
let comment = ref()


// 获取文章内容
import {useRouter} from 'vue-router' 
const router = useRouter()
const get_article_data = async()=>{
    try {
        const res  = await Get_Article_Data(router.currentRoute.value.params.id)
        article.value = res
    } catch (error) {
        console.log(error);
    }
}

get_article_data()

const write = (id) =>{

    ElMessageBox.prompt('请输入你的评论内容', '添加评论', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',

  })
    .then(async({ value }) => {
            let data = {
                content:value,
                article:id
            }
            try {
                const res = await Write_Commnet_Data(data)
                get_comment_data()
                ElMessage.success(res.msg)
            } catch (error) {
                console.log(error);
                ElMessage.error('评论失败')
            }
    })

}




// 获取评论信息
const get_comment_data  = async()=>{
    try {
        const res = await Get_Commnet_Data(router.currentRoute.value.params.id)
        res.forEach(element => {
         element.create_time = moment(element.create_time).format(
          "YYYY-MM-DD:HH:MM:SS"
        );
        
        
    });
    
        comment.value = res
    } catch (error) {
            console.log(error);
    }
}
get_comment_data()



// 追加评论
const add = (id)=>{
    ElMessageBox.prompt('请输入你的评论内容', '添加评论', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',

  })
    .then(async({ value }) => {
            let data = {
                content:value,
                parent_comment:id,
                article:router.currentRoute.value.params.id
            }
            try {
                const res = await Write_Commnet_Data(data)
               if(res.status==201){
                    ElMessage.success(res.msg)
                    get_comment_data()
               }
            } catch (error) {
                console.log(error);
                ElMessage.error('评论失败')
            }
    })

}
</script>

<style lang="less" scoped>
.detail {
    width: 80%;
    .info{
        h2,h3{
            padding: 15px;
            font-weight: 700;
        }
        h2{
            font-size: 30px;
            
        }
        h3{
            font-size: 20px;
        }
    }
    .el-divider{
        margin-left: 1.5%;
    }
    .comment{
        display: flex;
        align-content: center;
    }

    .button{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .el-button{
            margin-right: 50px;
        }
    }

    .demo-collapse{
            margin-left: 40px;
    .comment-box{
  
        .comment-item{
            width: 1000px;
            margin-top: 20px;
            box-shadow: 0 2px 8px rgba( 0,0,0, 0.08),0 1px 2px rgba(0,0,0, 0.1);
            border-radius: 8px;
            .comment-item-top{
                display: flex;
                justify-content: space-between;
                .user{
                    display: flex;
                    margin-left: 20px;
                    .el-avatar{
                        width: 30px;
                        height: 30px;
                    }
                    .username{
                        margin: 8px;
                    }
                }
                .time{
                    margin: 8px;
                }

            }
            .comment-item-content{
                margin-left: 50px;
                .father_comment{
                
                    padding: 5px;
                    width: 300px;
                    background: #f7f7f7;
                    border-radius:5px ;
                    display: flex;
           
                    .comment{
                        font-size: 13px;

                    }
                    
                }
                .son_comment{
                       margin-top: 10px; 
                    }
            }

            .comment-item-tail{
                margin-top: 10px;
                margin-left: 20px;
                border-top: 1px solid #f7f4f4;
                display: flex;
                justify-content: flex-end;
                .el-button{
                    margin:10px;
                }
            }
        }
    }
    }

}
</style>


