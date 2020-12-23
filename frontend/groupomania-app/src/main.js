import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "./index.css"
import store from "./store"

Vue.config.productionTip = false

let user = localStorage.getItem("user")
if (user) {
  user = JSON.parse(user)
  store.commit("setUser", user)
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
