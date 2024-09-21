import ajax from './ajax/ajax.js'
import ajaxs from './ajax/ajaxs.js'
import base from './nozzle/index.js'
import qs from 'qs'


export const Get_Code_Data = (parm)=>{
    return ajaxs.get('/api'+base.GetCodeData,{params:parm})
}


export const Post_Register_Data = (parm)=>{
    return ajaxs.post('/api'+base.RegisterData,parm)
}



export const Post_Login_Data = (parm)=>{
    return ajaxs.post('/api'+base.LoginData,parm)
}



export const Get_User_Activate_Account_Data = (parm)=>{
    return ajax.get('/api'+base.GetUserActivateAccountData,{params:parm})
}


export const Post_Classes_Data = (parm)=>{
    return ajax.post('/api'+base.PostClassesData,parm)
}

export const Get_Classes_Data = (parm)=>{
    return ajax.get('/api'+base.GetClassesData,{params:parm})
}


export const Put_Classes_Data = (parm)=>{
    return ajax.put('/api'+base.PutClassesData+`${parm.id}/`,parm)
}

export const Delet_Classes_Data = (id)=>{
    return ajax.delete('/api'+base.DeleteClassesData+`${id}/`)
}

export const Put_Activate_Accout_Data = (parm)=>{
    return ajax.put('/api'+base.PutActivateAccout,parm)
}

export const Get_Search_Classes_Data = (parm)=>{
        return ajax.get('/api'+base.GetSearchClassesData,{params:parm})
}




export const Post_Group_Data = (parm)=>{
    return ajax.post('/api'+base.PostGroupData,parm)
}

export const Get_Group_Data = (parm)=>{
    return ajax.get('/api'+base.GetGroupData,{params:parm})
}


export const Put_Group_Data = (parm)=>{
    return ajax.put('/api'+base.PutGroupData+`${parm.id}/`,parm)
}

export const Delete_Group_Data = (id)=>{
    return ajax.delete('/api'+base.DeleteGroupData+`${id}/`)
}


export const Get_Search_Group_Data = (parm)=>{
        return ajax.get('/api'+base.GetSearchGroupData,{params:parm})
}


// 封装搜索学生未激活账号的请求函数
export const  Get_Search_Data = (parm)=>{
    return ajax.get('/api'+base.GetSearchData,{params:parm})
}



// 封装激活学生账号的请求函数
export const Put_Activate_Account_Data = (parm)=>{
    return ajax.put('/api'+base.PutActivateAccout,parm)
}


// 封装获取所有老师的请求函数
export const Get_Teacher_Data = (parm)=>{
    return ajax.get('/api'+base.GetTeacherData,{params:parm})
}

// 封装添加老师信息的请求函数
export const Add_Teacher_Data = (parm)=>{
    return ajax.post('/api'+base.PostTeacherData,parm)
}

// 封装修改老师信息的请求函数
export const Update_Teacher_Data = (parm)=>{
    return ajax.put('/api'+base.PutTeacherData,parm)
}



// 封装搜索老师账号的请求函数
export const  Get_Search_Teacher_Data = (parm)=>{
    return ajax.get('/api'+base.GetSearchTeacherData,{params:parm})
}




// 封装获取所有学生的请求函数
export const Get_Student_Data = (parm)=>{
    return ajax.get('/api'+base.GetStudentData,{params:parm})
}



// 封装搜索学生账号的请求函数
export const  Get_Search_Student_Data = (parm)=>{
    return ajax.get('/api'+base.GetSearchStudentData,{params:parm})
}



// 封装对用户账号进行封号处理的请求函数
export const Blacklist = (parm)=>{
    return ajax.get('/api'+base.Blacklist,{params:parm})
}


export const  Get_User_Account_Data = (id)=>{
    return ajax.get('/api'+base.GetUserAccountData+`${id}/`)
}


export const Put_User_Account_Data = (parm)=>{
    return ajax.put('/api'+base.PutUserAccountData,parm)
}

// 封装修改用户详情信息的请求函数
export const Update_User_Detail_Data = (parm)=>{
    return ajax.put('/api'+base.UpdateUserDetailData,parm)
}


// 封装添加题目标签类型的接口
export const Post_Question_Label_Data = (parm)=>{
    return ajax.post('/api'+base.PostQuestionLabelData,parm)
}



// 封装获取题目标签类型的接口
export const Get_Question_Label_Data = ()=>{
    return ajax.get('/api'+base.GetQuestionLabelData)
}


// 封装修改题目标签类型的接口
export const Update_Question_Label_Data = (parm)=>{
    return ajax.put('/api'+base.UpdateQuestionLabelData+`${parm.id}/`,parm)
}

// 封装修改题目标签类型的接口
export const Delete_Question_Label_Data = (id)=>{
    return ajax.delete('/api'+base.DeleteQuestionLabelData+`${id}/`)
}



// 封装获取用户搜索的标签名称而获取到的标签名的请求函数
export const Get_Search_Question_Label_Data = (parm)=>{
    return ajax.get('/api'+base.GetSearchQuestionLabelData,{params:parm})
}


// 封装获取题目数据的请求函数
export const Get_Topic_Data = (parm)=>{
    return ajax.get('/api'+base.GetTopicData,{params:parm})
}




