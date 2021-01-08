import api from "@/api"

export default {
  // Se connecter
  async login(email, password) {
    return await api
      .post("user/login", {
        json: { email, password },
      })
      .json()
  },

  // Créer un compte
  async signup(firstName, lastName, email, password) {
    return await api
      .post("user/signup", {
        json: { firstName, lastName, email, password },
      })
      .json()
  },

  // Modifier les infos utilisateur
  async modify(firstName, lastName, email, password) {
    return await api
      .put("user/account", {
        json: { firstName, lastName, email, password },
      })
      .json()
  },

  // Supprimer un compte
  async delete() {
    return await api.delete("user/account")
  },
}
