import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home'
import Layout from '@/layout'
import Admin from '@/layout/admin'

const constantRoutes = [
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
        path: 'archives',
        name: 'Archives',
        component: () => import('views/archives/Archives'),
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('views/detail/Detail'),
      }
    ]
  },
  {
    path: '/tags',
    name: 'Tags',

    component: () => import('views/tags/Tags'),
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/Register')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
