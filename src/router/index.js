import Vue from "vue"
import VueRouter from "vue-router"

// 注册router组件
Vue.use(VueRouter)

// 懒加载动态路由
const Category = ()=> import( "views/category/Category")
const Home = ()=> import( "views/home/Home")
const Profile = ()=> import( "views/profile/Profile")
const Shopcart = ()=> import( "views/shopcart/Shopcart")

const routes = [
  // 配置默认重定向
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: 'Category'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      titel: 'Profile'
    }
  },
  {
    path: '/shopcart',
    component: Shopcart,
    meta: {
      title: 'Shopcart'
    }
  }
]
// 实例化router对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 配置路由跳转时候切换标题的导航守卫
router.beforeEach((to, form, next) => {
  document.title = to.matched[0].meta.title
  next()
})

// 导出对象
export default router
