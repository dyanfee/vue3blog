import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home'
import Layout from '@/layout'

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
      }, {
        path: 'archives',
        name: 'Archives',
        component: () => import('views/archives/Archives'),
      },
    ]
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/Register')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
