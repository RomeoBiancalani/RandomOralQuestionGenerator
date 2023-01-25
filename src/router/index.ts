import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HelpView from "../views/HelpView.vue";
import SecurityView from "../views/SecurityView.vue";
import ClassesView from "../views/ClassesView.vue";
import SettingsView from "../views/SettingsView.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import SingleclassView from "../views/SingleclassView.vue";
import localforage from "localforage";

/*

Routes:
  Home (Default Layout -> HomeView)
  Classi (Default Layout -> ClassesView)

Meta:
  RequiresAuth -> Richiede il nome impostato per la pagina.

*/

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: ClassesView,
      },
    ],
  },
  {
    path: "/classi/:className",
    name: "SingleClass",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: SingleclassView
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/help",
    name: "Help",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: HelpView,
      },
    ],
  },
  {
    path: "/security",
    name: "Security",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: SecurityView,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: SettingsView,
      },
    ],
    meta: {
      requiresAuth: true
    }
  },

  // {
  //   path: "/singleclass",
  //   name: "SingleClassV",
  //   component: DefaultLayout,
  //   children: [
  //     {
  //       path: "",
  //       component: SingleclassView,
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Controllo l'autenticazione controllando se globalName e' impostato
    localforage.getItem("globalName").then((value) => {
      if (value == null) {
        next({ path: "/" });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
