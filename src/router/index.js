import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import Admin from '@/layout/admin'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('views/home/Home'),
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ 'views/about/About.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('views/category/Category'),
      },
      {
        path: 'cateTagDetail',
        name: 'CateTagDetail',
        component: () => import('views/category/CateTagDetail'),
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('views/tags/Tags'),
      },
      {
        path: 'archives',
        name: 'Archives',
        component: () => import('views/archives/Archives'),
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('views/detail/Detail'),
        // component: () => import('views/detail/Temp'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/Register')
  },
]

/**  
 * 后台界面动态路由
 */
export const asyncRoutes = [{
  path: '/admin',
  name: 'Admin',
  component: Admin,
  redirect: '/admin/articles',
  meta: {
    title: "文章管理", icon: 'el-icon-menu'
  },
  children: [
    {
      path: "/admin/articles",
      name: 'ArticleManager',
      component: () => import('views/admin/Articles'),
      meta: { title: '文章列表', roles: ['0'], }
    },
    {
      path: "/admin/edit",
      name: 'EditArticle',
      component: () => import('views/admin/EditArticle'),
      meta: { title: '编辑新建文章', roles: ['0'], }
    },
  ]
},
{
  path: '/user',
  name: 'User',
  component: Admin,
  redirect: '/user/index',
  meta: {
    title: "个人中心", icon: 'el-icon-s-custom'
  },
  children: [
    {
      path: "/user/index",
      name: 'EditInfo',
      component: () => import('views/admin/EditInfo'),
      meta: { title: '编辑博客信息', roles: ['0'], }
    },
    {
      path: "/user/EditUser",
      name: 'EditUser',
      component: () => import('views/admin/EditUser'),
      meta: { title: '编辑个人信息', roles: ['0'], }
    },
  ]
}
]
const params = {
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
}

const router = createRouter(params)

export function resetRouter() {
  const newRouter = createRouter(params)
  router.matcher = newRouter.matcher // reset router
}


export default router
