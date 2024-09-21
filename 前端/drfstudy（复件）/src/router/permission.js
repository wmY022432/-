import router from './index'

router.beforeEach((to,from,next)=>{
    if(to.meta.isLogin){
        let userInfo = localStorage.getItem('userInfo')
        if(!userInfo){
                next('/login')
        }else{
            next()
        }
    }else{
        next()
    }
})