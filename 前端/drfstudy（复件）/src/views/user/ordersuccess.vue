<template>
</template>

<script setup>
   
// 验证用户是否支付成功，支付成功，则把商品数据发送给后端，进行数据存储
import {useStore} from 'vuex'

import {ElMessage} from 'element-plus'
const store = useStore()



// 把商品数据发给后端
import {useRouter} from 'vue-router'
const  router = useRouter()

</script>

<style lang="less" scoped>

</style>