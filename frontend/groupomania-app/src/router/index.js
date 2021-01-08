import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      noLogin: true,
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    meta: {
      noLogin: true,
    },
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/MyAccount.vue"),
  },
  {
    path: "/new",
    name: "NewPost",
    component: () => import("../views/NewPost.vue"),
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import("../views/OnePost.vue"),
  },
  {
    path: "/post/:id/modify",
    name: "ModifyPost",
    component: () => import("../views/ModifyPost.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

// Renvoie sur la page de connexion si l'utilisateur n'est pas dans le store ( -> n'est pas ou plus connecté)
router.beforeResolve(async (to, from, next) => {
  if (!to.meta.noLogin) {
    if (!Store.state.user) {
      return next({
        path: "/login",
      })
    }
  }
  return next()
})

export default router
