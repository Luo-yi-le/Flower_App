import Vue from 'vue'
import Router from 'vue-router'

const Page = r => require.ensure([], () => r(require('@/pages/page/page.vue')), 'page')
const Home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'home')
const LoginLoginId = r => require.ensure([], () => r(require('@/pages/login/LgoinLoginId.vue')), 'loginLoginId')
const LoginPhone = r => require.ensure([], () => r(require('@/pages/login/PhoneLogin.vue')), 'loginPhone')
const User = r => require.ensure([], () => r(require('@/pages/user/user.vue')), 'user')
const About = r => require.ensure([], () => r(require('@/pages/about/about.vue')), 'about')
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
          title: '百花轩'
        },
        component: Home
      }
      ,{
        path: 'user',
        name: 'user',
        meta: {
          title: '我的'
          // requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: User
      }
      ,{
        path: 'about',
        name: 'about',
        meta: {
          title: '关于'
        },
        component: About
      }
      ,
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
 export default router

