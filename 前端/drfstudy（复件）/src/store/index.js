import {createStore} from 'vuex'
import modules from './modules/index.js'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
    plugins:[
        createPersistedstate({
            key:'userInfo',
            paths:['user']
        }),
           createPersistedstate({
            key:'orderdata',
            paths:['order']
        })
    ],
  
    
    modules
})
