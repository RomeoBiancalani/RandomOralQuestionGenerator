import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassesView from '../views/ClassesView.vue'
import DefaultLayout from '../layout/DefaultLayout.vue'

/*

Routes:
  Home (Default Layout -> HomeView)

*/

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    children: [
      {
        path: '', component: HomeView
      }
    ]
  },
  {
    path: '/classi',
    name: 'Classes',
    component: DefaultLayout,
    children: [
      {
        path: '', component: ClassesView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
