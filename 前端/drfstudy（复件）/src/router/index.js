import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


const Login = () => import('@/views/Login/login.vue')
const Register = ()=>import('@/views/Register/register.vue')

const Home = () => import('@/views/Home/Home.vue')


// 管理者and老师
const  ActivateAccount = ()=>import("@/views/UserManage/activate_account.vue")

// 管理者
const TeacherList = ()=>import("@/views/UserManage/teacher_list.vue")
const StudentLIst = ()=>import('@/views/UserManage/student_list.vue')
const GroupList = ()=>import('@/views/UserManage/group_list.vue')
const ClassesList = ()=>import("@/views/UserManage/classes_list.vue")

//用户信息
const User = () => import('@/views/user/user.vue')
const UserAccount = ()=>import("@/views/user/user_account.vue")
const UserDetail = ()=>import('@/views/user/user_detail.vue')



// 题目
const Exercise = () => import('@/views/work/exercise.vue')
const ExerciseList = () => import('@/views/work/exercise_list.vue')
const ExerciseLabel = () => import('@/views/work/exercise_label.vue')


//文章
const Commouity = () => import('@/views/community/community.vue')
const MyCommouity = () => import('@/views/community/my.vue')
const Commouity_add = () => import('@/views/community/add.vue')
const Commouity_detail = () => import('@/views/community/detail.vue')
const Process_Article = ()=>import("@/views/community/article.vue")
const Shopping = () => import('@/views/shopping/list.vue')
const Address = () => import('@/views/user/address.vue')
const Cart = () => import('@/views/user/cart.vue')
const Order = () => import('@/views/user/order.vue')
const Pay_cart = () => import('@/views/user/cart_to_order.vue')


const Goods = () => import('@/views/UserManage/goods.vue')
const Add_good = () => import('@/views/UserManage/add_good.vue')



const Shopping_Info = ()=>import('@/views/shopping/commodity_info.vue')
 
const Order_success = ()=>import('@/views/user/ordersuccess.vue')

const routes = [
  {
    path: '/',
    component: Login,

  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
    
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/actiate_account',
        name: 'actiateaccount',
        component: ActivateAccount,
        meta: {
          isLogin: true
        }
      },

      {
        path: '/teacher_list',
        name: 'teacherlist',
        component: TeacherList,
        meta: {
          isLogin: true
        }
      },

      {
        path: '/student_list',
        name: 'studentlist',
        component: StudentLIst,
        meta: {
          isLogin: true
        }
      },

      {
        path: '/group_list',
        name: 'grouplist',
        component: GroupList,
        meta: {
          isLogin: true
        }
      },

      {
        path: '/classes_list',
        name: 'classeslist',
        component: ClassesList,
        meta: {
          isLogin: true
        }
      },


      {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
          isLogin: true
        },
        children:[
          {
            path: '/user_account',
            name: 'useraccount',
            component: UserAccount,
            meta: {
              isLogin: true
            },

          },
          {
            path: '/user_detail',
            name: 'userdetail',
            component: UserDetail,
            meta: {
              isLogin: true
            },

          },
        ]
      },


      {
        path: '/exercise',
        name: 'exercise',
        component: Exercise,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/exercise_list',
        name: 'exerciselist',
        component: ExerciseList,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/exercise_label',
        name: 'exerciselabel',
        component: ExerciseLabel,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/commouity',
        name: 'commouity',
        component: Commouity,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/mycommouity',
        name: 'mycommouity',
        component: MyCommouity,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/commouity_add',
        name: 'commouity_add',
        component: Commouity_add,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/commouity/:id',
        name: 'commouity_detail',
        component: Commouity_detail,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/process_article',
        name: 'processarticle',
        component: Process_Article,
        meta: {
          isLogin: true
        }
      },

     


      {
        path: '/user/shopping',
        name: 'shopping_list',
        component: Shopping,
        meta: {
          isLogin: true
        }
      },
      {
        path:'/user/shopping/detail/:id',
        name:'shopping_detail',
        component:Shopping_Info,
        meta:{
          isLogin: true
        }

      },
      {
        path: '/user/address',
        name: 'address',
        component: Address,
        meta: {
          isLogin: true
        }

      },
      {
        path: '/user/cart',
        name: 'cart',
        component: Cart,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/user/order',
        name: 'order',
        component: Order,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/user/pay_cart',
        name: 'pay_cart',
        component: Pay_cart,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/user/good',
        name: 'goods',
        component: Goods,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/user/add_good',
        name: 'add_good',
        component: Add_good,
        meta: {
          isLogin: true
        }
      },

      
      {
        path: '/user/ordersuccess',
        name: 'ordersuccess',
        component: Order_success,
    
      },
    ],
    
  },     
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
