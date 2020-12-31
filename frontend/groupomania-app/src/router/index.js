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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
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
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

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
