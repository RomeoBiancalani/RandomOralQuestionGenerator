import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassesView from '../views/ClassesView.vue'
import DefaultLayout from '../layout/DefaultLayout.vue'
import localforage from 'localforage'

/*

Routes:
  Home (Default Layout -> HomeView)
  Classi (Default Layout -> ClassesView)

Meta:
  RequiresAuth -> Richiede il nome impostato per la pagina.

*/

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
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
    ],
    meta: {
      requiresAuth: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Controllo l'autenticazione controllando se globalName e' impostato
    localforage.getItem("globalName").then((value) => {
      if (value == null) {
        next({path: "/"});
      }
      else {
        next();
      }
    });
  
  }
  else {
    next();
  }
});

export default router
