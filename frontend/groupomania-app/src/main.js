import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "./index.css"
import store from "./store"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faTrashAlt,
  faEdit,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

Vue.config.productionTip = false

library.add(faTrashAlt, faEdit, faChevronDown, faChevronUp)

Vue.component("font-awesome-icon", FontAwesomeIcon)

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