// 封装添加题目数据的请求函数
export const Post_Topic_Data = (parm)=>{
    return ajax.post('/api'+base.PostTopicData,parm)
}




// 封装修改题目数据的请求函数
export const Put_Topic_Data = (parm)=>{
    return ajax.put('/api'+base.PutTopicData+`${parm.id}/`,parm)
}



// 封装删除题目数据的请求函数
export const Delete_Topic_Data = (id)=>{
    return ajax.delete('/api'+base.DeleteTopicData+`${id}/`)
}



// 封装通过关键字搜索题目的接口的请求函数
export const Get_Search_Topic_Data = (parm)=>{
    return ajax.get('/api'+base.GetSearchTopicData,{params:parm})
}


// 封装获已发布文章的请求函数
export const Get_Articles_Data = (parm)=>{
    return ajax.get('/api'+base.GetArticlesData,{params:parm})
}


// 封装获单个已发布文章的请求函数
export const Get_Article_Data = (id)=>{
    return ajax.get('/api'+base.GetArticleData+`${id}/`)
}


// 封装获取用户的文章的请求函数
export const Get_User_Article_Data = ()=>{
    return ajax.get('/api'+base.GetUserArticleData)
}


// 封装获取用户的文章的请求函数
export const Post_Article_Data = (parm)=>{
    return ajax.post('/api'+base.PostArticleData,parm)
}


// 封装获取未发布的文章的请求函数
export const Get_Unreleased_Article_Data = (parm)=>{
    return ajax.get('/api'+base.GetUnreleasedArticleData,{params:parm})
}




// 封装获取未发布的文章的请求函数
export const Put_Article_Status_Data = (parm)=>{
    return ajax.put('/api'+base.PutArticleStatusData,parm)
}



export const Write_Commnet_Data = (parm)=>{
    return ajax.post('/api'+base.WriteCommnetData,parm)
}





export const Get_Commnet_Data = (id)=>{
    return ajax.get('/api'+`/communtiy/article/${id}/comment/`)
}




// 封装获取省级地址的请求函数
export const Get_areas_data = ()=>{
    return ajax.get('/api'+base.GetArea)
}

// 封装获取城市地址的请求函数
export const Get_citys_data = (val)=>{
    return ajax.get('/api'+base.GetArea+`${val}/`)
}

// 封装获取区或者县级地址的请求函数
export const Get_districts_data = (val)=>{
    return ajax.get('/api'+base.GetArea+`${val}/`)
}
// 封装获取用户收货地址的请求函数
export const Get_address_data = ()=>{
    return ajax.get('/api'+base.GetAddress)
}

// 封装向后端发送用户新增的收货地址的请求函数
export const Post_address_data = (parm)=>{
    return ajax.post('/api'+base.PostAddress,qs.stringify(parm))
}



// 封装获取所有商品分类的请求函数
export const Get_CommodityTypes_Data = ()=>{
    return ajax.get('/api'+base.GetCommodityTypeData)
}
// 封装获取单个商品分类的请求函数
export const Get_CommodityType_Data = (id)=>{
    return ajax.get('/api'+base.GetCommodityTypeData+`${id}/`)
}




// 封装添加商品的请求函数
export const Post_Commodity_Data = (parm)=>{
    return ajax.post('/api'+base.PostCommodityData,parm)
}

// 封装获取商品的请求函数
export const Get_Commodity_Data = (parm)=>{
    return ajax.get('/api'+base.GetCommodityData,{params:parm})
}

// 封装获取商品的请求函数
export const Put_Commodity_Data = (id,parm)=>{
    return ajax.put('/api'+base.PutCommodityData+`${id}/`,parm)
}


export const Delete_Commodity_Data = (id)=>{
    return ajax.delete('/api'+base.DeleteCommodityData+`${id}/`)
}



export const Get_Search_Commodity_Data = (parm)=>{
    return ajax.get('/api'+base.GetSearchCommodityData,{params:parm})
}



export const Get_Type_Commodity_Data = (parm)=>{
    return ajax.get('/api'+base.GetTypeCommodityData,{params:parm})
}



// 封装获取商品数据的详情的请求函数
export const  Get_Commoditydetail_Data = (id)=>{
    return ajax.get('/api'+base.GetCommodityData+`${id}/`)
}




// 封装把商品数据添加至购物车的请求函数
export const  Post_Cart_Data = (parm)=>{
    return ajax.post('/api'+base.PostCartData,parm)
}


// 封装获取购物车商品数据的请求函数
export const  Get_Cart_Data = ()=>{
    return ajax.get('/api'+base.GetCartData)
}





// 封装修改购物车中某个商品数量的请求函数
export const  Put_Cart_Num_Data = (parm)=>{
    return ajax.put('/api'+base.PutCartNumData,parm)
}

// 封装修改购物车中某个商品数量的请求函数
export const  Delete_Cart_Data = (id)=>{
    return ajax.delete('/api'+base.DeleteCartData+`${id}/`)
}



// 封装获取购物车被选择下单的商品数据的请求函数
export const Get_check_cartdata =(parm)=>{
    return ajax.get('/api'+base.GetCheckCart,{params:parm},)
}