export default{
    namespaced:true,
    state:()=>{
        return{
            orderdata:{
                good:[],
                address:'',
                good_num:0,
                user:''
            }
        }
    },
    mutations:{
        update_orderdata(state,payload){
           state.orderdata.good = payload.good
           state.orderdata.address = payload.address
           state.orderdata.good_num = payload.good_num
           state.orderdata.user = payload.user
        },
        delete_orderdata(state){
            state.orderdata = {}
        }

    }
}