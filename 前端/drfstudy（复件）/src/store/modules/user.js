export default{
    namespaced:true,
    state:()=>{
        return{
            userInfo:{
                token:'',
                username:'',
                user_id:'',
                avatar:'',
                status:''
            }
        }
    },
    mutations:{
        update_userdata(state,payload){
            state.userInfo.token = payload.token
            state.userInfo.username = payload.first_name
            state.userInfo.user_id = payload.user_id
            state.userInfo.avatar = payload.avatar
            state.userInfo.status = payload.status
        },
        
        delete_userdata(state){
             state.userInfo = {
                token:'',
                username:'',
                user_id:'',
                avatar:'',
             }
        },
        update_user_avatar(state,payload){
            console.log(payload);
            state.userInfo.avatar = payload
        }
    }
}