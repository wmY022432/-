const base = {
    GetCodeData:'/user/getcode',//获取短信验证码的接口
    RegisterData:'/user/register',//获取短信验证码的接口
    LoginData:'/user/login',//获取短信验证码的接口
    GetUserActivateAccountData:'/user/activate_account/',//获取未激活的学生账号信息的接口
    PostClassesData:'/user/classes/',//获取添加班级信息的接口
    GetClassesData:'/user/classes/',//获取班级信息的接口
    PutClassesData:'/user/classes/',//获取修改班级信息的接口
    DeleteClassesData:'/user/classes/',//获取删除班级信息的接口
    PutActivateAccout:'/user/activate_account/activate/',//获取激活用户账号信息的接口
    GetSearchClassesData:'/user/classes/search_name/',//获取用户搜索的班级名称而获取到的班级名称的接口
    PostGroupData:'/user/group/',//获取添加组信息的接口
    GetGroupData:'/user/group/',//获取组信息的接口
    PutGroupData:'/user/group/',//获取修改组信息的接口
    DeleteGroupData:'/user/group/',//获取删除组信息的接口
    GetSearchGroupData:'/user/group/search_name/',//获取用户搜索的组名称而获取到的班级名称的接口
    GetSearchData:'/user/activate_account/search/',
    GetTeacherData:'/user/user/teacher/',//获取所有老师的数据的接口
    PostTeacherData:'/user/user/add_teacher/',//获取添加老师信息的接口
    PutTeacherData:'/user/user/update_teacher/',//获取修改老师信息的接口
    GetSearchTeacherData:'/user/user/search_teacher/',//获取搜索老师账号的接口
    GetStudentData:'/user/user/student/',//获取所有学生的数据的接口
    GetSearchStudentData:'/user/user/search_student/',//获取搜索学生账号的接口
    Blacklist:"/user/user/blacklist/",//获取封号的接口
    GetUserAccountData:'/user/user/',//获取用户账号信息的接口，
    PutUserAccountData:'/user/user/user_account/',//获取修改用户账号信息的接口
    UpdateUserDetailData:'/user/user/user_detail/',//获取修改用户详情信息的接口


    PostQuestionLabelData:"/question/label/",//获取添加题目标签类型的接口
    GetQuestionLabelData:"/question/label/",//获取题目标签类型的接口
    UpdateQuestionLabelData:"/question/label/",//获取修改题目标签类型的接口
    DeleteQuestionLabelData:"/question/label/",//获取删除题目标签类型的接口
    GetSearchQuestionLabelData:"/question/label/search_name/",//获取用户搜索的标签名称而获取到的标签名的接口


    GetTopicData:'/question/topic/',//获取题目数据的接口
    PostTopicData:'/question/topic/',//获取添加目数据的接口
    PutTopicData:'/question/topic/',//获取修改目数据的接口
    DeleteTopicData:'/question/topic/',//获取删除目数据的接口
    GetSearchTopicData:'/question/topic/search/',//获取通过关键字搜索题目的接口




    GetArticlesData:'/communtiy/article/',//获取已发布的文章数据的接口
    GetArticleData:'/communtiy/article/',//获取单个已发布的文章数据的接口
    GetUserArticleData:'/communtiy/article/my/',//获取用户自己发布的文章的接口
    PostArticleData:"/communtiy/article/",//获取发布文章数据的接口
    GetUnreleasedArticleData:'/communtiy/article/status/',//获取未发布的文章数据
    PutArticleStatusData:"/communtiy/article/article_status/",//获取修改文章状态的接口

    WriteCommnetData:"/communtiy/commnet/",//获取写文章评论的接口

    GetCommnetData:'/communtiy/article/2/comment/',//获取文章评论的接口
    
    GetArea:'/user/area/',//获取城市地址的接口
    GetAddress:'/user/address/',//获取用户收货地址的接口
    PostAddress:'/user/address/',//添加用户收货地址的接口



    GetCommodityTypeData:'/shopping/commoditytype/',//获取商品分类的接口

    PostCommodityData:'/shopping/commoditys/',//获取添加商品数据的接口
    GetCommodityData:'/shopping/commoditys/',//获取商品数据的接口
    PutCommodityData:'/shopping/commoditys/',//获取修改商品数据的接口
    DeleteCommodityData:'/shopping/commoditys/',//获商品数据的接口
    GetSearchCommodityData:'/shopping/commoditys/search/',//获取通过关键字搜索的商品接口
    GetTypeCommodityData:'/shopping/commoditys/get_commodity_data/',//获取某个分类的商品数据的接口

    PostCartData:'/user/cart/',//获取添加商品至购物车的数据的接口
    GetCartData:'/user/cart/',//获取购物车商品数据的接口
    PutCartNumData:'/user/cart/update_cart_num/',//获取修改购物车中某个商品数量的接口

    DeleteCartData:'/user/cart/',//获取删除购物车中某个商品数量的接口

    GetCheckCart:'/user/cart/get_check_cartdata/',//获取被选择的购物车商品数据的接口
}



export default base