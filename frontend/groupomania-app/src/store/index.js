import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isMenuOpen: false,
  },
  mutations: {
    // Gère le localStorage selon si l'utilisateur est connecté ou non
    setUser(state, user) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
      state.user = user
    },
    // Permet d'accéder au menu de façon globale, pour permettre au router de le fermer automatiquement quand on change de page
    setMenu(state, isOpen) {
      state.isMenuOpen = isOpen
    },
  },
  actions: {},
  modules: {},
})
