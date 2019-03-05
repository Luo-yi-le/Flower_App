import Vue from 'vue'
import Router from 'vue-router'
import storeIndex from '../store/index.js'

const Page = r => require.ensure([], () => r(require('@/pages/page/page.vue')), 'page')
const Home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'home')
const LoginLoginId = r => require.ensure([], () => r(require('@/pages/login/LgoinLoginId.vue')), 'loginLoginId')
const LoginPhone = r => require.ensure([], () => r(require('@/pages/login/PhoneLogin.vue')), 'loginPhone')
const User = r => require.ensure([], () => r(require('@/pages/user/user.vue')), 'user')
const SetUp = r => require.ensure([], () => r(require('@/pages/user/setUp.vue')), 'setUp')
const UserInfo = r => require.ensure([], () => r(require('@/pages/user/userInfo.vue')), 'userInfo')
const My = r => require.ensure([], () => r(require('@/pages/user/my.vue')), 'my')
const MyCollection = r => require.ensure([], () => r(require('@/pages/user/myCollection.vue')), 'myCollection')
const About = r => require.ensure([], () => r(require('@/pages/about/about.vue')), 'about')
const addAddress = r => require.ensure([], () => r(require('@/pages/address/addAddress.vue')), 'addAddress')
const Address = r => require.ensure([], () => r(require('@/pages/address/address.vue')), 'address')
const Detail = r => require.ensure([], () => r(require('@/pages/detail/detail.vue')), 'detail')
const Category = r => require.ensure([], () => r(require('@/pages/category/category.vue')), 'category')
const Cart = r => require.ensure([], () => r(require('@/pages/cart/cart.vue')), 'cart')
const Order = r => require.ensure([], () => r(require('@/pages/order/order.vue')), 'order')
const Map = r => require.ensure([], () => r(require('@/pages/order/Map.vue')), 'map')
const ProductAll = r => require.ensure([], () => r(require('@/pages/about/Products.vue')), 'products')
Vue.use(Router)

// export default new Router({
  const routes = [
  {
    path: '/',
    redirect: '/page'
  }
  , {
    path: '/page',
    component:Page,
    children:[
      {
        path:'',
        redirect: '/page/home'
      }
      ,{
        path: 'home',
        name: 'home',
        meta: {
          title: '百花轩',
        },
        component: Home
      }
      ,{
        path: 'user',
        name: 'user',
        meta: {
          title: '我的',
           requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: User
      }
      ,{
        path: 'my',
        name: 'my',
        meta: {
          title: '我的',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: My
      },
      ,{
        path: 'myCollection',
        name: 'myCollection',
        meta: {
          title: '我的收藏',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MyCollection
      }
      ,{
        path: 'userInfo',
        name: 'userInfo',
        meta: {
          title: '我的信息',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: UserInfo
      }
      ,{
        path: 'setUp',
        name: 'setUp',
        meta: {
          title: '我的账户',
           requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SetUp
      }
      ,{
        path: 'about',
        name: 'about',
        meta: {
          title: '关于'
        },
        component: About
      }
      ,{
        path: 'products',
        name: 'products',
        meta: {
          title: '全部商品'
        },
        component: ProductAll
      }
      ,{
        path: 'address',
        name: 'address',
        meta: {
          title: '我的地址',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Address
      }
      ,{
        path: 'addAddress',
        name: 'addAddress',
        meta: {
          title: '地址',
           requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: addAddress
      }
      ,{
        path: 'detail',
        name: 'detail',
        meta: {
          title: '详细',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Detail
      },
      ,{
        path: 'category',
        name: 'category',
        meta: {
          title: '分类'
        },
        component: Category
      }
      ,{
        path: 'cart',
        name: 'cart',
        meta: {
          title: '购物车',
         requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Cart
      }
      ,{
        path: 'order',
        name: 'order',
        meta: {
          title: '订单信息',
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Order
      },
      {
        path: 'map',
        name: 'map',
        meta: {
          title: '地图',
         // requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Map
      },
    ]
  }
  , {
      path: '/loginLoginId',
      name: 'loginLoginId',
      component: LoginLoginId,
      meta: {
        title: '账号登录'
      }
    },
    , {
      path: '/loginPhone',
      name: 'loginPhone',
      component: LoginPhone,
      meta: {
        title: '手机登录'
      }
    },

    { path: '*', component: Home }
  ]
// })
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = to.meta.title
  storeIndex.commit('UPDATE_TITLE',to.meta.title)
  // loading
  storeIndex.commit('UPDATE_LOADING', true)
  if (to.matched.some(r => r.meta.requireAuth)) {
    let token = window.sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/loginLoginId',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
// router.beforeResolve((to, from, next) => {
//   next(()=>{
//     window.location.reload()
//   })
// })
router.afterEach(function(to,from) {
  setTimeout(() => {
    storeIndex.commit('UPDATE_LOADING', false)
  }, 300)
})
 export default router

