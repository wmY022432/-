// 1.配置base url 超时时间 
//2.请求拦截
//3.响应拦截
//4配置进度条 
//显示 隐藏
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const  service = axios.create({
    baseURL:'',
    timeout:5000
})

//请求拦截
service.interceptors.request.use(config=>{
    //开启进度条
    NProgress.start();
// 请求时，携带token
    config.headers['Authorization'] = 'JWT '+JSON.parse(localStorage.getItem('userInfo'))['user']['userInfo']['token']
    return config;

})
// 响应拦截
service.interceptors.response.use(res=>{
    //关闭进度条
    NProgress.done();
    return res.data;    
},err=>{
     //关闭进度条
   NProgress.done();


















   return Promise.reject(err)
   
})

export default service